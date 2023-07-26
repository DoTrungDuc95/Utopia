type RoundButtonProps = {
  children?: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  ariaLabel?: string;
};

const CirclrButton = ({ children, onClick, ariaLabel }: RoundButtonProps) => {
  return (
    <button
      className="circle-button"
      aria-label={ariaLabel || 'round button'}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CirclrButton;
