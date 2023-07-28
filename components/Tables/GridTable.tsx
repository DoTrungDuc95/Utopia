import {
  useCalculatorInput,
  CalculatorInput,
} from '@/store/useCalculatorInput';
import { GridInfoType } from '@/types';
import { generateGridTableData } from '@/utils/calculator';
import React, { useEffect, useRef, useState } from 'react';

import { AiFillStar } from 'react-icons/ai';
import { MdMusicNote } from 'react-icons/md';
import { PiWarningBold } from 'react-icons/pi';
import { RiCrossFill, RiAddFill, RiSubtractFill } from 'react-icons/ri';

import GridShowcase from '@/components/GridShowcase';
import GridCssGenerator from '@/components/CSSGenerator/GridCssGenerator';

import { useWindowResize } from '@/hooks/useWindowResize';

const GridTable = () => {
  const [w] = useWindowResize();

  const [minClOpen, setMinClOpen] = useState(false);
  const [minVpOpen, setMinVpOpen] = useState(false);
  const [maxVpOpen, setMaxVpOpen] = useState(false);

  const grid = useCalculatorInput((state: CalculatorInput) => state.grid);
  const sizes = useCalculatorInput((state: CalculatorInput) => state.sizes);
  const { maxFs, minFs, minVp, maxVp } = useCalculatorInput(
    (state: CalculatorInput) => state.calcVal
  );
  const setCalcVal = useCalculatorInput(
    (state: CalculatorInput) => state.setCalcVal
  );

  const [tempMinVP, setTempMinVP] = useState(minVp);
  const [dataTable, setDataTable] = useState<string[][]>([]);
  const [gridInfo, setGridInfo] = useState<GridInfoType>();

  const minColWidthRef = useRef<number | undefined>();

  useEffect(() => {
    const { data, info } = generateGridTableData(
      sizes,
      grid,
      minVp,
      minFs,
      maxFs,
      w
    );
    setDataTable(data);
    setGridInfo(info);

    if (!Number.isInteger(info.minColWidth))
      minColWidthRef.current = info.minColWidth;
  }, [sizes, minFs, grid.minGutterSize]);

  useEffect(() => {
    const { data, info } = generateGridTableData(
      sizes,
      grid,
      tempMinVP,
      minFs,
      maxFs,
      w
    );
    setDataTable(data);
    setGridInfo(info);

    if (!Number.isInteger(info.minColWidth))
      minColWidthRef.current = info.minColWidth;
  }, [
    tempMinVP,
    grid.maxCol,
    grid.maxGutterSize,
    grid.maxWidthSize,
    maxFs,
    minVp,
    w,
  ]);

  const handlerRoundUp = () => {
    const w = Math.ceil(minColWidthRef.current!);
    const vp =
      w * grid.maxCol + (grid.maxCol + 1) * Math.round(gridInfo?.minGutter!);
    console.log(vp);

    setTempMinVP(vp);
  };

  const handlerRoundDown = () => {
    const w = Math.floor(minColWidthRef.current!);
    const vp =
      w * grid.maxCol + (grid.maxCol + 1) * Math.round(gridInfo?.minGutter!);
    setTempMinVP(vp);
  };

  const handlerResetRound = () => {
    setTempMinVP(minVp);
    setMinVpOpen(false);
  };

  const handlerUpdateMinVp = () => {
    minColWidthRef.current = undefined;
    setCalcVal('minVp', tempMinVP);
    setMinClOpen(false);
    setMinVpOpen(false);
  };

  const handlerUpdateMaxVp = () => {
    setCalcVal('maxVp', gridInfo?.maxCtn!);
    setMaxVpOpen(false);
  };

  return (
    <div>
      <div className="container ctn-padding">
        <table className="table grid-table">
          <thead>
            <tr>
              <th>Width</th>
              <th>@min</th>
              <th>@max</th>
              <th>@current</th>
            </tr>
          </thead>
          <tbody>
            {dataTable.map((row, i) => (
              <tr key={i}>
                {row.map((data, j) => {
                  if (i === 0 && j === 1 && gridInfo?.minCtn !== minVp)
                    return (
                      <td key={j}>
                        <div className="grid-dt-with-problem">
                          {data}
                          <span>
                            <RiCrossFill size={'0.6em'} />
                          </span>
                        </div>
                      </td>
                    );

                  if (i === 0 && j === 2 && gridInfo?.maxCtn !== maxVp)
                    return (
                      <td key={j}>
                        <div className="grid-dt-with-problem">
                          {data}
                          <span>
                            <MdMusicNote size={'0.6em'} />
                          </span>
                        </div>
                      </td>
                    );

                  if (
                    i === 2 &&
                    j === 1 &&
                    !Number.isInteger(gridInfo?.minColWidth)
                  )
                    return (
                      <td key={j}>
                        <div className="grid-dt-with-problem">
                          {data}
                          <span>
                            <AiFillStar size={'0.6em'} />
                          </span>
                        </div>
                      </td>
                    );

                  return <td key={j}>{data}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="grid-problem-outer">
          {gridInfo?.minColWidth! <= 0 && (
            <div className="grid-problem-warnning flex-start-ct">
              <PiWarningBold />
              <p>
                Decrease the @min gutter width to avoid a negative column width
              </p>
            </div>
          )}

          {minColWidthRef.current && (
            <div className={`grid-problem ${minClOpen ? 'open' : ''}`}>
              <div className="flex-bw-ct">
                <p
                  className="flex-start-ct"
                  style={{ flexWrap: 'wrap', maxWidth: '75%' }}
                >
                  <span className="flex-start-ct">
                    <AiFillStar />
                  </span>
                  Round <strong>@min</strong> column{' '}
                  <span className="span-btn" onClick={handlerRoundUp}>
                    up
                  </span>{' '}
                  or{' '}
                  <span className="span-btn" onClick={handlerRoundDown}>
                    down
                  </span>{' '}
                  or{' '}
                  <span className="span-btn" onClick={handlerResetRound}>
                    reset
                  </span>
                </p>
                <p
                  className="flex-bw-ct"
                  onClick={() => setMinClOpen((p) => !p)}
                >
                  <span>Why?</span>
                  <span className="flex-start-ct">
                    {minClOpen ? (
                      <RiSubtractFill size={'1.2em'} />
                    ) : (
                      <RiAddFill size={'1.2em'} />
                    )}
                  </span>
                </p>
              </div>
              <div>
                When you design a grid based on a fixed viewport, the sums
                rarely add up to nice neat whole numbers. Design tools usually
                compensate by rounding alternating columns up and down, leaving
                them with whole pixel values but inconsistent widths. If you
                prefer to design on a perfect grid, you can instead choose to
                round the container width up or down using the options above.
                Then you can create artboards in your design tool to match the
                values calculated on this page. This approach aligns with the
                Utopian philosophy of avoiding targeting specific devices.
              </div>
            </div>
          )}

          {gridInfo?.minCtn !== minVp && (
            <div>
              <div className={`grid-problem ${minVpOpen ? 'open' : ''}`}>
                <div className="flex-bw-ct">
                  <p
                    className="flex-start-ct"
                    style={{ flexWrap: 'wrap', maxWidth: '75%' }}
                  >
                    <span className="flex-start-ct">
                      <RiCrossFill />
                    </span>
                    <span className="span-btn" onClick={handlerUpdateMinVp}>
                      Update @min Viewport
                    </span>
                    <span> to {tempMinVP}px</span>
                  </p>
                  <p
                    className="flex-bw-ct"
                    onClick={() => setMinVpOpen((p) => !p)}
                  >
                    <span>Why?</span>
                    <span className="flex-start-ct">
                      {minVpOpen ? (
                        <RiSubtractFill size={'1.2em'} />
                      ) : (
                        <RiAddFill size={'1.2em'} />
                      )}
                    </span>
                  </p>
                </div>
                <div>
                  Your @min viewport is set to <strong>{minVp}px</strong>, but
                  the grid generated with this calculator has a min width of{' '}
                  <strong>{tempMinVP}px</strong>. You may wish to update the
                  @min viewport to match this calculated value, so your
                  typography and space flex from this point. If you leave it as
                  is, your type & space will continue to grow/shrink beneath the
                  capped grid.
                </div>
              </div>
            </div>
          )}

          {gridInfo?.maxCtn !== maxVp && (
            <div>
              <div className={`grid-problem ${maxVpOpen ? 'open' : ''}`}>
                <div className="flex-bw-ct">
                  <p
                    className="flex-start-ct"
                    style={{ flexWrap: 'wrap', maxWidth: '75%' }}
                  >
                    <span className="flex-start-ct">
                      <MdMusicNote />
                    </span>
                    <span className="span-btn" onClick={handlerUpdateMaxVp}>
                      Update @max Viewport
                    </span>
                    <span> to {gridInfo?.maxCtn}px</span>
                  </p>
                  <p
                    className="flex-bw-ct"
                    onClick={() => setMaxVpOpen((p) => !p)}
                  >
                    <span>Why?</span>
                    <span className="flex-start-ct">
                      {maxVpOpen ? (
                        <RiSubtractFill size={'1.2em'} />
                      ) : (
                        <RiAddFill size={'1.2em'} />
                      )}
                    </span>
                  </p>
                </div>
                <div>
                  Your @max viewport is set to <strong>{maxVp}px</strong>, but
                  the grid generated with this calculator has a max width of{' '}
                  <strong>{gridInfo?.maxCtn}px</strong>. You may wish to update
                  your @max viewport to match this calculated value, so your
                  typography and space flex up to this point. If you leave it as
                  is, your type & space will continue to grow/shrink beyond the
                  capped grid.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <GridShowcase w={w} info={gridInfo} tempMinVp={tempMinVP}/>
      <GridCssGenerator mvp={tempMinVP} />
    </div>
  );
};

export default GridTable;
