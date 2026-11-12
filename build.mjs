// Builds the app.
//  dist/moallim-kit.html  single file that works on its own (account sign-in needs the online version)
//  dist/index.html + manifest, icons and service worker  the online version published on GitHub Pages
// `node build.mjs --test` also writes tests/.build/test.html, which may reach a local mock server.
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { copyFileSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import { buildSync } from 'esbuild';

const root = dirname(fileURLToPath(import.meta.url));
const read = (p, enc = 'utf8') => readFileSync(join(root, p), enc);
const nm = 'node_modules';
const dataUri = (p) => `data:font/woff2;base64,${read(p, null).toString('base64')}`;
const firebase = JSON.parse(read('src/firebase-config.json'));

function buildTailwind() {
  const out = join(root, 'dist/.tailwind.css');
  execFileSync(join(root, nm, '.bin/tailwindcss'), [
    '-c', join(root, 'tailwind.config.cjs'),
    '-i', join(root, 'src/styles.src.css'),
    '-o', out,
    '--minify'
  ], { stdio: ['ignore', 'ignore', 'pipe'] });
  const css = readFileSync(out, 'utf8');
  rmSync(out);
  return css;
}

function buildFontAwesome() {
  const dir = `${nm}/@fortawesome/fontawesome-free`;
  let css = read(`${dir}/css/all.min.css`);
  // Only the brand font is still needed: every other icon is a Lucide line icon (see buildIcons).
  css = css.replace(/@font-face\{font-family:"FontAwesome";[^}]*\}/g, '');
  css = css.replace(/@font-face\{font-family:"Font Awesome 6 Free";[^}]*\}/g, '');
  css = css.replace(/url\(\.\.\/webfonts\/([\w-]+)\.ttf\)\s*format\("truetype"\)/g, '');
  css = css.replace(/,\s*(?=[;}])/g, '');
  return css.replace(/url\(\.\.\/webfonts\/([\w-]+\.woff2)\)/g, (_, f) => `url(${dataUri(`${dir}/webfonts/${f}`)})`);
}

function buildCairo() {
  const dir = `${nm}/@fontsource-variable/cairo/files`;
  const face = (file, range) => `@font-face{font-family:'Cairo';font-style:normal;font-display:swap;font-weight:200 1000;src:url(${dataUri(`${dir}/${file}`)}) format('woff2-variations');unicode-range:${range}}`;
  return face('cairo-arabic-wght-normal.woff2', 'U+0600-06FF,U+0750-077F,U+0870-088E,U+0890-0891,U+0898-08E1,U+08E3-08FF,U+200C-200E,U+2010-2011,U+204F,U+2E41,U+FB50-FDFF,U+FE70-FE74,U+FE76-FEFC')
    + face('cairo-latin-wght-normal.woff2', 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD');
}

/** Lucide icons (ISC licence), the line icon set used by the Aemmah platform, mapped from the old icon names. */
const LUCIDE = {
  'fa-award': 'award', 'fa-book-open': 'book-open', 'fa-book-open-reader': 'book-open-text', 'fa-book-quran': 'book-open-text',
  'fa-book-skull': 'backpack', 'fa-box-archive': 'archive', 'fa-broom': 'brush-cleaning', 'fa-calendar-check': 'calendar-check',
  'fa-calendar-days': 'calendar-days', 'fa-calendar': 'calendar', 'fa-calendar-plus': 'calendar-plus', 'fa-clock': 'clock',
  'fa-cloud': 'cloud', 'fa-comment-slash': 'message-circle-off', 'fa-door-open': 'door-open', 'fa-earth-americas': 'globe',
  'fa-face-frown': 'frown', 'fa-file-circle-xmark': 'file-x', 'fa-file-excel': 'file-spreadsheet', 'fa-gear': 'settings',
  'fa-hand-sparkles': 'hand', 'fa-handshake-angle': 'handshake', 'fa-id-card': 'id-card', 'fa-language': 'languages',
  'fa-laptop-code': 'laptop', 'fa-lightbulb': 'lightbulb', 'fa-list': 'list', 'fa-lock': 'lock', 'fa-medal': 'medal',
  'fa-mobile-screen': 'smartphone', 'fa-palette': 'palette', 'fa-people-arrows': 'arrow-right-left', 'fa-rotate': 'refresh-cw',
  'fa-seedling': 'sprout', 'fa-star': 'star', 'fa-thumbs-up': 'thumbs-up', 'fa-thumbs-down': 'thumbs-down', 'fa-trash-can': 'trash-2',
  'fa-trash': 'trash-2', 'fa-triangle-exclamation': 'triangle-alert', 'fa-user': 'user', 'fa-user-check': 'user-check',
  'fa-user-graduate': 'graduation-cap', 'fa-user-plus': 'user-plus', 'fa-copy': 'copy', 'fa-image': 'image',
  'fa-note-sticky': 'sticky-note', 'fa-arrow-down-a-z': 'arrow-down-a-z', 'fa-arrow-left': 'arrow-left', 'fa-arrow-right': 'arrow-right',
  'fa-camera': 'camera', 'fa-chair': 'armchair', 'fa-chalkboard-user': 'presentation', 'fa-chart-pie': 'chart-pie', 'fa-check': 'check',
  'fa-check-double': 'check-check', 'fa-chevron-left': 'chevron-left', 'fa-chevron-right': 'chevron-right', 'fa-chevron-down': 'chevron-down',
  'fa-circle-half-stroke': 'sun-moon', 'fa-circle-user': 'circle-user', 'fa-clock-rotate-left': 'history',
  'fa-cloud-arrow-down': 'cloud-download', 'fa-cloud-arrow-up': 'cloud-upload', 'fa-download': 'download', 'fa-envelope': 'mail',
  'fa-file-code': 'file-code', 'fa-file-export': 'file-output', 'fa-floppy-disk': 'save', 'fa-folder-open': 'folder-open',
  'fa-folder-plus': 'folder-plus', 'fa-graduation-cap': 'graduation-cap', 'fa-hard-drive': 'hard-drive', 'fa-house': 'house',
  'fa-layer-group': 'layers', 'fa-magnifying-glass': 'search', 'fa-map': 'map', 'fa-moon': 'moon', 'fa-mosque': 'book-open-text',
  'fa-pen': 'pencil', 'fa-pen-to-square': 'square-pen', 'fa-phone': 'phone', 'fa-plus': 'plus', 'fa-plus-circle': 'circle-plus',
  'fa-print': 'printer', 'fa-right-from-bracket': 'log-out', 'fa-right-left': 'arrow-right-left', 'fa-rotate-left': 'rotate-ccw',
  'fa-shuffle': 'shuffle', 'fa-sliders': 'sliders-horizontal', 'fa-sun': 'sun', 'fa-table-cells-large': 'layout-grid',
  'fa-up-down-left-right': 'move', 'fa-upload': 'upload', 'fa-user-magnifying-glass': 'user-search', 'fa-users': 'users',
  'fa-users-gear': 'users-round', 'fa-volume-high': 'volume-2', 'fa-volume-xmark': 'volume-x', 'fa-wand-magic-sparkles': 'wand-sparkles',
  'fa-xmark': 'x', 'fa-circle-check': 'circle-check', 'fa-circle-exclamation': 'circle-alert', 'fa-circle-info': 'info',
  'fa-location-dot': 'map-pin', 'fa-arrows-rotate': 'refresh-cw', 'fa-table-list': 'table', 'fa-calculator': 'calculator',
  'fa-flask-vial': 'flask-conical', 'fa-circle-plus': 'circle-plus', 'fa-circle-minus': 'circle-minus', 'fa-sliders-h': 'sliders-horizontal',
  'fa-file-csv': 'file-spreadsheet', 'fa-chalkboard': 'presentation', 'fa-user-group': 'users', 'fa-file-medical': 'file-heart',
  'fa-check-circle': 'circle-check', 'fa-arrow-up': 'arrow-up', 'fa-arrow-down': 'arrow-down', 'fa-ellipsis': 'ellipsis'
};
const NOT_ICONS = new Set(['fa-solid', 'fa-regular', 'fa-brands', 'fa-apple', 'fa-google-drive']);

function buildIcons() {
  const used = new Set();
  for (const file of ['src/app.js', 'src/body.html']) {
    for (const m of read(file).matchAll(/\bfa-[a-z0-9-]+/g)) used.add(m[0]);
  }
  const names = [...used].filter((n) => !NOT_ICONS.has(n) && !/^fa-\$/.test(n));
  const missing = names.filter((n) => !LUCIDE[n]);
  if (missing.length) throw new Error(`No Lucide icon mapped for: ${missing.join(', ')}`);
  return names.map((name) => {
    const svg = read(`${nm}/lucide-static/icons/${LUCIDE[name]}.svg`)
      .replace(/<!--[\s\S]*?-->/g, '')
      // Only the outer <svg> loses its size and class; shapes inside keep their own width and height.
      .replace(/<svg[^>]*>/, (tag) => tag.replace(/\s(class|width|height)="[^"]*"/g, ''))
      .replace(/\s+/g, ' ')
      .replace('<svg ', '<svg width="24" height="24" ')
      .replace(/currentColor/g, '#000')
      .trim();
    return `.${name}{--ic:url("data:image/svg+xml,${encodeURIComponent(svg)}")}`;
  }).join('');
}

/** Amiri Quran (SIL Open Font Licence), drawn for the Quran text. */
function buildAmiriQuran() {
  const dir = `${nm}/@fontsource/amiri-quran/files`;
  const face = (file, range) => `@font-face{font-family:'Amiri Quran';font-style:normal;font-display:swap;font-weight:400;src:url(${dataUri(`${dir}/${file}`)}) format('woff2');unicode-range:${range}}`;
  return face('amiri-quran-arabic-400-normal.woff2', 'U+0600-06FF,U+0750-077F,U+0870-088E,U+0890-0891,U+0898-08E1,U+08E3-08FF,U+200C-200E,U+2010-2011,U+204F,U+2E41,U+FB50-FDFF,U+FE70-FE74,U+FE76-FEFC')
    + face('amiri-quran-latin-400-normal.woff2', 'U+0000-00FF');
}

/** The Tanzil text, verbatim (with its licence block), compressed and opened in the browser on first use. */
function quranGz() {
  return gzipSync(read('src/assets/quran-uthmani.txt', null), { level: 9 }).toString('base64');
}

/** The Google sign-in and Firestore code, bundled into one script that sets window.MoallemAccount. */
function buildAccount() {
  const out = buildSync({
    entryPoints: [join(root, 'src/account.js')],
    bundle: true,
    minify: true,
    format: 'iife',
    target: ['es2020', 'safari15'],
    legalComments: 'none',
    write: false
  });
  return out.outputFiles[0].text.replace(/<\/script/gi, '<\\/script');
}

function csp(test) {
  const google = [
    'https://identitytoolkit.googleapis.com',
    'https://securetoken.googleapis.com',
    'https://firestore.googleapis.com',
    'https://www.googleapis.com',
    'https://apis.google.com'
  ];
  const connect = test
    ? ['http://127.0.0.1:*', ...google]
    : ['https://script.google.com', 'https://script.googleusercontent.com', ...google];
  return [
    "default-src 'none'",
    "script-src 'unsafe-inline' https://apis.google.com https://www.gstatic.com",
    "style-src 'unsafe-inline'",
    'font-src data:',
    "img-src 'self' data: https://*.googleusercontent.com",
    `connect-src ${connect.join(' ')}`,
    `frame-src https://${firebase.authDomain} https://accounts.google.com https://apis.google.com`,
    "worker-src 'self'",
    "manifest-src 'self'",
    "form-action 'none'",
    "base-uri 'none'"
  ].join('; ');
}

function page({ test, css, account }) {
  const js = read('src/app.js')
    .replace('"__GAS_CODE__"', () => JSON.stringify(read('apps-script/Code.gs')))
    .replace('"__TEST_BUILD__"', test ? 'true' : 'false')
    .replace('"__QURAN_GZ__"', () => JSON.stringify(QURAN_GZ));
  if (/<\/script/i.test(js)) throw new Error('app.js must not contain a closing script tag');
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta http-equiv="Content-Security-Policy" content="${csp(test)}">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<meta name="theme-color" content="#27736a">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="معلّم كت">
<link rel="manifest" href="manifest.webmanifest">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<link rel="icon" type="image/png" href="icon-192.png">
<title>مُعلّم كِت | متابعة حلقات تحفيظ القرآن الكريم</title>
<script>
(function () {
  var mode = null;
  try { mode = localStorage.getItem('moallemkit_theme'); } catch (e) {}
  var hour = new Date().getHours();
  var dark = mode === 'dark' || (mode !== 'light' && (hour < 6 || hour >= 19));
  document.documentElement.classList.toggle('dark', dark);
})();
</script>
<style>${css}</style>
</head>
${read('src/body.html').replace('__LOGO__', () => logo)}
<script>
${account}
</script>
<script>
${js}
</script>
</body>
</html>
`;
}

function writePwaFiles(html) {
  const version = createHash('sha256').update(html).digest('hex').slice(0, 12);
  for (const file of ['icon-192.png', 'icon-512.png', 'apple-touch-icon.png']) {
    copyFileSync(join(root, 'src/assets', file), join(root, 'dist', file));
  }
  writeFileSync(join(root, 'dist/manifest.webmanifest'), JSON.stringify({
    name: 'معلّم كت - حلقات التحفيظ',
    short_name: 'معلّم كت',
    description: 'متابعة حلقات تحفيظ القرآن الكريم: الطلاب والحصص والحفظ والمراجعة',
    lang: 'ar',
    dir: 'rtl',
    start_url: './',
    scope: './',
    display: 'standalone',
    background_color: '#f2f1ee',
    theme_color: '#27736a',
    icons: [
      { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
    ]
  }, null, 2));
  // Keeps the app usable without internet once it has been opened online.
  writeFileSync(join(root, 'dist/sw.js'), `const CACHE = 'moallim-${version}';
const FILES = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (event.request.mode === 'navigate') {
    // Newest version when online, the saved copy when offline.
    event.respondWith(fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE).then((cache) => cache.put('./index.html', copy));
        return response;
      })
      .catch(() => caches.match('./index.html')));
    return;
  }
  event.respondWith(caches.match(event.request).then((hit) => hit || fetch(event.request)));
});
`);
}

mkdirSync(join(root, 'dist'), { recursive: true });
const image = (file) => `data:image/jpeg;base64,${read(file, null).toString('base64')}`;
const QURAN_GZ = quranGz();
const css = (buildCairo() + buildAmiriQuran() + buildFontAwesome() + buildTailwind() + buildIcons())
  .replace(/__BG_APP__/g, () => image('src/assets/bg-app.jpg'))
  .replace(/__BG_CIRCLE__/g, () => image('src/assets/bg-circle.jpg'));
const logo = `data:image/jpeg;base64,${read('src/assets/logo-96.jpg', null).toString('base64')}`;
const account = buildAccount();
const html = page({ test: false, css, account });
writeFileSync(join(root, 'dist/moallim-kit.html'), html);
writeFileSync(join(root, 'dist/index.html'), html);
writePwaFiles(html);
if (process.argv.includes('--test')) {
  mkdirSync(join(root, 'tests/.build'), { recursive: true });
  writeFileSync(join(root, 'tests/.build/test.html'), page({ test: true, css, account }));
}
console.log('built dist/index.html and dist/moallim-kit.html', Math.round(html.length / 1024), 'KB');
