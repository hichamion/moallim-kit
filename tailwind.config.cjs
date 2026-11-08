// Every background, text and border colour is a CSS variable, so the whole app
// switches between day and night by changing variables on <html>.
const plugin = require('tailwindcss/plugin');
const tw = require('tailwindcss/colors');

const scale = (values) => Object.fromEntries(
  [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade, i) => [shade, values[i]])
);

// Calm palette: petrol green as the brand, muted gold as the accent, warm stone as the neutral.
const palette = {
  slate: tw.stone,
  indigo: scale(['#eef8f6', '#d5efe9', '#aedfd5', '#7cc8ba', '#4fab9c', '#338f81', '#27736a', '#225d57', '#1f4b47', '#1c3f3c']),
  violet: scale(['#eef5f7', '#d8e8ec', '#b5d2da', '#8bb5c1', '#6396a5', '#4a7c8c', '#3d6a7a', '#345766', '#2e4955', '#293e48']),
  amber: scale(['#fbf6ea', '#f5e9cb', '#ecd69f', '#e0bf72', '#d4a853', '#c29340', '#a87a2f', '#8a6228', '#704f24', '#5c4120']),
  rose: scale(['#fbf1f2', '#f6dfe2', '#eec3c8', '#e19ca5', '#d1737f', '#bc5361', '#a33f4e', '#873340', '#702d38', '#5f2932']),
  purple: scale(['#f7f2f7', '#ecdfec', '#dcc5dc', '#c3a1c4', '#a77fa9', '#8d6590', '#785379', '#634564', '#533b54', '#463347']),
  emerald: tw.emerald,
  teal: tw.teal,
  sky: scale(['#eff6fa', '#dbeaf3', '#bcd9e8', '#93c0d6', '#6aa5c2', '#4d8aaa', '#3c7190', '#335d77', '#2d4e63', '#294254']),
  blue: scale(['#eff4fa', '#dce6f2', '#bfd0e6', '#98b3d4', '#7395bf', '#577aa8', '#47648e', '#3c5374', '#344661', '#2e3c52']),
  orange: scale(['#fbf4ec', '#f5e4d0', '#ebcba6', '#dfab76', '#d18e52', '#be763c', '#a35f30', '#864c2a', '#6e4026', '#5b3722']),
  pink: scale(['#fbf2f5', '#f5dfe7', '#ecc3d1', '#dd9db2', '#cb7b95', '#b5607c', '#984c66', '#7e4055', '#693748', '#59303e']),
  fuchsia: scale(['#f9f2f8', '#f0e0ef', '#e2c6e0', '#cca2c9', '#b480b0', '#9a6596', '#81527e', '#6a4468', '#583a57', '#4a324a']),
  cyan: tw.cyan,
  red: tw.red,
  green: tw.green,
  yellow: tw.yellow
};

const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const rgb = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return [n >> 16, (n >> 8) & 255, n & 255];
};
const triple = (v) => v.join(' ');
const mix = (a, b, t) => rgb(a).map((c, i) => Math.round(c + (rgb(b)[i] - c) * t));

const SURFACE_DARK = '#18211f';
const NEUTRAL_DARK = {
  bg: { 50: '#1d2725', 100: '#232f2c', 200: '#2c3936', 300: '#3a4945', 800: '#33423e', 900: '#3a4a46' },
  text: { 300: '#566560', 400: '#7c8c86', 500: '#97a69f', 600: '#b6c2bc', 700: '#cfd9d3', 800: '#e2e9e5', 900: '#eff4f1' },
  border: { 50: '#1f2a27', 100: '#27332f', 200: '#303e3a', 300: '#3d4c47' }
};

function themeVars() {
  const light = {};
  const dark = {};
  for (const [hue, values] of Object.entries(palette)) {
    for (const shade of SHADES) {
      const base = triple(rgb(values[shade]));
      for (const kind of ['bg', 'text', 'border']) light[`--${kind}-${hue}-${shade}`] = base;

      if (hue === 'slate') {
        dark[`--bg-${hue}-${shade}`] = NEUTRAL_DARK.bg[shade] ? triple(rgb(NEUTRAL_DARK.bg[shade])) : base;
        dark[`--text-${hue}-${shade}`] = NEUTRAL_DARK.text[shade] ? triple(rgb(NEUTRAL_DARK.text[shade])) : base;
        dark[`--border-${hue}-${shade}`] = NEUTRAL_DARK.border[shade] ? triple(rgb(NEUTRAL_DARK.border[shade])) : base;
        continue;
      }
      const tint = { 50: 0.1, 100: 0.17, 200: 0.26, 300: 0.36 }[shade];
      dark[`--bg-${hue}-${shade}`] = tint ? triple(mix(SURFACE_DARK, values[400], tint)) : base;
      dark[`--border-${hue}-${shade}`] = tint ? triple(mix(SURFACE_DARK, values[400], tint + 0.08)) : base;
      const lifted = { 400: 300, 500: 300, 600: 300, 700: 200, 800: 200, 900: 100 }[shade];
      dark[`--text-${hue}-${shade}`] = lifted ? triple(rgb(values[lifted])) : base;
    }
  }
  return { light, dark };
}

const tokens = (kind) => Object.fromEntries(Object.keys(palette).map((hue) => [
  hue,
  Object.fromEntries(SHADES.map((s) => [s, `rgb(var(--${kind}-${hue}-${s}) / <alpha-value>)`]))
]));

module.exports = {
  content: ['./src/app.js', './src/body.html'],
  theme: {
    extend: {
      fontFamily: { sans: ['Cairo', 'sans-serif'] },
      colors: palette,
      backgroundColor: { ...tokens('bg'), white: 'rgb(var(--surface) / <alpha-value>)' },
      textColor: tokens('text'),
      borderColor: tokens('border'),
      divideColor: tokens('border'),
      ringColor: tokens('border')
    }
  },
  plugins: [
    plugin(({ addBase }) => {
      const { light, dark } = themeVars();
      addBase({
        ':root': { ...light, '--surface': '255 253 249' },
        'html.dark': { ...dark, '--surface': triple(rgb(SURFACE_DARK)) }
      });
    })
  ]
};
