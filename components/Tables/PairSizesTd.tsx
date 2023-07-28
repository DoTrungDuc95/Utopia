import {
  CalculatorInput,
  useCalculatorInput,
} from '@/store/useCalculatorInput';

import { diableBtn } from '@/utils/calculator';

import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from 'react-icons/md';

type PairSizesTdProps = {
  pair: string;
  custom?: boolean;
  onTopRightClick?: (id: string, pos: string) => void;
  onBottomRightClick?: (id: string, pos: string) => void;
  onTopLeftClick?: (id: string, pos: string) => void;
  onBottomLeftClick?: (id: string, pos: string) => void;
  sizeLeft?: string;
  sizeRight?: string;
  diableTR?: boolean;
  diableTL?: boolean;
  diableBR?: boolean;
  diableBL?: boolean;
  index: number;
};

const PairSizesTd = ({
  pair,
  custom = false,
  onBottomLeftClick,
  onBottomRightClick,
  onTopLeftClick,
  onTopRightClick,
  index,
}: PairSizesTdProps) => {
  const sizes = useCalculatorInput((state: CalculatorInput) => state.sizes);
  const { dBL, dTL, dBR, dTR } = diableBtn(sizes, pair);
  const [s1, s2, id] = pair.split('-');

  return (
    <div className="flex-ct-ct">
      <div className="pair-outer">
        {custom && (
          <button
            onClick={(e) => {
              e.preventDefault();
              if (onTopLeftClick) onTopLeftClick(id, 'TL');
            }}
            disabled={dTL}
          >
            <MdOutlineKeyboardArrowUp size="1.5em" />
          </button>
        )}
        <p className="size flex-ct-ct">{s1}</p>
        {custom && (
          <button
            onClick={(e) => {
              e.preventDefault();
              if (onBottomLeftClick) onBottomLeftClick(id, 'BL');
            }}
            disabled={dBL}
          >
            <MdOutlineKeyboardArrowDown size="1.5em" />
          </button>
        )}
      </div>
      <span
        style={{
          marginBottom: '.5em',
          fontWeight: '900',
          color: '#0007',
          letterSpacing: '.1rem',
        }}
      >
        ...
      </span>
      <div className="pair-outer">
        {custom && (
          <button
            onClick={(e) => {
              e.preventDefault();
              if (onTopRightClick) onTopRightClick(id, 'TR');
            }}
            disabled={dTR}
          >
            <MdOutlineKeyboardArrowUp size="1.5em" />
          </button>
        )}
        <p className="size flex-ct-ct">{s2}</p>
        {custom && (
          <button
            onClick={(e) => {
              e.preventDefault();
              if (onBottomRightClick) onBottomRightClick(id, 'BR');
            }}
            disabled={dBR}
          >
            <MdOutlineKeyboardArrowDown size="1.5em" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PairSizesTd;
