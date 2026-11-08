# مُعلّم كِت

تطبيق لمتابعة حلقات تحفيظ القرآن الكريم: الطلاب، والحصص، والحفظ والمراجعة، والحضور والسلوك.

- النسخة المنشورة: https://hichamion.github.io/moallim-kit/
- يعمل دون حساب، وتسجيل الدخول بحساب Google اختياري لحفظ بيانات كل محفّظ في ملف خاص به على Firebase.

## التشغيل محليًا

```bash
npm install
npm run build
npm test
```

- `dist/index.html`: النسخة المنشورة (مع ملف التثبيت على الهاتف وملف العمل دون إنترنت).
- `dist/moallim-kit.html`: الملف نفسه للفتح المباشر على الحاسوب (تسجيل الدخول يحتاج النسخة المنشورة).

## البنية

- `src/app.js` و`src/body.html` و`src/styles.src.css`: التطبيق.
- `src/account.js`: تسجيل الدخول والمزامنة مع Firestore.
- `src/firebase-config.json`: إعدادات Firebase العامة للويب (ليست سرًا؛ الحماية في `firestore.rules`).
- `firestore.rules`: كل محفّظ يقرأ ويكتب بياناته وحده. النشر: `firebase deploy --only firestore:rules`.
- `apps-script/Code.gs`: طريقة المزامنة البديلة عبر Google Sheets.
- يُنشر الموقع تلقائيًا عبر `.github/workflows/deploy.yml` عند كل دفع إلى `main`.

## المصادر والرخص

- **نص المصحف:** Tanzil Quran Text (Uthmani, Version 1.1) من مشروع تنزيل https://tanzil.net برخصة CC BY 3.0، محفوظ دون أي تعديل في `src/assets/quran-uthmani.txt` مع إشعار الحقوق الأصلي. البسملة تُعرض عنوانًا للسورة عند العرض فقط، والنص المخزَّن كما هو.
- **خط المصحف:** Amiri Quran برخصة SIL Open Font License.
- **الأيقونات:** Lucide برخصة ISC.
