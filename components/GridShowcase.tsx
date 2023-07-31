import {
  CalculatorInput,
  useCalculatorInput,
} from '@/store/useCalculatorInput';
import { GridInfoType } from '@/types';
import { generateClampStepForGrid } from '@/utils/calculator';
import { useEffect, useState } from 'react';

type GridShowcaseProps = {
  w: number;
  info: GridInfoType | undefined;
  tempMinVp: number;
};

const GridShowcase = ({ w, info, tempMinVp }: GridShowcaseProps) => {
  const grid = useCalculatorInput((state: CalculatorInput) => state.grid);
  const steps = useCalculatorInput((state: CalculatorInput) => state.steps);
  const { minFs, maxFs, minTs, maxTs } = useCalculatorInput(
    (state: CalculatorInput) => state.calcVal
  );

  const [fs, setFs] = useState<{ step: number; value: string }[]>([]);
  const [showGutter, setShowGutter] = useState(true);
  const [showColumn, setShowColumn] = useState(true);
  const [showLabel, setShowLabel] = useState(true);
  useEffect(() => {
    const fs = generateClampStepForGrid(
      tempMinVp,
      info?.maxCtn!,
      minFs,
      maxFs,
      steps,
      minTs,
      maxTs
    );
    setFs(fs);
  }, [tempMinVp, info?.maxCtn, minFs, maxFs, steps, minTs, maxTs]);

  return (
    <div
      className="live-grid"
      style={
        {
          '--live-gutter': `${info?.currentGutter}px`,
          '--live-columns': `${grid.maxCol}`,
          '--st0': fs[0]?.value || 'var(--step-0)',
          '--st1': fs[1]?.value || 'var(--step-1)',
          '--st2': fs[2]?.value || 'var(--step-2)',
          '--st3': fs[3]?.value || 'var(--step-3)',
          '--st4': fs[4]?.value || 'var(--step-4)',
          '--st5': fs[5]?.value || 'var(--step-5)',
        } as React.CSSProperties
      }
    >
      <label className="flex-ct-ct vp-label" style={{ width: `${w}px` }}>
        <span className="grid-label-arror"></span>
        <output>
          Viewport <strong>{w}</strong>px
        </output>
        <span className="grid-label-arror"></span>
      </label>
      <label
        className="flex-ct-ct vp-label"
        style={{ width: `${info?.curCtn}px` }}
      >
        <span className="grid-label-arror"></span>
        <output>
          Container <strong>{info?.curCtn}</strong>px
        </output>
        <span className="grid-label-arror"></span>
      </label>
      <ul
        role="list"
        style={
          {
            borderLeftColor: `${showGutter ? '#eed9eb' : '#fff'}`,
            borderRightColor: `${showGutter ? '#eed9eb' : '#fff'}`,
            width: `${info?.curCtn}px`,
            backgroundColor: `${showGutter ? '#eed9eb' : '#fff'}`,
          } as React.CSSProperties
        }
      >
        {Array(grid.maxCol!)
          .fill(null)
          .map((_, i) => (
            <li
              key={i}
              style={{
                backgroundColor: `${showColumn ? '#D3F8F0' : '#fff'}`,
                gridArea: `1/${i + 1}/4`,
              }}
            ></li>
          ))}
        <li style={{ gridArea: '1/1/auto/-1', paddingTop: 'var(--space-xl)' }}>
          <p className="show-h1">
            Elegantly scale type and space without breakpoints
            {showLabel && (
              <span className="type-label">step {fs[4]?.step}</span>
            )}
          </p>
        </li>
        <li style={{ gridArea: '2/1/auto/-1' }}>
          <p className="show-h2">
            Thinking of type and space in responsive palettes
            {showLabel && (
              <span className="type-label">step {fs[3]?.step}</span>
            )}
          </p>
          <p className="show-p1">
            Instead of tightening our grip by loading up on breakpoints, we can
            let go, embracing the ebb and flow with a more fluid and systematic
            approach to our design foundations.
            {showLabel && (
              <span className="type-label">step {fs[1]?.step}</span>
            )}
          </p>
          <p className="show-p0">
            Design and develop rapidly using a handful of related rules,
            building the system, not every permutation of its contents at
            arbitrary breakpoints. Streamline communication and collaboration
            between design and development.
            {showLabel && (
              <span className="type-label">step {fs[0]?.step}</span>
            )}
          </p>
          <p className="show-p0">
            Visualise the invisible: componentize responsive space, codifying
            its implementation and behavior. Create bespoke constraints for your
            projects to ensure consistent and harmonious designs. Swap jarring
            breakpoint jumps for buttery-smooth interpolation, with
            programmatically tailored type and space scales for every screen
            size.
            {showLabel && (
              <span className="type-label">step {fs[0]?.step}</span>
            )}
          </p>
        </li>
        <li style={{ gridArea: '3/1/auto/-1' }}>
          <p className="show-h3">
            Designing with fluid typography
            {showLabel && (
              <span className="type-label">step {fs[2]?.step}</span>
            )}
          </p>
          <p className="show-p0">
            We’ll typically start a project by defining a suitable body copy
            font and size at nominated min and max viewport widths.
            {showLabel && (
              <span className="type-label">step {fs[0]?.step}</span>
            )}
          </p>
        </li>
      </ul>
      <label
        className="flex-ct-ct vp-label"
        style={{ width: `${info?.curCtn! - info?.currentGutter! * 2}px` }}
      >
        <span className="grid-label-arror"></span>
        <output>
          Grid interior{' '}
          <strong>{info?.curCtn! - info?.currentGutter! * 2}</strong>px
        </output>
        <span className="grid-label-arror"></span>
      </label>
      <div className="show-options-outer">
        <label>show:</label>
        <div className="show-options">
          <div className="flex-start-ct checkbox-outer small">
            <input
              type="checkbox"
              id="gutter"
              checked={showGutter}
              onChange={() => setShowGutter((p) => !p)}
            />
            <label className="not-pointer-events" htmlFor="gutter">
              gutters
            </label>
          </div>
          <div className="flex-start-ct checkbox-outer small">
            <input
              type="checkbox"
              id="column"
              checked={showColumn}
              onChange={() => setShowColumn((p) => !p)}
            />
            <label className="not-pointer-events" htmlFor="column">
              columns
            </label>
          </div>
          <div className="flex-start-ct checkbox-outer small">
            <input
              type="checkbox"
              id="typelb"
              checked={showLabel}
              onChange={() => setShowLabel((p) => !p)}
            />
            <label className="not-pointer-events" htmlFor="typelb">
              type labels
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridShowcase;
