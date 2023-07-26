import { create } from 'zustand';
import Cookies from 'js-cookie';

export type DarkMode = {
  darkMode: string | null;
  setDarkMode: (value: string) => void;
};

export const useDarkMode = create<DarkMode>((set) => ({
  darkMode: Cookies.get('utopiaDarkMode') || 'false',
  setDarkMode: (value) => set((state: DarkMode) => ({ darkMode: value })),
}));
