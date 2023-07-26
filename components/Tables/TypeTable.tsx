import React, { useEffect, useMemo } from 'react';
import { useState } from 'react';
import {
  useCalculatorInput,
  CalculatorInput,
  CalcType,
} from '../../store/useCalculatorInput';
import CirclrButton from '../CirclrButton';

import { MdAddCircleOutline, MdRemoveCircleOutline } from 'react-icons/md';
import { generateTypeDataTable } from '../../utils/calculator';
import { useVpModal, VpModal } from '../../store/useVpModal';

const TypeTable = () => {
  const calcVal: CalcType = useCalculatorInput(
    (state: CalculatorInput) => state.calcVal
  );
  const { maxFs, maxTs, maxVp, minFs, minTs, minVp } = calcVal;

  const vpArr = useCalculatorInput((state: CalculatorInput) => state.vpArr);
  const steps = useCalculatorInput((state: CalculatorInput) => state.steps);
  const setSteps = useCalculatorInput(
    (state: CalculatorInput) => state.setSteps
  );

  const allVp = useMemo(() => [minVp, maxVp, ...vpArr], [minVp, maxVp, vpArr]);

  const maxStep = Math.max(...steps);
  const minStep = Math.min(...steps);

  const [dataTb, setdataTb] = useState<string[][]>([]);

  const openVpModal = useVpModal((state: VpModal) => state.openVpModal);

  useEffect(() => {
    const data = generateTypeDataTable(
      steps,
      allVp,
      minVp,
      maxVp,
      minFs,
      maxFs,
      minTs,
      maxTs
    );
    setdataTb(data);
    return () => {};
  }, [vpArr, calcVal, steps, allVp, minVp, maxVp, minFs, maxFs, minTs, maxTs]);

  const onAddLargeStepClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (maxStep == 10) return;
    setSteps([maxStep + 1, ...steps]);
  };

  const onAddSmallStepClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (minStep == -10) return;
    setSteps([...steps, minStep - 1]);
  };

  const removeStep = (flag: number) => {
    const st = [...steps];
    if (flag == 0) {
      st.shift();
    } else {
      st.pop();
    }
    setSteps(st);
  };

  const onAddNewVpClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    openVpModal();
  };

  return (
    <div className="container ctn-padding ">
      <div className="table-outer">
        <table className="table">
          <colgroup>
            {Array(allVp.length + 1)
              .fill(null)
              .map((_, i) => (
                <col key={i} className={`${i == 0 ? 'first-col' : ''}`} />
              ))}
          </colgroup>
          <thead>
            <tr>
              <th>
                Scale
                <br />
                step
              </th>
              <th colSpan={allVp.length}>
                <div className="flex-bw-ct">
                  <div>
                    Viewport
                    <br />
                    width
                  </div>
                  <CirclrButton
                    onClick={onAddNewVpClick}
                    ariaLabel="thêm khung nhìn mới"
                  >
                    <MdAddCircleOutline size={'1.75em'} />
                  </CirclrButton>
                </div>
              </th>
            </tr>
            <tr>
              <th className="item-with-bt">
                <CirclrButton
                  onClick={onAddLargeStepClick}
                  ariaLabel="thêm step mới"
                >
                  <MdAddCircleOutline size={'1.25em'} />
                </CirclrButton>
              </th>
              {allVp.map((vp, i) => (
                <th key={i}>{vp}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataTb.map((row, i) => (
              <tr key={i}>
                {row.map((data, j) => (
                  <td key={j}>
                    {(i == 0 || i == dataTb.length - 1) &&
                    j == 0 &&
                    data[j] !== '0' ? (
                      <div className="flex-end-ct item-with-bt">
                        <CirclrButton
                          onClick={(e) => {
                            e.preventDefault();
                            removeStep(i);
                          }}
                          ariaLabel="xóa step"
                        >
                          <MdRemoveCircleOutline size="1.25em" />
                        </CirclrButton>
                        <div>{data}</div>
                      </div>
                    ) : (
                      <div>{data}</div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="item-with-bt">
                <CirclrButton
                  onClick={onAddSmallStepClick}
                  ariaLabel="thêm step mới"
                >
                  <MdAddCircleOutline size={'1.25em'} />
                </CirclrButton>
              </td>
              <td colSpan={allVp.length}></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default TypeTable;
