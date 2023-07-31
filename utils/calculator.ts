import { GridType, Size } from '@/store/useCalculatorInput';
import { indent } from './indent';
import { GridInfoType } from '@/types';
import { blogs } from '@/assest-data/blogs';

export const calculatorFsFromStep = (
  fs: number,
  step: number,
  scale: number,
  toRem: boolean = false
) => {
  const newfs = Math.pow(scale, step) * fs;
  return toRem ? newfs / 16 : newfs;
};

export const calculatorNewFsForNewVp = (
  vp: number,
  minVp: number,
  maxVp: number,
  minFs: number,
  maxFs: number
) => {
  const deltaMaxFs = maxFs - minFs;
  const deltaMaxVp = maxVp - minVp;
  const deltaVp = vp - minVp;
  return (deltaMaxFs * deltaVp) / deltaMaxVp + minFs;
};

export const generateTypeDataTable = (
  steps: number[],
  vpArr: number[],
  minVp: number,
  maxVp: number,
  minFs: number,
  maxFs: number,
  minScale: number,
  maxScale: number
) => {
  const data: string[][] = [];
  steps.forEach((s) => {
    const fsArr = [s.toString()];
    vpArr.forEach((vp) => {
      let fs;
      const mFs = calculatorFsFromStep(minFs, s, minScale);
      const mxFs = calculatorFsFromStep(maxFs, s, maxScale);
      if (vp <= minVp) fs = mFs;
      else if (vp >= maxVp) fs = mxFs;
      else fs = calculatorNewFsForNewVp(vp, minVp, maxVp, mFs, mxFs);
      fsArr.push(fs.toFixed(2));
    });
    data.push(fsArr);
  });
  return data;
};

export const calculatorAAndBForClamp = (
  minVp: number,
  maxVp: number,
  minFs: number,
  maxFs: number
) => {
  const mvp = minVp / 16;
  const mxvp = maxVp / 16;
  const b = (maxFs - minFs) / (mxvp - mvp);
  const a = minFs - mvp * b;

  return [a.toFixed(2), (b * 100).toFixed(2)];
};

export const generateClampForStep = (
  step: number,
  minVp: number,
  maxVp: number,
  minFs: number,
  maxFs: number,
  minScale: number,
  maxScale: number
) => {
  const minStepFs = calculatorFsFromStep(minFs, step, minScale, true);
  const maxStepFs = calculatorFsFromStep(maxFs, step, maxScale, true);
  const [a, b] = calculatorAAndBForClamp(minVp, maxVp, minStepFs, maxStepFs);
  return `--step-${step}: clamp(${minStepFs.toFixed(
    2
  )}rem, calc(${a}rem + ${b}vw), ${maxStepFs.toFixed(2)}rem);`;
};

export const generateClampStepForGrid = (
  minVp: number,
  maxVp: number,
  minFs: number,
  maxFs: number,
  steps: number[],
  minScale: number,
  maxScale: number
) => {
  const obj: any = {};
  steps.forEach((s, i) => {
    const gen = generateClampForStep(
      s,
      minVp,
      maxVp,
      minFs,
      maxFs,
      minScale,
      maxScale
    );
    obj['step' + s] = gen.substring(0, gen.lastIndexOf(';')).split(': ')[1];
  });
  const st0 = { step: 0, value: obj['step0'] };
  const st1 = obj['step1'] ? { step: 1, value: obj['step1'] } : st0;
  const st2 = obj['step2'] ? { step: 2, value: obj['step2'] } : st1;
  const st3 = obj['step3'] ? { step: 3, value: obj['step3'] } : st2;
  const st4 = obj['step4'] ? { step: 4, value: obj['step4'] } : st3;
  const st5 = obj['step5'] ? { step: 5, value: obj['step5'] } : st4;

  return [st0, st1, st2, st3, st4, st5];
};

export const generateTypeCss = (
  minVp: number,
  maxVp: number,
  minFs: number,
  maxFs: number,
  steps: number[],
  minScale: number,
  maxScale: number
) => {
  let str = '';
  steps.forEach((s, i) => {
    const gen = generateClampForStep(
      s,
      minVp,
      maxVp,
      minFs,
      maxFs,
      minScale,
      maxScale
    );
    str = str + indent(gen + '\n', 1, 2);
  });
  return ':root {\n' + str + '}';
};

const generateFluidVariables = (minVp: number, maxVp: number) => {
  const fluidMinVp = `--fluid-min-width: ${minVp};`;
  const fluidMaxVp = `--fluid-max-width: ${maxVp};`;
  const fluidBp = `--fluid-bp: calc(
        (var(--fluid-screen) - var(--fluid-min-width) / 16 * 1rem) /
        (var(--fluid-max-width) - var(--fluid-min-width))
      );`;

  const flmw = indent(fluidMinVp + '\n', 1, 2);
  const flmxw = indent(fluidMaxVp + '\n', 1, 2);
  const fls = indent('--fluid-screen: 100vw;\n', 1, 2);
  const flbp = indent(fluidBp + '\n', 1, 2);

  return ':root {\n' + flmw + flmxw + fls + flbp + '}\n';
};

const setMediaScreen = (maxVp: number) => {
  const media = `@media screen and (min-width: ${maxVp / 16}em) {`;
  const fluidSscreen = `--fluid-screen: calc(var(--fluid-max-width) * 1px);`;

  return (
    media +
    '\n' +
    indent(':root {\n', 1, 2) +
    indent(fluidSscreen + '\n', 1, 4) +
    indent('}\n', 1, 2) +
    '}\n'
  );
};

const calculatorStepFs = (
  step: number,
  minFs: number,
  maxFs: number,
  minTs: number,
  maxTs: number
) => {
  const minSt = `--f-${step}-min`;
  const maxSt = `--f-${step}-max`;
  const st = `--step-${step}`;
  const formula = `calc(
      ((var(${minSt}) / 16) * 1rem) + (var(${maxSt}) - var(${minSt}))
     * var(--fluid-bp)
    );`;

  const fsMinValue = calculatorFsFromStep(minFs, step, minTs);
  const fsMaxValue = calculatorFsFromStep(maxFs, step, maxTs);

  const minVar = `${minSt}: ${fsMinValue.toFixed(2)};`;
  const maxVar = `${maxSt}: ${fsMaxValue.toFixed(2)};`;
  const f = `${st}: ${formula}`;

  return (
    indent(minVar + '\n', 1, 2) +
    indent(maxVar + '\n', 1, 2) +
    indent(f + '\n', 1, 2)
  );
};

export const generateTypeCssNotClamp = (
  steps: number[],
  minVp: number,
  maxVp: number,
  minFs: number,
  maxFs: number,
  minTs: number,
  maxTs: number
) => {
  const vp = generateFluidVariables(minVp, maxVp);
  const media = setMediaScreen(maxVp);

  let caclStr = '';
  steps.forEach((s) => {
    caclStr = caclStr + calculatorStepFs(s, minFs, maxFs, minTs, maxTs);
  });
  caclStr = ':root {\n' + caclStr + '}';

  return vp + '\n' + media + '\n' + caclStr;
};

const calculatorSpaceForMultiVal = (fs: number, multi: number) => fs * multi;

export const generateSpaceDataTable = (
  sizes: Size[],
  vpArr: (number | string)[],
  minVp: number,
  maxVp: number,
  minFs: number,
  maxFs: number
) => {
  const data: string[][] = [];
  sizes.forEach(({ size, multi }) => {
    const row = [size];
    vpArr.forEach((vp) => {
      let fs;
      const mFs = calculatorSpaceForMultiVal(minFs, multi);
      const mxFs = calculatorSpaceForMultiVal(maxFs, multi);
      if (typeof vp === 'string') row.push(multi.toString());
      else {
        if (vp <= minVp) fs = mFs;
        else if (vp >= maxVp) fs = mxFs;
        else fs = calculatorNewFsForNewVp(vp, minVp, maxVp, mFs, mxFs);
        row.push(Math.round(fs).toString() + 'px');
      }
    });
    data.push(row);
  });
  return data;
};

export const newSizeName = (sizes: Size[], large = true): string => {
  const lastIndex = sizes.length - 1;
  switch (large) {
    case false:
      if (sizes[0].size === 's') return 'xs';
      else if (sizes[0].size === 'xs') return '2xs';
      else return `${sizes[0].index + 1}xs`;
    case true:
      if (sizes[lastIndex].size === 's') return 'm';
      else if (sizes[lastIndex].size === 'm') return 'l';
      else if (sizes[lastIndex].size === 'l') return 'xl';
      else if (sizes[lastIndex].size === 'xl') return '2xl';
      else return `${sizes[lastIndex].index + 1}xl`;
  }
};

export const getIndexSize = (sizes: Size[], large = true): number => {
  const lastIndex = sizes.length - 1;
  switch (large) {
    case false:
      if (sizes[0].size === 's') return 0;
      else if (sizes[0].size === 'xs') return 2;
      else return sizes[0].index + 1;
    case true:
      if (sizes[lastIndex].size === 's') return 0;
      else if (sizes[lastIndex].size === 'm') return 0;
      else if (sizes[lastIndex].size === 'l') return 0;
      else if (sizes[lastIndex].size === 'xl') return 2;
      else return sizes[lastIndex].index + 1;
  }
};

const getPair = (sizes: Size[], minFs: number, maxFs: number) => {
  if (sizes.length <= 1) return [];
  const listSizes = [];
  const listValsPx = [];
  const listVals = [];
  let mxW1 = 80,
    mxW2 = 80;

  for (let i = 0; i < sizes.length - 1; i++) {
    const minMulti = sizes[i].multi;
    const maxMulti = sizes[i + 1].multi;
    const mfs = minFs * minMulti;
    const mxfs = maxFs * maxMulti;

    if (mfs > mxW1) mxW1 = mfs;
    if (mxfs > mxW2) mxW2 = mxfs;

    listSizes.push(`${sizes[i].size}-${sizes[i + 1].size}`);
    listValsPx.push(`${Math.round(mfs)}-${Math.round(mxfs)}`);
    listVals.push([mfs, mxfs]);
  }
  mxW1 = Math.round(mxW1);
  mxW2 = Math.round(mxW2);
  return { listSizes, listValsPx, listVals, mxW1, mxW2 };
};

export const generatePairSpaceDataTable = (
  sizes: Size[],
  minFs: number,
  maxFs: number,
  minVp: number,
  maxVp: number,
  vpArr: number[]
) => {
  const data: string[][] = [];
  const result = getPair(sizes, minFs, maxFs);
  if (Array.isArray(result)) return { data, mxW1: 120, mxW2: 120 };
  const { listSizes, listValsPx, listVals, mxW1, mxW2 } = result;
  listVals.forEach(([minV, maxV], i) => {
    const row = [listSizes[i], listValsPx[i]];
    vpArr.forEach((vp) => {
      let fs;
      if (vp <= minVp) fs = minV;
      else if (vp >= maxVp) fs = maxV;
      else fs = calculatorNewFsForNewVp(vp, minVp, maxVp, minV, maxV);
      row.push(Math.round(fs).toString() + 'px');
    });
    data.push(row);
  });
  return { data, mxW1, mxW2 };
};

const calculatorPairCustomSpace = (
  sizei: string,
  sizej: string,
  id: string,
  sizes: Size[],
  minVp: number,
  maxVp: number,
  minFs: number,
  maxFs: number,
  vpArr: number[]
) => {
  const s1 = sizes.find((s) => s.size === sizei);
  const s2 = sizes.find((s) => s.size === sizej);
  if (!s1 || !s2) return { row: [], minLeft: 0, maxRight: 0 };
  const minLeft = minFs * s1.multi;
  const maxRight = maxFs * s2.multi;

  const row = [
    `${s1.size}-${s2.size}-${id}`,
    `${Math.round(minLeft)}-${Math.round(maxRight)}`,
  ];

  vpArr.forEach((vp) => {
    let fs;
    if (vp <= minVp) fs = minLeft;
    else if (vp >= maxVp) fs = maxRight;
    else fs = calculatorNewFsForNewVp(vp, minVp, maxVp, minLeft, maxRight);
    row.push(`${Math.round(fs)}px`);
  });

  return { row, minLeft, maxRight };
};

export const generateCustomPairSpaceDataTable = (
  pair: string[][],
  sizes: Size[],
  minVp: number,
  maxVp: number,
  minFs: number,
  maxFs: number,
  vpArr: number[]
) => {
  const data: string[][] = [];
  let mxW1 = 80,
    mxW2 = 80;
  if (pair.length === 0) return { data, mxW1: 120, mxW2: 120 };

  pair.forEach(([i, j, id]) => {
    const { row, minLeft, maxRight } = calculatorPairCustomSpace(
      i,
      j,
      id,
      sizes,
      minVp,
      maxVp,
      minFs,
      maxFs,
      vpArr
    );
    if (mxW1 < minLeft) mxW1 = minLeft;
    if (mxW2 < maxRight) mxW2 = maxRight;
    if (row.length > 0) data.push(row);
  });
  return { data, mxW1, mxW2 };
};

export const diableBtn = (sizes: Size[], pair: string) => {
  const [i, j] = pair.split('-');
  let dTL = false,
    dBL = false,
    dTR = false,
    dBR = false;
  const li = sizes.findIndex((s) => s.size === i);
  const ri = sizes.findIndex((s) => s.size === j);
  if (li === 0) dBL = true;
  if (li === sizes.length - 1) dTL = true;
  if (ri === 0) dBR = true;
  if (ri === sizes.length - 1) dTR = true;

  return { dBL, dBR, dTL, dTR };
};

export const getCustomPair = (
  pairs: string[][],
  sizes: Size[],
  id: string,
  pos: string
) => {
  const index = pairs.findIndex((p) => p[2] === id);
  if (index < 0) return;

  let [s1, s2] = pairs[index];

  switch (pos) {
    case 'TL':
    case 'BL':
      const i = sizes.findIndex((s) => s.size === s1);
      if (pos === 'TL') s1 = sizes[i + 1].size;
      if (pos === 'BL') s1 = sizes[i - 1].size;
      break;
    case 'TR':
    case 'BR':
      const j = sizes.findIndex((s) => s.size === s2);
      if (pos === 'TR') s2 = sizes[j + 1].size;
      if (pos === 'BR') s2 = sizes[j - 1].size;
      break;
  }
  pairs[index] = [s1, s2, id];
  return pairs;
};

export const manageGridSize = (sizes: Size[], size: string, pos: string) => {
  const i = sizes.findIndex((s) => s.size === size);
  if (pos === 'T') return sizes[i + 1].size;
  else if (pos === 'B') return sizes[i - 1].size;
  return 's';
};

const generateClampForIndividualSpace = (
  size: Size,
  minVp: number,
  maxVp: number,
  minFs: number,
  maxFs: number,
  name: string
) => {
  const minSpaceFs =
    Math.round(calculatorSpaceForMultiVal(minFs, size.multi)) / 16;
  const maxSpaceFs =
    Math.round(calculatorSpaceForMultiVal(maxFs, size.multi)) / 16;
  const [a, b] = calculatorAAndBForClamp(minVp, maxVp, minSpaceFs, maxSpaceFs);
  const str = `--space-${name}: clamp(${minSpaceFs.toFixed(
    2
  )}rem, calc(${a}rem + ${b}vw), ${maxSpaceFs.toFixed(2)}rem);`;

  return indent(str + '\n', 1, 2);
};

const generateClampForListOfIndividualSpaces = (
  sizes: Size[],
  minVp: number,
  maxVp: number,
  minFs: number,
  maxFs: number
) => {
  let str = '';
  sizes.forEach((s) => {
    const result = generateClampForIndividualSpace(
      s,
      minVp,
      maxVp,
      minFs,
      maxFs,
      s.size
    );
    str += result;
  });
  return str;
};

const generateClampForListOfPairSpaces = (
  sizes: Size[],
  minVp: number,
  maxVp: number,
  minFs: number,
  maxFs: number
) => {
  if (sizes.length <= 1) return '';

  let str = indent(`/* One-up pairs */\n`, 1, 2);

  for (let i = 0; i < sizes.length - 1; i++) {
    const name = `${sizes[i].size}-${sizes[i + 1].size}`;
    const mfs = Math.round(minFs * sizes[i].multi) / 16;
    const mxfs = Math.round(maxFs * sizes[i + 1].multi) / 16;
    const [a, b] = calculatorAAndBForClamp(minVp, maxVp, mfs, mxfs);
    const s = `--space-${name}: clamp(${mfs.toFixed(
      2
    )}rem, calc(${a}rem + ${b}vw), ${mxfs.toFixed(2)}rem);`;
    str += indent(s + '\n', 1, 2);
  }
  return str;
};

const getCurrentPairs = (
  pairs: string[][],
  sizes: Size[],
  minFs: number,
  maxFs: number
) => {
  const curPairs: { name: string; mfs: number; mxfs: number }[] = [];
  pairs.forEach((p) => {
    const s1 = sizes.find((s) => s.size === p[0]);
    const s2 = sizes.find((s) => s.size === p[1]);
    if (s1 && s2)
      curPairs.push({
        name: `${p[0]}-${p[1]}`,
        mfs: Math.round(s1.multi * minFs) / 16,
        mxfs: Math.round(s2.multi * maxFs) / 16,
      });
  });
  return curPairs;
};

const generateClampForListOfCustomPairSpaces = (
  pairs: string[][],
  sizes: Size[],
  minVp: number,
  maxVp: number,
  minFs: number,
  maxFs: number
) => {
  const curPairs = getCurrentPairs(pairs, sizes, minFs, maxFs);
  if (curPairs.length === 0) return '';

  let str = indent(`/* Custom pairs */\n`, 1, 2);
  curPairs.forEach(({ name, mfs, mxfs }) => {
    const [a, b] = calculatorAAndBForClamp(minVp, maxVp, mfs, mxfs);
    const s = `--space-${name}: clamp(${mfs.toFixed(
      2
    )}rem, calc(${a}rem + ${b}vw), ${mxfs.toFixed(2)}rem);`;
    str += indent(s + '\n', 1, 2);
  });
  return str;
};

export const generateSpaceCSS = (
  pairs: string[][],
  sizes: Size[],
  minVp: number,
  maxVp: number,
  minFs: number,
  maxFs: number
) => {
  let str = ':root {\n';
  const individual = generateClampForListOfIndividualSpaces(
    sizes,
    minVp,
    maxVp,
    minFs,
    maxFs
  );
  str += individual;
  const pair = generateClampForListOfPairSpaces(
    sizes,
    minVp,
    maxVp,
    minFs,
    maxFs
  );
  if (pair) str = str + '\n' + pair;
  const customPair = generateClampForListOfCustomPairSpaces(
    pairs,
    sizes,
    minVp,
    maxVp,
    minFs,
    maxFs
  );
  if (customPair) str = str + '\n' + customPair;
  str += '}\n';
  return str;
};

// setMediaScreen-generateFluidVariables

export const generateSpaceCSSNotClamp = (
  pairs: string[][],
  sizes: Size[],
  minVp: number,
  maxVp: number,
  minFs: number,
  maxFs: number
) => {
  let str = '';
  const fluidVariables = generateFluidVariables(minVp, maxVp);
  const media = setMediaScreen(maxVp);
  str = str + fluidVariables + '\n' + media + '\n';
  str += ':root {\n';

  sizes.forEach(({ size, multi }) => {
    if (size === 's')
      str =
        str +
        indent('--fc-s-min: (var(--f-0-min, ' + minFs + '));\n', 1, 2) +
        indent('--fc-s-max: (var(--f-0-max, ' + maxFs + '));\n', 1, 2) +
        '\n';
    else {
      const min = `--fc-${size}-min: (var(--fc-s-min) * ${multi});`;
      const max = `--fc-${size}-max: (var(--fc-s-max) * ${multi});`;
      str = str + indent(min + '\n', 1, 2) + indent(max + '\n', 1, 2) + '\n';
    }
  });
  str += indent('/* T-shirt sizes */\n', 1, 2);

  sizes.forEach(({ size }) => {
    const s = `--space-${size}: calc(((var(--fc-${size}-min) / 16) * 1rem) + (var(--fc-${size}-max) - var(--fc-${size}-min)) * var(--fluid-bp));`;
    str += indent(s + '\n', 1, 2);
  });

  if (sizes.length > 1) {
    str = str + '\n' + indent('/* One-up pairs */\n', 1, 2);
    for (let i = 0; i < sizes.length - 1; i++) {
      const s = `--space-${sizes[i].size}-${
        sizes[i + 1].size
      }: calc(((var(--fc-${sizes[i].size}-min) / 16) * 1rem) + (var(--fc-${
        sizes[i + 1].size
      }-max) - var(--fc-${sizes[i].size}-min)) * var(--fluid-bp));`;
      str += indent(s + '\n', 1, 2);
    }
  }

  const curPairs = getCurrentPairs(pairs, sizes, minFs, maxFs);
  if (curPairs.length === 0) return str + '}\n';
  str = str + '\n' + indent('/* Custom pairs */\n', 1, 2);
  curPairs.forEach((p) => {
    const [s1, s2] = p.name.split('-');
    const s = `--space-${p.name}: calc(((var(--fc-${s1}-min) / 16) * 1rem) + (var(--fc-${s2}-max) - var(--fc-${s1}-min)) * var(--fluid-bp));`;
    str += indent(s + '\n', 1, 2);
  });
  return str + '}';
};

export const generateGridTableData = (
  sizes: Size[],
  grid: GridType,
  minVp: number,
  minFs: number,
  maxFs: number,
  currentVp: number
) => {
  const minGutter = Math.round(
    sizes.find((s) => s.size === grid.minGutterSize)!.multi * minFs
  );
  const maxGutter = Math.round(
    sizes.find((s) => s.size === grid.maxGutterSize)!.multi * maxFs
  );
  const maxColWidth = Math.round(
    sizes.find((s) => s.size === grid.maxWidthSize)!.multi * maxFs
  );

  const maxVp = maxColWidth * grid.maxCol + (grid.maxCol + 1) * maxGutter;

  if (currentVp > maxVp && maxVp <= window.innerWidth) {
    currentVp = maxVp;
  } else if (currentVp < minVp) currentVp = minVp;

  const row1 = [
    'Container',
    `${minVp}px`,
    `${maxVp}px`,
    `${Math.round(currentVp)}px`,
  ];

  let currentGutter;
  if (currentVp < minVp) currentGutter = minGutter;
  else if (currentVp > maxVp) currentGutter = maxGutter;
  else
    currentGutter = calculatorNewFsForNewVp(
      currentVp,
      minVp,
      maxVp,
      minGutter,
      maxGutter
    );
  currentGutter = Math.round(currentGutter);

  const row2 = [
    'Gutter',
    `${minGutter}px`,
    `${maxGutter}px`,
    `${currentGutter}px`,
  ];

  const minColWidth = (minVp - (grid.maxCol + 1) * minGutter) / grid.maxCol;

  let currentColWidth;
  if (currentVp < minVp) currentColWidth = minColWidth;
  else if (currentVp > maxVp) currentColWidth = maxColWidth;
  else
    currentColWidth =
      (currentVp - (grid.maxCol + 1) * currentGutter) / grid.maxCol;

  currentColWidth = Math.round(currentColWidth);

  const row3 = [
    'Column',
    `${minColWidth.toFixed(2)}px`,
    `${maxColWidth}px`,
    `${currentColWidth}px`,
  ];

  const info: GridInfoType = {
    minCtn: minVp,
    maxCtn: maxVp,
    curCtn: currentVp,
    minGutter,
    maxGutter,
    currentGutter,
    minColWidth,
    maxColWidth,
    currentColWidth,
  };

  return {
    data: [row1, row2, row3],
    info,
  };
};

const generateGridContainerCss = () => {
  return (
    '.u-container {\n' +
    indent('max-width: var(--grid-max-width);\n', 1, 2) +
    indent('padding-inline: var(--grid-gutter);\n', 1, 2) +
    indent(' margin-inline: auto;\n', 1, 2) +
    '}\n\n' +
    '.u-grid {\n' +
    indent('display: grid;\n', 1, 2) +
    indent('gap: var(--grid-gutter);\n', 1, 2) +
    '}'
  );
};

export const generateGridCss = (
  sizes: Size[],
  grid: GridType,
  minVp: number,
  minFs: number,
  maxFs: number
) => {
  let str = 'root: {\n';
  let minGutter = Math.round(
    sizes.find((s) => s.size === grid.minGutterSize)?.multi! * minFs
  );
  let maxGutter = Math.round(
    sizes.find((s) => s.size === grid.maxGutterSize)?.multi! * maxFs
  );
  let maxColWidth = Math.round(
    sizes.find((s) => s.size === grid.maxWidthSize)?.multi! * maxFs
  );

  const gridMaxWidth =
    maxColWidth * grid.maxCol + maxGutter * (grid.maxCol + 1);

  minGutter = minGutter / 16;
  maxGutter = maxGutter / 16;

  const [a, b] = calculatorAAndBForClamp(
    minVp,
    gridMaxWidth,
    minGutter,
    maxGutter
  );

  const gmw = `--grid-max-width: ${(gridMaxWidth / 16).toFixed(2)}rem;\n`;
  const ggt = `--grid-gutter: var(--space-${grid.minGutterSize}-${
    grid.maxGutterSize
  }, clamp(${minGutter.toFixed(
    2
  )}rem, calc(${a}rem + ${b}vw), ${maxGutter.toFixed(2)}rem));\n`;
  const gcl = `--grid-columns: ${grid.maxCol};\n`;

  return (
    str +
    indent(gmw, 1, 2) +
    indent(ggt, 1, 2) +
    indent(gcl, 1, 2) +
    '}\n\n' +
    generateGridContainerCss()
  );
};

export const get4Blogs = () => {
  const set = new Set<(typeof blogs)[0]>();
  const n = blogs.length;
  do {
    const i = Math.floor(Math.random() * n);
    set.add(blogs[i]);
  } while (set.size !== 4);

  return Array.from(set);
};
