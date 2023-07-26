import { create } from 'zustand';

const initColor = {
  hex: '#906cea',
  rgb: 'rgba(144,108,234,1)',
  h: 257,
  s: 0.75,
  l: 0.67,
  a: 1,
};

export type Color = typeof initColor;

export type UseColor = {
  color: Color;
  setColor: (value: Color) => void;
  sColors: string[];
  lColors: string[];
  setSColors: (sColors: string[]) => void;
  setLColors: (lColors: string[]) => void;
  rgb: string;
  setRgb: (rbg: string) => void;
};

export const useColor = create<UseColor>((set) => ({
  color: initColor,
  sColors: [],
  lColors: [],
  rgb: '',
  setColor: (value) => set((state: UseColor) => ({ color: value })),
  setSColors: (sColors) => set((state: UseColor) => ({ sColors })),
  setLColors: (lColors) => set((state: UseColor) => ({ lColors })),
  setRgb: (rgb) => set((state: UseColor) => ({ rgb })),
}));
