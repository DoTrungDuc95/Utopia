import { FaCopy } from 'react-icons/fa';

type CSSGeneratorProps = {
  clamp: string;
};

const Generator = ({ clamp }: CSSGeneratorProps) => {
  return (
    
      <div className="generate-outer">
        <button
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            navigator.clipboard.writeText(clamp);
          }}
          aria-label="copy css"
          className="copy-btn"
        >
          <FaCopy color="white" />
        </button>
        <pre className="generate">
          <code>{clamp}</code>
        </pre>
      </div>
    
  );
};

export default Generator;
