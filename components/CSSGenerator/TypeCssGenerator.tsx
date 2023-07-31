import {
  CalculatorInput,
  useCalculatorInput,
} from '@/store/useCalculatorInput';
import { generateTypeCss, generateTypeCssNotClamp } from '@/utils/calculator';
import CSSGenerator from '@/components/CSSGenerator/CSSGenerator';
import { useEffect, useState } from 'react';

const TypeCssGenerator = () => {
  const [useClamp, setUseClamp] = useState(true);
  const [clamp, setClamp] = useState('');
  const { maxVp, minFs, minVp, maxFs, minTs, maxTs } = useCalculatorInput(
    (state: CalculatorInput) => state.calcVal
  );
  const steps = useCalculatorInput((state: CalculatorInput) => state.steps);

  useEffect(() => {
    if (useClamp) {
      const cl = generateTypeCss(
        minVp,
        maxVp,
        minFs,
        maxFs,
        steps,
        minTs,
        maxTs
      );
      setClamp(cl);
    } else {
      const cl = generateTypeCssNotClamp(
        steps,
        minVp,
        maxVp,
        minFs,
        maxFs,
        minTs,
        maxTs
      );
      setClamp(cl);
    }
    return () => {};
  }, [useClamp, minVp, maxVp, minFs, maxFs, steps, minTs, maxTs]);

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

export default TypeCssGenerator;
