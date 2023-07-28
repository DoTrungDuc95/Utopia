import {
  CalculatorInput,
  Size,
  useCalculatorInput,
} from '@/store/useCalculatorInput';

import { diableBtn } from '@/utils/calculator';
import { useMemo } from 'react';

import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from 'react-icons/md';

type SizeTdProps = {
  size: string;
  onTopClick?: (id: string) => void;
  onBottomClick?: (id: string) => void;
  diableT?: boolean;
  diableB?: boolean;
  label?: string;
};

const SizeTd = ({
  size,
  onTopClick,
  onBottomClick,
  label = '',
}: SizeTdProps) => {
  const sizes = useCalculatorInput((state: CalculatorInput) => state.sizes);
  const { minFs, maxFs } = useCalculatorInput(
    (state: CalculatorInput) => state.calcVal
  );

  const sizeValue = useMemo(() => {
    const s = sizes.find((s: Size) => s.size === size);
    if (label === '@min') return Math.round(s?.multi! * minFs);
    else return Math.round(s?.multi! * maxFs);
  }, [sizes, size, minFs, maxFs, label]);

  const [disT, disB] = useMemo(() => {
    const index = sizes.findIndex((s: Size) => s.size === size);
    if (index === 0) return [false, true];
    if (index === sizes.length - 1) return [true, false];
    return [false, false];
  }, [sizes, size]);

  return (
    <div className="flex-start-ct">
      <div className="pair-outer">
        <button
          onClick={(e) => {
            e.preventDefault();
            if (onTopClick) onTopClick('T');
          }}
          disabled={disT}
        >
          <MdOutlineKeyboardArrowUp size="1.5em" />
        </button>
        <p className="size flex-ct-ct">{size}</p>
        <button
          onClick={(e) => {
            e.preventDefault();
            if (onBottomClick) onBottomClick('B');
          }}
          disabled={disB}
        >
          <MdOutlineKeyboardArrowDown size="1.5em" />
        </button>
      </div>
      <div>
        {label && <label style={{ fontWeight: 700 }}>{label}</label>}
        <p className="h4-text">{sizeValue}px</p>
      </div>
    </div>
  );
};

export default SizeTd;
