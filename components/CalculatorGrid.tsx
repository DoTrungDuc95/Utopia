import {
  CalculatorInput,
  useCalculatorInput,
} from '@/store/useCalculatorInput';
import SizeTd from './Tables/SizeTd';
import { manageGridSize } from '@/utils/calculator';

const CalculatorGrid = () => {
  const sizes = useCalculatorInput((state: CalculatorInput) => state.sizes);
  const grid = useCalculatorInput((state: CalculatorInput) => state.grid);
  const setGrid = useCalculatorInput((state: CalculatorInput) => state.setGrid);

  const handlerMinGutterClick = (pos: string) => {
    const size = manageGridSize(sizes, grid.minGutterSize, pos);
    setGrid({ ...grid, minGutterSize: size });
  };

  const handlerMaxGutterClick = (pos: string) => {
    const size = manageGridSize(sizes, grid.maxGutterSize, pos);
    setGrid({ ...grid, maxGutterSize: size });
  };

  const handlerMaxColWidthClick = (pos: string) => {
    const size = manageGridSize(sizes, grid.maxWidthSize, pos);
    setGrid({ ...grid, maxWidthSize: size });
  };

  const handlerColumnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = Number(e.currentTarget.value);
    if (isNaN(val)) return;
    val = Math.round(val);
    if (val < 1) val = 1;
    if (val > 64) val = 64;
    setGrid({ ...grid, maxCol: val });
  };

  return (
    <div className="container ctn-padding">
      <div className="calculator-grid-outer">
        <div className="gutter-outer">
          <label className="calculator-grid-label">Khoảng cách</label>
          <div className="calculator-size">
            <SizeTd
              size={grid.minGutterSize}
              label="@min"
              onBottomClick={handlerMinGutterClick}
              onTopClick={handlerMinGutterClick}
            />
            <SizeTd
              size={grid.maxGutterSize}
              label="@max"
              onBottomClick={handlerMaxGutterClick}
              onTopClick={handlerMaxGutterClick}
            />
          </div>
        </div>

        <div className="column-outer">
          <div className="column-max-width">
            <label className="calculator-grid-label">
              Chiều rộng cột lớn nhất
            </label>
            <SizeTd
              size={grid.maxWidthSize}
              onBottomClick={handlerMaxColWidthClick}
              onTopClick={handlerMaxColWidthClick}
            />
          </div>

          <div className="column-numbers">
            <label className="calculator-grid-label">Số lượng cột</label>
            <input
              type="number"
              value={grid.maxCol}
              min={1}
              max={64}
              onChange={handlerColumnChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorGrid;
