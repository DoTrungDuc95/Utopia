type PairSpaceTdProps = {
  pair: string;
  mxW1: number;
  mxW2: number;
};

const PairSpaceTd = ({ pair, mxW1, mxW2 }: PairSpaceTdProps) => {
  const [val1, val2] = pair.split('-');
  let v1ToV2 = +val1 / +val2;
  let v2ToV1 = +val2 / +val1;
  v1ToV2 = v1ToV2 > 1 ? 100 : v1ToV2 * 100;
  v2ToV1 = v2ToV1 > 1 ? 100 : v2ToV1 * 100;

  const style = {
    gridTemplateColumns: `${mxW1}px 15vw ${mxW2}px`,
  };

  return (
    <div className="pair-space-data-grid" style={style}>
      <div className="square-outer">
        <output>{val1}px</output>
        <div
          className="square"
          style={{ width: `${val1}px`, aspectRatio: 1 }}
        ></div>
      </div>
      <span></span>
      <div className="square-outer">
        <output>{val2}px</output>
        <div
          className="square"
          style={{ width: `${val2}px`, aspectRatio: 1 }}
        ></div>
      </div>
      <div
        className="pair-shadow"
        style={{
          clipPath: `polygon(0 0, 100% 0%, 100% ${v2ToV1}%, 0 ${v1ToV2}%`,
        }}
      ></div>
    </div>
  );
};

export default PairSpaceTd;

{
  /* <div className="pair-square" style={style}>


<span></span>
</div> */
}
