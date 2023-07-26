import { indent } from './indent';
import { Color } from '../store/useColor';

export const getSaturationColorList = (h: number, l: number, a: number = 1) => {
  h = Math.round(h);
  l = Math.round(l * 100);

  const colors = [];
  for (let i = 100; i >= 0; i -= 5) {
    const hex = hslToHex(h, i, l);
    const rgb = hslToRgb(h, i, l, a);
    colors.push(`hsla(${h}, ${i}%, ${l}%, ${a})-${i}-${hex}-${rgb}`);
  }
  return colors;
};

export const getLightnessColorList = (h: number, s: number, a: number = 1) => {
  s = Math.round(s * 100);
  h = Math.round(h);

  const colors = [];
  for (let i = 100; i >= 0; i -= 5) {
    const hex = hslToHex(h, s, i);
    const rgb = hslToRgb(h, s, i, a);
    colors.push(`hsla(${h}, ${s}%, ${i}%, ${a})-${i}-${hex}-${rgb}`);
  }
  return colors;
};

const hslToHex = (h: number, s: number, l: number) => {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0'); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

const hslToRgb = (h: number, s: number, l: number, a: number) => {
  let r, g, b;
  h = h / 360;
  s = s / 100;
  l = l / 100;
  if (s == 0) {
    r = g = b = Math.round(l * 255); // achromatic
  } else {
    const hueToRgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = Math.round(hueToRgb(p, q, h + 1 / 3) * 255);
    g = Math.round(hueToRgb(p, q, h) * 255);
    b = Math.round(hueToRgb(p, q, h - 1 / 3) * 255);
  }

  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

export const rgbToHSL = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;
  let l = Math.max(r, g, b);
  let s = l - Math.min(r, g, b);
  let h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};

export const generateScaleColorCss = (
  colors: string[],
  type: 'hex' | 'rgb' | 'hsl'
) => {
  let str = '';
  colors.forEach((c) => {
    const colors = c.split('-');
    let s = '--clr-s-';
    if (type === 'hsl') s = s + colors[1] + ': ' + colors[0];
    else if (type === 'rgb') s = s + colors[1] + ': ' + colors[3];
    else s = s + colors[1] + ': ' + colors[2];
    s = indent(s + ';\n', 1, 2);
    str += s;
  });
  return str;
};

const getColorOriginByType = (color: Color, type: 'hex' | 'rgb' | 'hsl') => {
  let str = '--clr-origin: ';
  switch (type) {
    case 'hex':
      str += color.hex;
      break;
    case 'hsl':
      str += `hsla(${color.h.toFixed(2)}, ${(color.s * 100).toFixed(2)}%, ${(
        color.l * 100
      ).toFixed(2)}%, ${color.a})`;
      break;
    case 'rgb':
      str += color.rgb;
      break;
    default:
      break;
  }
  return indent(str + ';\n', 1, 2);
};

export const generateColorCss = (
  color: Color,
  sColor: string[],
  lColor: string[],
  type: 'hex' | 'rgb' | 'hsl'
) => {
  let str = ':root {\n' + getColorOriginByType(color, type);

  const sClr = generateScaleColorCss(sColor, type);
  if (sClr) str = str + '\n' + indent('/* Saturation scale */\n', 1, 2) + sClr;

  const lClr = generateScaleColorCss(lColor, type);
  if (lClr) str = str + '\n' + indent('/* Lightness scale */\n', 1, 2) + lClr;

  return str + '}\n';
};
