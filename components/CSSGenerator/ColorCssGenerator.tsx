import CSSGenerator from '@/components/CSSGenerator/CSSGenerator';
import { UseColor, useColor } from '@/store/useColor';
import { generateColorCss } from '@/utils/color';
import { useEffect, useState } from 'react';

const ColorCssGenerator = () => {
  const [clamp, setClamp] = useState('');
  const [type, setType] = useState<'hsl' | 'hex' | 'rgb'>('hsl');
  const color = useColor((state: UseColor) => state.color);
  const sColors = useColor((state: UseColor) => state.sColors);
  const lColors = useColor((state: UseColor) => state.lColors);
  
  useEffect(() => {
    const cl = generateColorCss(color, sColors, lColors, type);
    setClamp(cl);
  }, [color, sColors, lColors, type]);

  const handlerTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.currentTarget.value as 'hsl' | 'hex' | 'rgb');
  };

  return (
    <div style={{ color: '#000' }}>
      <div>
        <p style={{ color: '#fff' }} className="h2-text">
          CssGenerator
        </p>
        <div className="flex-start-ct" style={{ gap: '2rem' }}>
          <div className="flex-start-ct checkbox-outer">
            <input
              id="hsl"
              type="radio"
              name="color"
              checked={type === 'hsl'}
              value="hsl"
              onChange={handlerTypeChange}
            />
            <label
              className="not-pointer-events"
              htmlFor="hsl"
              style={{ color: '#fff' }}
            >
              HSL
            </label>
          </div>
          <div className="flex-start-ct checkbox-outer">
            <input
              id="rgb"
              type="radio"
              name="color"
              checked={type === 'rgb'}
              value="rgb"
              onChange={handlerTypeChange}
            />
            <label
              className="not-pointer-events"
              htmlFor="rgb"
              style={{ color: '#fff' }}
            >
              RGB
            </label>
          </div>
          <div className="flex-start-ct checkbox-outer">
            <input
              id="hex"
              type="radio"
              name="color"
              checked={type === 'hex'}
              value="hex"
              onChange={handlerTypeChange}
            />
            <label
              className="not-pointer-events"
              htmlFor="hex"
              style={{ color: '#fff' }}
            >
              HEX
            </label>
          </div>
        </div>
      </div>
      <CSSGenerator clamp={clamp} />;
    </div>
  );
};

export default ColorCssGenerator;
