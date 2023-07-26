type TitleProps = {
  title: string;
};

const Title = ({title}: TitleProps) => {
  return (
    <header className={`container ctn-padding`}>
      <h1 className={`title text-upper`}>{title}</h1>
    </header>
  );
};

export default Title;
