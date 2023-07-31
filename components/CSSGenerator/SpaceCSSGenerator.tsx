import {
  CalculatorInput,
  useCalculatorInput,
} from '@/store/useCalculatorInput';
import { generateSpaceCSS, generateSpaceCSSNotClamp } from '@/utils/calculator';
import CSSGenerator from '@/components/CSSGenerator/CSSGenerator';
import { useEffect, useState } from 'react';

const SpaceCSSGenerator = () => {
  const [useClamp, setUseClamp] = useState(true);
  const [clamp, setClamp] = useState('');
  const { maxVp, minFs, minVp, maxFs } = useCalculatorInput(
    (state: CalculatorInput) => state.calcVal
  );
  const sizes = useCalculatorInput((state: CalculatorInput) => state.sizes);
  const pairs = useCalculatorInput((state: CalculatorInput) => state.pair);

  useEffect(() => {
    let str = '';
    if (useClamp) {
      str = generateSpaceCSS(pairs, sizes, minVp, maxVp, minFs, maxFs);
    } else {
      str = generateSpaceCSSNotClamp(pairs, sizes, minVp, maxVp, minFs, maxFs);
    }
    setClamp(str);
  }, [pairs, sizes, minVp, maxVp, minFs, maxFs, useClamp]);

  return (
    <div className="container ctn-padding">
      <div>
        <p className="h2-text">CssGenerator</p>
        <div className="flex-start-ct checkbox-outer">
          <input
            id="user-clamp"
            type="checkbox"
            checked={useClamp}
            onChange={(e) => setUseClamp((p) => !p)}
          />
          <label className="not-pointer-events" htmlFor="user-clamp">
            Sử dụng clamp
          </label>
        </div>
      </div>
      <CSSGenerator clamp={clamp} />
    </div>
  );
};

export default SpaceCSSGenerator;
