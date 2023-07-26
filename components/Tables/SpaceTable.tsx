import React, { useEffect, useMemo, useState } from 'react';
import {
  useCalculatorInput,
  CalculatorInput,
  CalcType,
  Size,
  initSizes,
} from '../../store/useCalculatorInput';
import CirclrButton from '../CirclrButton';

import { MdAddCircleOutline, MdRemoveCircleOutline } from 'react-icons/md';
import { useVpModal, VpModal } from '../../store/useVpModal';
import {
  generateSpaceDataTable,
  getIndexSize,
  newSizeName,
} from '@/utils/calculator';

const SpaceTable = () => {
  const calcVal: CalcType = useCalculatorInput(
    (state: CalculatorInput) => state.calcVal
  );
  const { maxFs, minFs, minVp, maxVp } = calcVal;
  const vpArr = useCalculatorInput((state: CalculatorInput) => state.vpArr);
  const sizes = useCalculatorInput((state: CalculatorInput) => state.sizes);
  const setSizes = useCalculatorInput(
    (state: CalculatorInput) => state.setSizes
  );
  const allVp = useMemo(
    () => ['Hệ số nhân', minVp, maxVp, ...vpArr],
    [minVp, maxVp, vpArr]
  );

  const openVpModal = useVpModal((state: VpModal) => state.openVpModal);

  const [dataTb, setdataTb] = useState<string[][]>([]);

  useEffect(() => {
    const data = generateSpaceDataTable(
      sizes,
      allVp,
      minVp,
      maxVp,
      minFs,
      maxFs
    );
    setdataTb(data);
    return () => {};
  }, [vpArr, calcVal, sizes, allVp, minVp, maxVp, minFs, maxFs]);

  const onAddNewVpClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    openVpModal();
  };

  const addSmallSize = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const size = newSizeName(sizes, false);
    const index = getIndexSize(sizes, false);
    const multi = sizes[0].multi;
    const s = [{ size, multi, index }, ...sizes] as Size[];
    setSizes(s);
  };

  const addLargeSize = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const lastIndex = sizes.length - 1;
    const size = newSizeName(sizes, true);
    const index = getIndexSize(sizes, true);
    const multi = sizes[lastIndex].multi;
    const s = [...sizes, { size, index, multi }] as Size[];
    setSizes(s);
  };

  const removeSmallSize = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (sizes[0].size === 's') return;
    const s = [...sizes];
    s.shift();
    setSizes(s);
  };

  const removeLargeSize = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (sizes[sizes.length - 1].size === 's') return;
    const s = [...sizes];
    s.pop();
    setSizes(s);
  };

  const changeMulti = (
    e: React.ChangeEvent<HTMLInputElement>,
    sizeName: string
  ) => {
    const val = Number(e.currentTarget.value);
    if (isNaN(val)) return;
    const s = [...sizes];
    const i = s.findIndex((size) => size.size === sizeName);
    s[i].multi = val < 0 ? 0 : val;
    setSizes(s);
  };

  return (
    <div className="container ctn-padding">
      <div className="table-outer space-tb">
        <table className="table space-tb">
          <colgroup>
            {Array(allVp.length + 2)
              .fill(null)
              .map((_, i) => (
                <col key={i} className={`${i == 0 ? 'first-col' : ''}`} />
              ))}
          </colgroup>
          <thead>
            <tr>
              <th>
                <div className="flex-ct-ct">
                  {sizes[0].size !== 's' && (
                    <CirclrButton
                      onClick={removeSmallSize}
                      ariaLabel="xóa size"
                    >
                      <MdRemoveCircleOutline size={'1.5em'} />
                    </CirclrButton>
                  )}
                  <CirclrButton onClick={addSmallSize} ariaLabel="thêm size">
                    <MdAddCircleOutline size={'1.5em'} />
                  </CirclrButton>
                </div>
              </th>
              {allVp.map((value, i) => (
                <th key={i}>{value}</th>
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
                        <div className="flex-ct-ct">
                          <p className="size flex-ct-ct">{data}</p>
                        </div>
                      </td>
                    );
                  if (j === 1)
                    return (
                      <td key={j}>
                        <div className="multi-outer">
                          <input
                            id={i.toString()}
                            disabled={row[0] === 's'}
                            min={0}
                            type="number"
                            value={data}
                            onChange={(e) => changeMulti(e, row[0])}
                          />
                        </div>
                      </td>
                    );
                  return (
                    <td key={j} className="td-with-square">
                      <div className="square-outer">
                        <output>{data}</output>
                        {j === 2 || j === 3 ? (
                          <div
                            className="square"
                            style={{ width: data, aspectRatio: '1' }}
                          ></div>
                        ) : null}
                      </div>
                    </td>
                  );
                })}
                <td></td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>
                <div className="flex-ct-ct">
                  {sizes[sizes.length - 1].size !== 's' && (
                    <CirclrButton
                      onClick={removeLargeSize}
                      ariaLabel="xóa size"
                    >
                      <MdRemoveCircleOutline size={'1.5em'} />
                    </CirclrButton>
                  )}
                  <CirclrButton onClick={addLargeSize} ariaLabel="thêm size">
                    <MdAddCircleOutline size={'1.5em'} />
                  </CirclrButton>
                </div>
              </th>
              <th colSpan={allVp.length + 1}>
                <div
                  className="flex-start-ct not-pointer-events"
                  style={{
                    color: 'red',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    width: 'fit-content',
                  }}
                  onClick={() => {
                    const clone = JSON.parse(JSON.stringify(initSizes));
                    setSizes(clone);
                  }}
                >
                  RESET
                </div>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default SpaceTable;
