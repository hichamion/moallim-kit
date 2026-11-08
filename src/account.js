// Optional teacher account: Google sign-in and a private copy of the data in Firestore.
// Bundled by build.mjs into the page as window.MoallemAccount.
import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  OAuthProvider,
  browserLocalPersistence,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { collection, doc, getDoc, getDocs, initializeFirestore, memoryLocalCache, runTransaction } from 'firebase/firestore';
import config from './firebase-config.json';

// A Firestore document holds at most 1 MB, so the data is stored in pieces.
const CHUNK_SIZE = 800000;

const app = initializeApp(config);
const auth = getAuth(app);
const db = initializeFirestore(app, { localCache: memoryLocalCache(), experimentalAutoDetectLongPolling: true });

const profileOf = (user) => (user ? {
  uid: user.uid,
  name: user.displayName || '',
  email: user.email || '',
  photo: user.photoURL || '',
  provider: user.providerData[0]?.providerId || ''
} : null);

function requireUser() {
  if (!auth.currentUser) {
    const error = new Error('signed-out');
    error.code = 'signed-out';
    throw error;
  }
  return auth.currentUser.uid;
}

window.MoallemAccount = {
  onChange(callback) {
    return onAuthStateChanged(auth, (user) => callback(profileOf(user)));
  },

  async signIn(kind = 'google') {
    let provider;
    if (kind === 'apple') {
      provider = new OAuthProvider('apple.com');
      provider.addScope('email');
      provider.addScope('name');
    } else {
      provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
    }
    await setPersistence(auth, browserLocalPersistence);
    const result = await signInWithPopup(auth, provider);
    return profileOf(result.user);
  },

  signOut() {
    return signOut(auth);
  },

  /** The teacher's saved data: { revision, updatedAt, payload } (payload is '' when nothing is saved yet). */
  async read() {
    const uid = requireUser();
    const meta = await getDoc(doc(db, 'users', uid));
    if (!meta.exists()) return { revision: 0, updatedAt: '', payload: '' };
    const { revision = 0, updatedAt = '', chunks = 0, chars = 0 } = meta.data();
    const parts = await getDocs(collection(db, 'users', uid, 'chunks'));
    const texts = [];
    parts.forEach((part) => {
      const index = Number(part.id);
      if (Number.isInteger(index) && index < chunks) texts[index] = part.data().text;
    });
    const payload = texts.join('');
    if (texts.length !== chunks || payload.length !== chars) {
      const error = new Error('incomplete');
      error.code = 'incomplete';
      throw error;
    }
    return { revision, updatedAt, payload };
  },

  /**
   * Saves the data when the account still holds `baseRevision`; otherwise throws a conflict,
   * so one device never silently overwrites another.
   */
  async write(payload, baseRevision, force = false, device = '') {
    const uid = requireUser();
    const metaRef = doc(db, 'users', uid);
    const pieces = [];
    for (let i = 0; i < payload.length; i += CHUNK_SIZE) pieces.push(payload.slice(i, i + CHUNK_SIZE));
    if (!pieces.length) pieces.push('');
    return runTransaction(db, async (tx) => {
      const meta = await tx.get(metaRef);
      const current = meta.exists() ? meta.data().revision || 0 : 0;
      const oldChunks = meta.exists() ? meta.data().chunks || 0 : 0;
      if (!force && (baseRevision ?? 0) !== current) {
        const error = new Error('conflict');
        error.code = 'conflict';
        error.revision = current;
        error.updatedAt = meta.exists() ? meta.data().updatedAt || '' : '';
        throw error;
      }
      pieces.forEach((text, i) => tx.set(doc(db, 'users', uid, 'chunks', String(i)), { text }));
      for (let i = pieces.length; i < oldChunks; i++) tx.delete(doc(db, 'users', uid, 'chunks', String(i)));
      const updatedAt = new Date().toISOString();
      const revision = current + 1;
      tx.set(metaRef, { revision, updatedAt, chunks: pieces.length, chars: payload.length, device: String(device).slice(0, 80) });
      return { revision, updatedAt };
    });
  }
};
