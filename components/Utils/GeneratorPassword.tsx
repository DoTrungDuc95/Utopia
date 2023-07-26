import { useEffect, useState } from 'react';
import Generator from '../CSSGenerator/CSSGenerator';
import styles from '@/styles/GeneratorPassword.module.css';

const leters = 'abcdefghijklmnopqrstuvwxyz'; //26
const symbols = '~!@#$%^&*()_-+={}[]|<>?:;'; //25
const nums = '0123456789'; //10

const GeneratorPassword = () => {
  const [setting, setSetting] = useState({
    isLower: true,
    isUpper: false,
    isNum: false,
    isSymbol: false,
    isExclude: false,
  });
  const [pw, setPw] = useState('');
  const [pwl, setPwl] = useState(16);
  const [canExclude, setCanExclude] = useState(true);
  const isDisable =
    !setting.isLower && !setting.isUpper && !setting.isNum && !setting.isSymbol;

  const onSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = e.currentTarget;
    setSetting((p) => ({ ...p, [name]: checked }));
  };

  const onPasswordLenghtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.currentTarget.value);
    if (isNaN(value)) return;
    setPwl(Math.round(value));
  };

  const onPasswordLenghtChangeComletete = (
    e: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    let value = Number(e.currentTarget.value);
    if (isNaN(value)) return;
    if (value < 8) value = 8;
    else if (value > 128) value = 128;
    setPwl(Math.round(value));
  };

  const onRangeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.currentTarget.value);
    setPwl(value);
  };

  const generatePassword = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    let pass = '';
    let str = '';
    let length = pwl;
    if (setting.isLower) {
      pass += leters[Math.floor(Math.random() * leters.length)];
      str = str + leters + leters;
      --length;
    }
    if (setting.isUpper) {
      pass += leters[Math.floor(Math.random() * leters.length)].toUpperCase();
      str = str + leters.toUpperCase() + leters.toUpperCase();
      --length;
    }
    if (setting.isNum) {
      pass += nums[Math.floor(Math.random() * nums.length)];
      str = str + nums + nums + nums + nums + nums;
      --length;
    }
    if (setting.isSymbol) {
      pass += symbols[Math.floor(Math.random() * symbols.length)];
      str = str + symbols + symbols;
      --length;
    }
    if (setting.isExclude) {
      const set = new Set(pass.split(''));
      while (set.size !== pwl) {
        set.add(str[Math.floor(Math.random() * str.length)]);
      }
      setPw(Array.from(set).join(''));
    } else {
      for (let i = 0; i < length; i++) {
        pass += str[Math.floor(Math.random() * str.length)];
      }
      setPw(pass);
    }
  };

  useEffect(() => {
    const { isLower, isNum, isSymbol, isUpper } = setting;
    let length = 0;
    if (isLower) {
      length += leters.length;
    }
    if (isUpper) {
      length += leters.length;
    }
    if (isSymbol) {
      length += symbols.length;
    }
    if (isNum) {
      length += nums.length;
    }
    if (pwl > length) {
      setSetting((p) => ({ ...p, isExclude: false }));
    }
    setCanExclude(pwl <= length);
  }, [setting.isUpper, setting.isNum, setting.isSymbol, setting.isLower, pwl]);

  return (
    <section
      className="container ctn-padding sub-section"
      aria-label="tạo mật khẩu"
    >
      <header>
        <h2 className="h4-text text-upper">Tạo mật khẩu</h2>
      </header>
      <div className={styles.generate_password_outer}>
        <button disabled={isDisable} onClick={generatePassword}>
          Tạo mật khẩu
        </button>
        <div className={`${styles.password_length_outer} flex-bw-ct`}>
          <label>Độ dài</label>
          <input
            type="number"
            min={8}
            max={128}
            step={1}
            value={pwl}
            onChange={onPasswordLenghtChange}
            onBlur={onPasswordLenghtChangeComletete}
          />
        </div>
        <div className={`${styles.password_range} flex-bw-ct`}>
          <span>8</span>
          <input
            type="range"
            min={8}
            max={128}
            step={1}
            value={pwl}
            onChange={onRangeInputChange}
          />
          <span>128</span>
        </div>
        <div>
          <label>Thiết lập</label>
          <div className={`${styles.password_setting}`}>
            <div>
              <input
                type="checkbox"
                onChange={onSettingChange}
                id="lowercase"
                name="isLower"
                checked={setting.isLower}
              />
              <label htmlFor="lowercase">Chữ thường (a-z)</label>
            </div>
            <div>
              <input
                type="checkbox"
                onChange={onSettingChange}
                id="uppercase"
                name="isUpper"
                checked={setting.isUpper}
              />
              <label htmlFor="uppercase">Chữ hoa (A-Z)</label>
            </div>
            <div>
              <input
                type="checkbox"
                onChange={onSettingChange}
                id="number"
                name="isNum"
                checked={setting.isNum}
              />
              <label htmlFor="number">Số (0-9)</label>
            </div>
            <div>
              <input
                type="checkbox"
                onChange={onSettingChange}
                id="symbol"
                name="isSymbol"
                checked={setting.isSymbol}
              />
              <label htmlFor="symbol">Ký tự đặc biệt (!-$@#...)</label>
            </div>
            <div>
              <input
                disabled={!canExclude}
                type="checkbox"
                onChange={onSettingChange}
                id="exclude"
                name="isExclude"
                checked={setting.isExclude}
              />
              <label htmlFor="exclude">Loại bỏ trùng lặp</label>
            </div>
          </div>
        </div>
        <div className={`${styles.generate_text}`}>
          <Generator clamp={pw || 'password: '} />
        </div>
      </div>
    </section>
  );
};

export default GeneratorPassword;
