import { create } from 'zustand';

export const initSizes = [
  { size: '3xs', multi: 0.25, index: 3 },
  { size: '2xs', multi: 0.5, index: 2 },
  { size: 'xs', multi: 0.75, index: 1 },
  { size: 's', multi: 1, index: 0 },
  { size: 'm', multi: 1.25, index: 0 },
  { size: 'l', multi: 1.5, index: 0 },
  { size: 'xl', multi: 1.75, index: 1 },
  { size: '2xl', multi: 2, index: 2 },
  { size: '3xl', multi: 3, index: 3 },
  { size: '4xl', multi: 4, index: 4 },
  { size: '5xl', multi: 6, index: 5 },
];
export const initSteps = [5, 4, 3, 2, 1, 0, -1, -2];
export const initCustomPair = [
  ['s', 'm', `${require('crypto').randomBytes(64).toString('hex')}`],
];

export type CalcType = {
  minVp: number;
  maxVp: number;
  minFs: number;
  maxFs: number;
  minTs: number;
  maxTs: number;
};

export type Size = {
  size: string;
  multi: number;
  index: number;
};

export type CalculatorInput = {
  calcVal: CalcType;
  vpArr: number[];
  steps: number[];
  sizes: Size[];
  pair: string[][];
  setCalcVal: (name: string, val: number) => void;
  setVpArr: (vps: number[]) => void;
  setSizes: (sizes: Size[]) => void;
  deleteOneVp: (vp: number) => void;
  setSteps: (st: number[]) => void;
  setPair: (p: string[][]) => void;
};

const init: CalcType = {
  minVp: 320,
  maxVp: 1280,
  minFs: 15,
  maxFs: 20,
  minTs: 1.2,
  maxTs: 1.2,
};

export const useCalculatorInput = create<CalculatorInput>((set) => ({
  calcVal: init,
  pair: JSON.parse(JSON.stringify(initCustomPair)),
  vpArr: [],
  steps: [...initSteps],
  sizes: JSON.parse(JSON.stringify(initSizes)),
  setCalcVal: (name: string, val: number) =>
    set((state: CalculatorInput) => ({
      calcVal: { ...state.calcVal, [name]: val },
    })),
  setVpArr: (vp: number[]) =>
    set((state: CalculatorInput) => ({
      vpArr: vp,
    })),
  setSizes: (sizes: Size[]) =>
    set((state: CalculatorInput) => ({
      sizes,
    })),
  deleteOneVp: (vp: number) =>
    set((state: CalculatorInput) => ({
      vpArr: state.vpArr.filter((v) => v !== vp),
    })),
  setSteps: (steps: number[]) =>
    set((state: CalculatorInput) => ({
      steps,
    })),
  setPair: (pair: string[][]) =>
    set((state: CalculatorInput) => ({
      pair,
    })),
}));
