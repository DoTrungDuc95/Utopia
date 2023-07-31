import { useEffect, useMemo, useRef, useState } from 'react';

import { BsBookmarkCheckFill } from 'react-icons/bs';
import { TiTick } from 'react-icons/ti';

import { useClippath, Clippath } from '@/store/useClippath';
import {
  bg_array,
  color_array,
  shapeType,
  shape_array,
} from '@/assest-data/shapes';
import { createClippath, mapShape } from '@/utils/clippath';

import styles from '@/styles/GeneratorClippath.module.css';

const GeneratorClippath = () => {
  const [showBg, setShowBg] = useState(false);
  const [addPoint, setAddPoint] = useState(false);
  const [bgShow, setBgShow] = useState('/images/bg1.jpg');
  const [size, setSize] = useState({ w: 280, h: 280 });

  const shape = useClippath((state: Clippath) => state.shape);
  const setShape = useClippath((state: Clippath) => state.setShape);

  const handerRef = useRef<any>(null);
  const showHanderRef = useRef<HTMLDivElement>(null);
  const showMain = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);

  const handerId = useRef('');
  const tempCoords = useRef<number[][]>([]);

  const onMouseMoveOnShowHander = (e: MouseEvent) => {
    if (!handerRef.current || !showHanderRef.current || !showMain.current)
      return;

    const hander = handerRef.current;

    const showHander = showHanderRef.current;
    const w = showHander.offsetWidth;
    const h = showHander.offsetHeight;
    const coords = showHander.getBoundingClientRect();

    let x = e.clientX - coords.x;
    let y = e.clientY - coords.y;

    if (x < 0) x = 0;
    if (x > w) x = w;
    if (y < 0) y = 0;
    if (y > h) y = h;

    const left = (x * 100) / w;
    const top = (y * 100) / h;
    let roundLeft = Math.round(left);
    let roundTop = Math.round(top);

    hander.style.left = `${left}%`;
    hander.style.top = `${top}%`;

    if (shape.type === shapeType.ellipse) {
      if (handerId.current === '1') {
        hander.style.top = shape.position[1] + '%';
        roundTop = shape.position[1];
      }
      if (handerId.current === '2') {
        hander.style.left = shape.position[0] + '%';
        roundLeft = shape.position[0];
      }
    }

    if (shape.type === shapeType.inset) {
      const [x, y] = shape.coords[Number(handerId.current) - 1];
      if (handerId.current === '1' || handerId.current === '3') {
        hander.style.left = x + '%';
        roundLeft = x;
      } else if (handerId.current === '2' || handerId.current === '4') {
        hander.style.top = y + '%';
        roundTop = y;
      }
    }

    const index = shape.coords.findIndex(
      (c) => c[2].toString() === handerId.current
    );

    //type = inset
    if (shape.type === shapeType.inset) {
      const hander1 = document.getElementById('hander-1');
      const hander2 = document.getElementById('hander-2');
      const hander3 = document.getElementById('hander-3');
      const hander4 = document.getElementById('hander-4');
      if (!hander1 || !hander2 || !hander3 || !hander4) return;

      switch (index) {
        case 0:
        case 2:
          const y = (hander1.offsetTop + hander3.offsetTop) / 2;
          const top = (y * 100) / h;
          hander2.style.top = top + '%';
          hander4.style.top = top + '%';
          shape.coords[1][1] = Math.round(top);
          shape.coords[3][1] = Math.round(top);
          break;
        case 1:
        case 3:
          const x = (hander2.offsetLeft + hander4.offsetLeft) / 2;
          const left = (x * 100) / w;
          hander1.style.left = left + '%';
          hander3.style.left = left + '%';
          shape.coords[0][0] = Math.round(left);
          shape.coords[2][0] = Math.round(left);
          break;
      }
    }

    shape.coords[index] = [roundLeft, roundTop, Number(handerId.current)];

    //type = circle
    if (shape.type === shapeType.circle && index === 1) {
      shape.position = [roundLeft, roundTop];

      const hander = document.getElementById('hander-1');
      if (!hander) return;

      const radius = shape.radius[0] / Math.sqrt(2);

      let x = left + radius > 100 ? left - radius : left + radius;
      let y = top + radius > 100 ? top - radius : top + radius;

      if (x < 0) x = 0;
      if (x > 100) x = 100;
      if (y < 0) y = 0;
      if (y > 100) y = 100;

      hander.style.left = `${x}%`;
      hander.style.top = `${y}%`;
      shape.coords[0] = [x, y, 1];
    } else if (shape.type === shapeType.circle && index === 0) {
      const [x1, y1] = shape.coords[0];
      const [x2, y2] = shape.coords[1];
      const deltaX = x2 - x1,
        deltaY = y2 - y1;
      const square = Math.pow(deltaX, 2) + Math.pow(deltaY, 2);
      const radius = Number(Math.sqrt(square).toFixed(1));
      shape.radius = [radius];
    }
    //end type = circle

    //type = ellipse
    if (shape.type === shapeType.ellipse && index === 2) {
      shape.position = [roundLeft, roundTop];
      const hander1 = document.getElementById('hander-1');
      const hander2 = document.getElementById('hander-2');
      if (!hander1 || !hander2) return;

      hander1.style.top = `${top}%`;
      hander2.style.left = `${left}%`;

      const [r1, r2] = shape.radius;

      let x = left + r1 > 100 ? left - r1 : left + r1;
      let y = top + r2 > 100 ? top - r2 : top + r2;

      if (x < 0) x = 0;
      if (x > 100) x = 100;
      if (y < 0) y = 0;
      if (y > 100) y = 100;

      hander1.style.left = `${x}%`;
      hander2.style.top = `${y}%`;

      shape.coords[0] = [x, top, 1];
      shape.coords[1] = [left, y, 2];
    } else if (shape.type === shapeType.ellipse && index === 0) {
      const [x1] = shape.coords[0];
      const [x2] = shape.coords[2];
      const deltaX = Math.abs(x2 - x1);
      shape.radius[0] = Number(deltaX.toFixed(1));
    } else if (shape.type === shapeType.ellipse && index === 1) {
      const [x1, y1] = shape.coords[1];
      const [x2, y2] = shape.coords[2];
      const deltaY = Math.abs(y2 - y1);
      shape.radius[1] = Number(deltaY.toFixed(1));
    }
    //end type = ellipse

    const clp = createClippath(shape);
    showMain.current.style.clipPath = clp;

    const span = document.getElementById(`text-${handerId.current}`);
    if (!span) return;
    let text = '';
    if (shape.type === shapeType.polygon) {
      text =
        handerId.current !== '1'
          ? ` ,${roundLeft}% ${roundTop}%`
          : `${roundLeft}% ${roundTop}%`;
    } else if (shape.type === shapeType.circle) {
      text =
        handerId.current === '1'
          ? `${shape.radius}%`
          : `${roundLeft}% ${roundTop}%`;
    } else if (shape.type === shapeType.ellipse) {
      text =
        handerId.current === '3'
          ? `${roundLeft}% ${roundTop}%`
          : handerId.current === '1'
          ? `${shape.radius[0]}% `
          : `${shape.radius[1]}%`;
    } else if (shape.type === shapeType.inset) {
      text =
        handerId.current === '1'
          ? `${roundTop}%`
          : handerId.current === '2'
          ? ` ${100 - roundLeft}% `
          : handerId.current === '3'
          ? ` ${100 - roundTop}% `
          : ` ${roundLeft}% `;
    }

    span.textContent = text;
  };

  const onMouseUpOnShowHander = (e: MouseEvent) => {
    if (!showHanderRef.current || !tempCoords.current) return;
    handerRef.current = null;
    document.onmousemove = null;
    document.onmouseup = null;
    setShape(JSON.parse(JSON.stringify(shape)));
  };

  const onMouseDownOnHander = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!showHanderRef.current) return;
    e.preventDefault();
    e.stopPropagation();

    handerRef.current = e.currentTarget;
    handerId.current = e.currentTarget.dataset.id!;

    document.onmousemove = onMouseMoveOnShowHander;
    document.onmouseup = onMouseUpOnShowHander;
  };

  const handlerSizeChange = (
    e: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    if (!box.current) return;

    let val = Number(e.currentTarget.value);
    if (isNaN(val)) return;

    const name = e.currentTarget.name;
    const w = box.current.offsetWidth - 32;

    if (val < 100) val = 100;
    if (val > w && name === 'w') val = w;
    if (val > 530 && name === 'h') val = 530;

    setSize((p) => ({ ...p, [name]: val }));
    e.currentTarget.value = val.toString();
  };

  const handlerKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!box.current) return;

    if (e.key !== 'Enter') return;

    let val = Number(e.currentTarget.value);
    if (isNaN(val)) return;

    const name = e.currentTarget.name;
    const w = box.current.offsetWidth - 32;

    if (val < 100) val = 100;
    if (val > 530 && name === 'h') val = 530;
    if (val > w && name === 'w') val = w;

    setSize((p) => ({ ...p, [name]: val }));
    e.currentTarget.value = val.toString();
  };

  const handlerAddPoint = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (shape.name !== 'Custom Polygon' || !addPoint) return;
    const X = e.clientX;
    const Y = e.clientY;
    const { x, y, height, width } = e.currentTarget.getBoundingClientRect();
    const left = Math.round(((X - x) * 100) / width);
    const top = Math.round(((Y - y) * 100) / height);
    const coord = [left, top, shape.coords.length + 1];
    shape.coords.push(coord);
    setShape(JSON.parse(JSON.stringify(shape)));
  };

  useEffect(() => {
    if (shape.name === 'Custom Polygon') setAddPoint(true);
    else setAddPoint(false);
  }, [shape.name]);

  return (
    <section className="container sub-section" aria-label="tạo hình dạng">
      <header className="ctn-padding">
        <h2 className="h4-text text-upper">Tạo hình dạng</h2>
      </header>
      <div className={styles.generate_clippath_outer}>
        <div ref={box} className={styles.box}>
          <div
            className={styles.show}
            style={{ width: `${size.w}px`, height: `${size.h}px` }}
          >
            <div className={styles.show_border}>
              {shape.name === 'Custom Polygon' && addPoint && (
                <button
                  className={styles.add_point_btn}
                  aria-label="Hoàn tất"
                  title="Hoàn tất"
                  onClick={() => setAddPoint(false)}
                >
                  <TiTick color="#1BF80A" size={'1.5rem'} />
                </button>
              )}
            </div>
            <div
              className={styles.show_bg}
              style={{
                backgroundImage: `url(${bgShow})`,
                opacity: `${showBg ? 0.3 : 0}`,
              }}
            ></div>
            <div
              ref={showMain}
              className={styles.show_main}
              style={{
                backgroundImage: `url(${bgShow})`,
                clipPath: createClippath(shape),
              }}
            ></div>
            <div
              ref={showHanderRef}
              className={styles.show_hander}
              onClick={handlerAddPoint}
            >
              {shape.coords.length > 0 &&
                shape.coords.map((c) => (
                  <div
                    className={styles.handler}
                    key={c[2]}
                    data-id={c[2]}
                    id={`hander-${c[2]}`}
                    style={{
                      backgroundColor: `${color_array[c[2]] || color_array[0]}`,
                      left: `${c[0]}%`,
                      top: `${c[1]}%`,
                    }}
                    onMouseDown={onMouseDownOnHander}
                  ></div>
                ))}
              {shape.coords.length === 0 && addPoint && (
                <div className={styles.add_point}>
                  Click để thêm các tọa độ trên ảnh
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.text}>
          <p>
            <span>clip-path: {shape.type}(</span>

            {/* type = polygon */}
            {shape.type === shapeType.polygon &&
              shape.coords.map((s, i) => (
                <span
                  key={s[2]}
                  id={`text-${s[2].toString()}`}
                  style={{ color: color_array[s[2]] || '#fff' }}
                >
                  {i ? `, ${s[0]}% ${s[1]}%` : `${s[0]}% ${s[1]}%`}
                </span>
              ))}

            {/* type = circle */}
            {shape.type === shapeType.circle && (
              <span id="text-1" style={{ color: color_array[1] }}>
                {`${shape.radius[0]}%`}
              </span>
            )}
            {shape.type === shapeType.circle && <span>{` at `}</span>}
            {shape.type === shapeType.circle && (
              <span id="text-2" style={{ color: color_array[2] }}>
                {`${shape.position[0]}% ${shape.position[1]}%`}
              </span>
            )}

            {/* type = ellipse */}
            {shape.type === shapeType.ellipse && (
              <span id="text-1" style={{ color: color_array[1] }}>
                {`${shape.radius[0]}% `}
              </span>
            )}
            {shape.type === shapeType.ellipse && (
              <span id="text-2" style={{ color: color_array[2] }}>
                {`${shape.radius[1]}%`}
              </span>
            )}
            {shape.type === shapeType.ellipse && <span>{` at `}</span>}
            {shape.type === shapeType.ellipse && (
              <span id="text-3" style={{ color: color_array[3] }}>
                {`${shape.position[0]}% ${shape.position[1]}%`}
              </span>
            )}

            {/* type = inset */}
            {shape.type === shapeType.inset &&
              shape.coords.map((s, i) => (
                <span
                  key={s[2]}
                  id={`text-${s[2].toString()}`}
                  style={{ color: color_array[s[2]] }}
                >
                  {i === 0
                    ? `${s[1]}`
                    : i === 1
                    ? ` ${100 - s[0]}`
                    : i === 2
                    ? ` ${100 - s[1]}`
                    : ` ${s[0]}`}
                  %
                </span>
              ))}

            <span>);</span>
          </p>
        </div>
        <div className={styles.options}>
          {shape_array.map((s, i) => (
            <div
              title={s.name}
              key={s.id}
              className={styles.shape_items}
              onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                if (shape.name === s.name) return;
                const newShape = mapShape(s);
                setShape(newShape);
              }}
              style={{
                backgroundColor: `${s.name === shape.name ? '#000' : '#fff'}`,
                color: `${s.name !== shape.name ? '#000' : '#fff'}`,
              }}
            >
              <div
                style={{
                  clipPath: createClippath(s),
                  backgroundColor: `${color_array[s.id]}`,
                  width: '1.5rem',
                  height: '1.5rem',
                }}
              ></div>
              <span>
                {s.name.length > 9
                  ? `${s.name.substring(0, 9)}...`
                  : `${s.name}`}
              </span>
            </div>
          ))}
        </div>
        <div className={styles.setting}>
          <div className={styles.size}>
            <label>Kích thước</label>
            <div>
              <input
                type="number"
                id="w"
                name="w"
                onBlur={handlerSizeChange}
                onKeyUp={handlerKeyUp}
                defaultValue={size.w}
              />
              <span>&#215;</span>
              <input
                type="number"
                id="h"
                name="h"
                onBlur={handlerSizeChange}
                onKeyUp={handlerKeyUp}
                defaultValue={size.h}
              />
            </div>
          </div>
          <div className={styles.bg_choosen}>
            <label>Ảnh nền</label>
            <div className={styles.bg_display}>
              {bg_array.map((bg) => (
                <div key={bg}>
                  <div
                    style={{ backgroundImage: `url(${bg})` }}
                    onClick={() => setBgShow(bg)}
                  ></div>
                  {bgShow === bg && (
                    <div>
                      <BsBookmarkCheckFill color="red" size={'1.5rem'} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.show_hidden_bg}>
            <label>Hiện hình dạng bên ngoài</label>
            <button
              onClick={() => setShowBg((p) => !p)}
              style={{
                backgroundColor: `${!showBg ? '#fff' : '#000'}`,
                color: `${showBg ? '#fff' : '#000'}`,
              }}
            >
              {showBg ? 'Ẩn' : 'Hiện'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GeneratorClippath;
