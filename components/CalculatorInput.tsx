import React from 'react';
import {
  useCalculatorInput,
  CalculatorInput,
  CalcType,
} from '../store/useCalculatorInput';

type CalculatorInputProps = {
  includeScale: boolean;
};

const CalculatorInput = ({ includeScale = true }) => {
  const calcVal: CalcType = useCalculatorInput(
    (state: CalculatorInput) => state.calcVal
  );
  const setCalcVal = useCalculatorInput(
    (state: CalculatorInput) => state.setCalcVal
  );

  const onInputChange = (
    e: React.FormEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    e.preventDefault();
    const val = Number(e.currentTarget.value);
    const name = e.currentTarget.name;
    if (isNaN(val)) return;

    setCalcVal(name, val);
  };

  return (
    <div className="calc-layout">
      <div className="container calc-inter">
        <div className="calc-item">
          <h4>Khung nhìn nhỏ nhất</h4>
          <div className="form-controll">
            <label htmlFor="minVp">Độ rộng</label>
            <div className="number flex-bw-ct">
              <input
                id="minVp"
                type="number"
                min="0"
                name="minVp"
                value={calcVal.minVp}
                onChange={onInputChange}
              />
              <span>px</span>
            </div>
          </div>
          <div className="form-controll">
            <label htmlFor="minFs">Cỡ chữ</label>
            <div className="number flex-bw-ct">
              <input
                id="minFs"
                type="number"
                min="0"
                name="minFs"
                value={calcVal.minFs}
                onChange={onInputChange}
              />
              <span>px</span>
            </div>
          </div>
          <div className={`form-controll ${!includeScale ? 'disabled' : ''}`}>
            <label htmlFor="minTs">Tỷ lệ co dãn</label>
            <div className="number flex-bw-ct">
              <select
                id="minTs"
                disabled={!includeScale}
                name="minTs"
                value={calcVal.minTs}
                onChange={onInputChange}
              >
                <option>1.067</option>
                <option>1.125</option>
                <option>1.2</option>
                <option>1.25</option>
                <option>1.333</option>
                <option>1.414</option>
                <option>1.5</option>
                <option>1.618</option>
                <option>1.667</option>
                <option>1.778</option>
                <option>1.875</option>
                <option>2</option>
              </select>
            </div>
          </div>
        </div>
        <div className="calc-item">
          <h4>Khung nhìn lớn nhất</h4>
          <div className="form-controll">
            <label htmlFor="maxVp">Độ rộng</label>
            <div className="number flex-bw-ct">
              <input
                id="maxVp"
                type="number"
                min="0"
                name="maxVp"
                value={calcVal.maxVp}
                onChange={onInputChange}
              />
              <span>px</span>
            </div>
          </div>
          <div className="form-controll">
            <label htmlFor="maxFs">Cỡ chữ</label>
            <div className="number flex-bw-ct">
              <input
                id="maxFs"
                type="number"
                min="0"
                name="maxFs"
                value={calcVal.maxFs}
                onChange={onInputChange}
              />
              <span>px</span>
            </div>
          </div>
          <div className={`form-controll ${!includeScale ? 'disabled' : ''}`}>
            <label htmlFor="maxTs">Tỷ lệ co dãn</label>
            <div className="number flex-bw-ct">
              <select
                id="maxTs"
                disabled={!includeScale}
                name="maxTs"
                value={calcVal.maxTs}
                onChange={onInputChange}
              >
                <option>1.067</option>
                <option>1.125</option>
                <option>1.2</option>
                <option>1.25</option>
                <option>1.333</option>
                <option>1.414</option>
                <option>1.5</option>
                <option>1.618</option>
                <option>1.667</option>
                <option>1.778</option>
                <option>1.875</option>
                <option>2</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorInput;
