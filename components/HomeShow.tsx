import { useWindowResize } from '@/hooks/useWindowResize';
import styles from '@/styles/Home.module.css';
import { useEffect, useMemo, useRef, useState } from 'react';

const HomeShow = () => {
  const [windowWidth] = useWindowResize();

  const [space, setSpace] = useState(true);
  const [w, setW] = useState(0.8);
  const [figW, setFigW] = useState(0);

  const [size, setSize] = useState({ min: 0, max: 0 });

  const font = useMemo(() => {
    const fmw = size.min;
    const fmxw = size.max;
    const fs = figW * w;
    const fbp = (fs - fmw) / (fmxw - fmw);

    const f_2min = 8.68;
    const f_2max = 10.42;
    const step_2 = (f_2max - f_2min) * fbp + f_2min;

    const f_1min = 10.42;
    const f_1max = 12.5;
    const step_1 = (f_1max - f_1min) * fbp + f_1min;

    const f0min = 12.5;
    const f0max = 15;
    const step0 = (f0max - f0min) * fbp + f0min;

    const f1min = 15;
    const f1max = 18;
    const step1 = (f1max - f1min) * fbp + f1min;

    const f2min = 18.0;
    const f2max = 21.6;
    const step2 = (f2max - f2min) * fbp + f2min;

    const f4min = 25.92;
    const f4max = 31.1;
    const step4 = (f4max - f4min) * fbp + f4min;

    const f5min = 31.1;
    const f5max = 37.32;
    const step5 = (f5max - f5min) * fbp + f5min;

    return [step_2, step_1, step0, step1, step2, step4, step5];
  }, [figW, size, w]);

  const scaleHeight = useMemo(() => {
    if (windowWidth >= 1280) return 1;
    else {
      const a = windowWidth / 1280;
      return a < 0.4 ? 1 / 0.4 : 1280 / windowWidth;
    }
  }, [windowWidth]);

  useEffect(() => {
    const fig = document.getElementById('fig');
    if (!fig) return;

    setFigW(fig.offsetWidth);
    setSize({ min: fig.offsetWidth * 0.25, max: fig.offsetWidth * 0.8 });
  }, [windowWidth]);

  return (
    <figure id="fig" className={`${styles.show}`}>
      <div
        className={`${styles.demo}`}
        style={
          {
            '--st--2': `${font[0] / 16 / scaleHeight}rem`,
            '--st--1': `${font[1] / 16 / scaleHeight}rem`,
            '--st-0': `${font[2] / 16 / scaleHeight}rem`,
            '--st-1': `${font[3] / 16 / scaleHeight}rem`,
            '--st-2': `${font[4] / 16 / scaleHeight}rem`,
            '--st-4': `${font[5] / 16 / scaleHeight}rem`,
            '--st-5': `${font[6] / 16 / scaleHeight}rem`,
            '--maxW': `${figW * 0.72}px`,
            width: `${figW * w}px`,
            height: `${440 / scaleHeight}px`,
            borderTopLeftRadius: `${
              w >= 0.5 ? 0 : windowWidth > 800 ? '1.5rem' : '.8rem'
            }`,
            borderTopRightRadius: `${
              w >= 0.5 ? 0 : windowWidth > 800 ? '1.5rem' : '.8rem'
            }`,
          } as React.CSSProperties
        }
      >
        <div className={`${styles.content} ${space ? styles.space : ''}`}>
          <div className={`${styles.header} ${space ? styles.space : ''}`}>
            <div className={`${styles.header_content}`}>
              <span>Logo</span>
              <div
                className={`${styles.header_nav} ${space ? styles.space : ''}`}
              >
                <span>Link1</span>
                <span>Link2</span>
                <span>Link3</span>
              </div>
            </div>
          </div>
          <p className={`${styles.title}`}>
            Elegantly scale type and space without breakpoints
          </p>
          <p className={`${styles.p1}`}>
            Instead of tightening our grip by loading up on breakpoints, we can
            let go, embracing the ebb and flow with a more fluid and systematic
            approach to our design foundations
          </p>
          <div
            className={`${styles.grid} ${space ? styles.space : ''}`}
            style={{
              gridTemplateColumns: `${
                w > 0.7 ? 'repeat(3, 1fr)' : w > 0.4 ? 'repeat(2, 1fr)' : '1fr'
              }`,
            }}
          >
            <div
              className={`${styles.grid_item_outer} ${
                space ? styles.space : ''
              }`}
            >
              <div
                className={`${styles.grid_item} ${space ? styles.space : ''}`}
              >
                <label>1</label>
                <p>Define type and space scales for a small screen</p>
              </div>
            </div>

            <div
              className={`${styles.grid_item_outer} ${
                space ? styles.space : ''
              }`}
            >
              <div
                className={`${styles.grid_item} ${space ? styles.space : ''}`}
              >
                <label>2</label>
                <p>Define type and space scales for a large screen</p>
              </div>
            </div>

            <div
              className={`${styles.grid_item_outer} ${
                space ? styles.space : ''
              }`}
            >
              <div
                className={`${styles.grid_item} ${space ? styles.space : ''}`}
              >
                <label>3</label>
                <p>
                  Tell the browser to interpolate between the two scales, based
                  on the current viewport width
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.demo_setting}`}>
        <div>
          <label>@min</label>
          <input
            type="range"
            step={0.01}
            min={0.25}
            max={0.8}
            onChange={(e) => setW(+e.currentTarget.value)}
            value={w}
          />
          <label>@max</label>
        </div>
        <div className="checkbox-outer small">
          <input
            type="checkbox"
            id="sp"
            checked={space}
            onChange={() => setSpace((p) => !p)}
          />
          <label htmlFor="sp" className="not-pointer-events">
            show space
          </label>
        </div>
      </div>
    </figure>
  );
};

export default HomeShow;
