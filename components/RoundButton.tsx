type RoundButtonProps = {
  children?: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  ariaLabel?: string;
};

const RoundButton = ({ children, onClick, ariaLabel }: RoundButtonProps) => {
  return (
    <button
      className="round-button"
      aria-label={ariaLabel || 'round button'}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default RoundButton;
