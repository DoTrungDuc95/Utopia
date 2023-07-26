import { useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import { EyeDropper, OnChangeEyedrop } from 'react-eyedrop';
import { ColorResult, SketchPicker as SketchPickerProps } from 'react-color';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import { HiEyeDropper } from 'react-icons/hi2';

import {
  getLightnessColorList,
  getSaturationColorList,
  rgbToHSL,
} from '@/utils/color';
import { Color, UseColor, useColor } from '../../store/useColor';

import ColorCssGenerator from '../CSSGenerator/ColorCssGenerator';

const SketchPicker = dynamic<React.ComponentProps<typeof SketchPickerProps>>(
  () => import('react-color').then((module) => module.SketchPicker),
  {
    ssr: false,
  }
);

import styles from '@/styles/GeneratorColor.module.css';

const GeneratorColor = () => {
  const color = useColor((state: UseColor) => state.color);

  const sColorsGen = useMemo(
    () => getSaturationColorList(color.h, color.l, color.a),
    [color]
  );
  const lColorsGen = useMemo(
    () => getLightnessColorList(color.h, color.s, color.a),
    [color]
  );

  const setColor = useColor((state: UseColor) => state.setColor);
  const sColors = useColor((state: UseColor) => state.sColors);
  const lColors = useColor((state: UseColor) => state.lColors);
  const rgb = useColor((state: UseColor) => state.rgb);
  const setRgb = useColor((state: UseColor) => state.setRgb);
  const setSColors = useColor((state: UseColor) => state.setSColors);
  const setLColors = useColor((state: UseColor) => state.setLColors);

  const eyedropOuter = useRef<HTMLDivElement>(null);

  const handleChangeComplete = (color: ColorResult) => {
    const { r, g, b } = color.rgb;
    const { h, s, l } = color.hsl;
    setColor({
      hex: color.hex,
      rgb: `rgba(${r}, ${g}, ${b}, ${color.rgb.a})`,
      h,
      s,
      l,
      a: color.hsl.a || 1,
    });
  };

  useEffect(() => {
    if (rgb === color.rgb) return;
    setSColors(sColorsGen);
    setLColors(lColorsGen);
    setRgb(color.rgb);
  }, [setSColors, sColorsGen, lColorsGen, setLColors, color, rgb, setRgb]);

  const handlerSColorCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.currentTarget.dataset.color;
    if (!color) return;
    if (sColors.includes(color)) {
      setSColors(sColors.filter((c) => c !== color));
    } else {
      setSColors(
        [...sColors, color].sort((a, b) => {
          const v1 = Number(a.split('-')[1]);
          const v2 = Number(b.split('-')[1]);
          return v2 - v1;
        })
      );
    }
  };

  const handlerLColorCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.currentTarget.dataset.color;
    if (!color) return;
    if (lColors.includes(color)) {
      setLColors(lColors.filter((c) => c !== color));
    } else {
      setLColors(
        [...lColors, color].sort((a, b) => {
          const v1 = Number(a.split('-')[1]);
          const v2 = Number(b.split('-')[1]);
          return v2 - v1;
        })
      );
    }
  };

  const handlerEyedropChange = (e: OnChangeEyedrop) => {
    if (!e) return;

    const colors = e.rgb.split(',');
    const r = Number(colors[0].substring(4));
    const g = Number(colors[1].substring(1));
    const b = Number(colors[2].split(')')[0]);

    const [h, s, l] = rgbToHSL(r, g, b);
    setColor({
      h,
      s: s / 100,
      l: l / 100,
      a: 1,
      rgb: `rgba(${r}, ${g}, ${b}, 1)`,
      hex: e.hex,
    });
  };

  return (
    <section className="container ctn-padding sub-section" aria-label="tạo màu">
      <header>
        <h2 className="h4-text text-upper">Tạo màu</h2>
      </header>
      <div className={styles.generate_color_outer}>
        <div className={styles.picker_outer}>
          <SketchPicker
            color={color.rgb}
            onChangeComplete={handleChangeComplete}
          />
          <div className={`next-image-outer`}>
            <div ref={eyedropOuter} className={styles.eye_drop_outer}>
              <EyeDropper
                pickRadius={0}
                customComponent={EyeDropButton}
                cursorActive='url("/images/eyedroper4.png"), auto'
                onChange={handlerEyedropChange}
                onPickStart={() => {
                  eyedropOuter.current?.classList?.add('invisible');
                }}
                onPickEnd={() => {
                  eyedropOuter.current?.classList?.remove('invisible');
                }}
              />
            </div>
            <Image
              fill
              src="/images/eyedrop2.jpg"
              alt="eyedrop flower image"
              sizes="(min-width: 1420px) 576px, (min-width: 820px) 41.55vw, calc(91.2vw - 72px)"
              priority
            />
          </div>
        </div>
        <div>
          <header>
            <h4 className="text-upper">Màu đã chọn - Clr-origin</h4>
          </header>
          <div className={`${styles.color_show_item} flex-start-ct`}>
            <div className={styles.color_show_hex}>
              <div
                className={styles.color_show_color}
                style={{ backgroundColor: color.rgb }}
              ></div>
              <label style={{ textAlign: 'center' }} className="text-upper">
                {color.hex}
              </label>
            </div>
          </div>
        </div>
        <div className={styles.color_show}>
          <div>
            <header>
              <h4 className="text-upper">Thang độ xám</h4>
            </header>
            {sColorsGen.map((s) => {
              return (
                <div
                  key={s}
                  className={`${styles.color_show_item} flex-start-ct`}
                >
                  <div className="flex-start-ct">
                    <input
                      type="checkbox"
                      id={s}
                      className="invisible"
                      checked={sColors.includes(s)}
                      onChange={handlerSColorCheck}
                      data-color={s}
                    />
                    <label
                      style={{ cursor: 'pointer' }}
                      htmlFor={s}
                      className="flex-start-ct"
                    >
                      {sColors.includes(s) ? (
                        <ImCheckboxChecked size={'1.5em'} />
                      ) : (
                        <ImCheckboxUnchecked size={'1.5em'} />
                      )}
                    </label>
                  </div>
                  <div className={`${styles.color_item} flex-start-ct`}>
                    <label>{`s-${s.split('-')[1]}`}</label>
                    <div className={styles.color_show_hex}>
                      <div
                        className={styles.color_show_color}
                        style={{
                          backgroundColor: s.split('-')[0],
                        }}
                      ></div>
                      <label>{s.split('-')[2]}</label>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <header>
              <h4 className="text-upper">Thang độ sáng</h4>
            </header>
            {lColorsGen.map((l) => {
              return (
                <div
                  key={l}
                  className={`${styles.color_show_item} flex-start-ct`}
                >
                  <div className="flex-start-ct">
                    <input
                      type="checkbox"
                      id={l}
                      className="invisible"
                      onChange={handlerLColorCheck}
                      data-color={l}
                      checked={lColors.includes(l)}
                    />
                    <label
                      style={{ cursor: 'pointer' }}
                      htmlFor={l}
                      className="flex-start-ct"
                    >
                      {lColors.includes(l) ? (
                        <ImCheckboxChecked size={'1.5em'} />
                      ) : (
                        <ImCheckboxUnchecked size={'1.5em'} />
                      )}
                    </label>
                  </div>
                  <div className={`${styles.color_item} flex-start-ct`}>
                    <label>{`l-${l.split('-')[1]}`}</label>
                    <div className={styles.color_show_hex}>
                      <div
                        className={styles.color_show_color}
                        style={{
                          backgroundColor: l.split('-')[0],
                        }}
                      ></div>
                      <label>{l.split('-')[2]}</label>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <ColorCssGenerator />
      </div>
    </section>
  );
};

export default GeneratorColor;

type EyeDropButtonProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const EyeDropButton = ({ onClick }: EyeDropButtonProps) => {
  return (
    <button onClick={onClick} className={styles.eye_drop_btn}>
      <HiEyeDropper size="1.5rem" color="#0BEFDB" aria-label="eyedrop button" />
    </button>
  );
};
