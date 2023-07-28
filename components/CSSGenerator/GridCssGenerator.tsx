import {
  CalculatorInput,
  useCalculatorInput,
} from '@/store/useCalculatorInput';
import CSSGenerator from '@/components/CSSGenerator/CSSGenerator';
import { useEffect, useState } from 'react';
import { generateGridCss } from '@/utils/calculator';

type GridCssGeneratorProps = {
  mvp: number;
};

const GridCssGenerator = ({ mvp }: GridCssGeneratorProps) => {
  const [clamp, setClamp] = useState('');

  const { minFs, minVp, maxFs } = useCalculatorInput(
    (state: CalculatorInput) => state.calcVal
  );
  const sizes = useCalculatorInput((state: CalculatorInput) => state.sizes);
  const grid = useCalculatorInput((state: CalculatorInput) => state.grid);

  useEffect(() => {
    const cl = generateGridCss(sizes, grid, mvp, minFs, maxFs);
    setClamp(cl);
  }, [sizes, grid, minFs, maxFs, mvp, minVp]);

  return (
    <div className="container ctn-padding">
      <div>
        <p className="h2-text" style={{ marginBottom: 'var(--space-l)' }}>
          CssGenerator
        </p>
        <div className="desc-type">
          <p>
            {grid.maxCol} cột đã được tạo ra bên trong một chiều rộng tối đa của
            vùng chứa. Nhưng việc tạo ra một hệ thống lưới được viết đầy đủ bằng
            mã CSS thì tùy thuộc vào thiết kế của bạn.
          </p>
          <p>
            Do đó mã CSS dưới đây đã được thiết kế tối thiểu hóa làm tiền đề cho
            bạn xây dựng và tùy chỉnh hệ thống lưới của riêng mình
          </p>
        </div>
      </div>
      <CSSGenerator clamp={clamp} />;
    </div>
  );
};

export default GridCssGenerator;
