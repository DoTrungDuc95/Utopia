import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  useCalculatorInput,
  CalculatorInput,
  CalcType,
} from '../../store/useCalculatorInput';
import CirclrButton from '../CirclrButton';

import { MdAddCircleOutline, MdRemoveCircleOutline } from 'react-icons/md';
import { useVpModal, VpModal } from '../../store/useVpModal';
import {
  generateCustomPairSpaceDataTable,
  generatePairSpaceDataTable,
  getCustomPair,
} from '@/utils/calculator';
import PairSizesTd from './PairSizesTd';
import PairSpaceTd from './PairSpaceTd';

const CustomPairSpaceTable = () => {
  const calcVal: CalcType = useCalculatorInput(
    (state: CalculatorInput) => state.calcVal
  );
  const { maxFs, minFs, minVp, maxVp } = calcVal;

  const vpArr = useCalculatorInput((state: CalculatorInput) => state.vpArr);
  const sizes = useCalculatorInput((state: CalculatorInput) => state.sizes);
  const pair = useCalculatorInput((state: CalculatorInput) => state.pair);
  const setPair = useCalculatorInput((state: CalculatorInput) => state.setPair);

  const openVpModal = useVpModal((state: VpModal) => state.openVpModal);

  const [dataTb, setdataTb] = useState<string[][]>([]);
  const mxW1Ref = useRef(120);
  const mxW2Ref = useRef(120);

  const onAddNewVpClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    openVpModal();
  };

  const onPairBtnClick = (id: string, pos: string) => {
    const pairs = getCustomPair(pair, sizes, id, pos);
    setPair(JSON.parse(JSON.stringify(pairs)));
  };

  const onAddNewPairClick = (e: React.MouseEvent<HTMLElement>) => {
    const p = [
      ...pair,
      ['s', 's', `${require('crypto').randomBytes(64).toString('hex')}`],
    ];
    setPair(p);
  };

  const onRemovePairClick = (p: string) => {
    const resule = pair.filter((item) => item[2] !== p.split('-')[2]);
    setPair(resule);
  };

  useEffect(() => {
    const { data, mxW1, mxW2 } = generateCustomPairSpaceDataTable(
      pair,
      sizes,
      minVp,
      maxVp,
      minFs,
      maxFs,
      vpArr
    );
    setdataTb(data);
    mxW1Ref.current = mxW1;
    mxW2Ref.current = mxW2;
    return () => {};
  }, [vpArr, calcVal, sizes, minVp, maxVp, minFs, maxFs, pair]);

  return (
    <div className="container ctn-padding">
      <h3
        style={{
          textTransform: 'uppercase',
          paddingBottom: 'var(--space-3xl)',
        }}
      >
        Giá trị các cặp khoảng cách tùy chỉnh
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
                        <PairSizesTd
                          index={i}
                          pair={data}
                          custom
                          onBottomLeftClick={onPairBtnClick}
                          onBottomRightClick={onPairBtnClick}
                          onTopLeftClick={onPairBtnClick}
                          onTopRightClick={onPairBtnClick}
                        />
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
                <td>
                  <div className="flex-end-ct">
                    <CirclrButton
                      onClick={(e) => {
                        e.preventDefault();
                        onRemovePairClick(row[0]);
                      }}
                      ariaLabel="xóa cặp khoảng cách"
                    >
                      <MdRemoveCircleOutline size={'1.5em'} />
                    </CirclrButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th colSpan={vpArr.length + 2}>
                <div className="flex-end-ct">
                  <p className="h4-text">Thêm mới</p>
                  <CirclrButton
                    onClick={onAddNewPairClick}
                    ariaLabel="thêm cặp khoảng cách mới"
                  >
                    <MdAddCircleOutline size={'1.5em'} />
                  </CirclrButton>
                </div>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default CustomPairSpaceTable;
