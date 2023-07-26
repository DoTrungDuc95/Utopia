import { create } from 'zustand';

import { shape_array } from '@/assest-data/shapes';
import { Shape, mapShape } from '@/utils/clippath';

export type Clippath = {
  shape: Shape;
  setShape: (shape: Shape) => void;
};

export const useClippath = create<Clippath>((set) => ({
  shape: mapShape(shape_array[9]),
  setShape: (shape: Shape) => set((state: Clippath) => ({ shape })),
}));
