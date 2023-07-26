import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  useCalculatorInput,
  CalculatorInput,
  CalcType,
} from '../../store/useCalculatorInput';
import CirclrButton from '../CirclrButton';

import { MdAddCircleOutline } from 'react-icons/md';
import { useVpModal, VpModal } from '../../store/useVpModal';
import { generatePairSpaceDataTable } from '@/utils/calculator';
import PairSizesTd from './PairSizesTd';
import PairSpaceTd from './PairSpaceTd';

const PairSpaceTable = () => {
  const calcVal: CalcType = useCalculatorInput(
    (state: CalculatorInput) => state.calcVal
  );
  const { maxFs, minFs, minVp, maxVp } = calcVal;
  const vpArr = useCalculatorInput((state: CalculatorInput) => state.vpArr);
  const sizes = useCalculatorInput((state: CalculatorInput) => state.sizes);

  const openVpModal = useVpModal((state: VpModal) => state.openVpModal);

  const [dataTb, setdataTb] = useState<string[][]>([]);
  const mxW1Ref = useRef(120);
  const mxW2Ref = useRef(120);

  useEffect(() => {
    const { data, mxW1, mxW2 } = generatePairSpaceDataTable(
      sizes,
      minFs,
      maxFs,
      minVp,
      maxVp,
      vpArr
    );

    setdataTb(data);
    mxW1Ref.current = mxW1;
    mxW2Ref.current = mxW2;
    return () => {};
  }, [vpArr, calcVal, sizes, minVp, maxVp, minFs, maxFs]);

  const onAddNewVpClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    openVpModal();
  };

  return (
    <div className="container ctn-padding">
      <h3
        style={{
          textTransform: 'uppercase',
          paddingBottom: 'var(--space-3xl)',
        }}
      >
        Giá trị các cặp khoảng cách liên tiếp
      </h3>
      <div className="table-outer space-tb">
        <table className="table space-tb">
          <colgroup>
            {Array(vpArr.length + 3)
              .fill(null)
              .map((_, i) => (
                <col key={i} className={`${i == 0 ? 'first-col' : ''}`} />
              ))}
          </colgroup>
          <thead>
            <tr>
              <th> Cặp giá trị</th>
              <th>
                <div
                  className="pair-space-data-grid"
                  style={{
                    gridTemplateColumns: `${mxW1Ref.current}px 15vw ${mxW2Ref.current}px`,
                  }}
                >
                  <p className="h4-text">{minVp}</p>
                  <span></span>
                  <p className="h4-text">{maxVp}</p>
                </div>
              </th>
              {vpArr.map((vp, i) => (
                <th key={i}>{vp}</th>
              ))}
              <th>
                <div className="flex-end-ct">
                  <CirclrButton
                    onClick={onAddNewVpClick}
                    ariaLabel="thêm khung nhìn"
                  >
                    <MdAddCircleOutline size={'1.5em'} />
                  </CirclrButton>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {dataTb.map((row, i) => (
              <tr key={i}>
                {row.map((data, j) => {
                  if (j === 0)
                    return (
                      <td key={j}>
                        <PairSizesTd index={j} pair={data} />
                      </td>
                    );
                  if (j === 1)
                    return (
                      <td className="td-with-square" key={j}>
                        <PairSpaceTd
                          pair={data}
                          mxW1={mxW1Ref.current}
                          mxW2={mxW2Ref.current}
                        />
                      </td>
                    );
                  return (
                    <td className="td-with-square" key={j}>
                      {data}
                    </td>
                  );
                })}
                <td></td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th colSpan={vpArr.length + 2}></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default PairSpaceTable;
