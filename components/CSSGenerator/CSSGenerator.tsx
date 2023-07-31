import { FaCopy } from 'react-icons/fa';

type CSSGeneratorProps = {
  clamp: string;
};

const copyToClipboard = (str: string) => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

const isMobile = () => {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  return toMatch.some((toMatchItem) => navigator.userAgent.match(toMatchItem));
};

const Generator = ({ clamp }: CSSGeneratorProps) => {
  return (
    <div className="generate-outer">
      <button
        title="copy"
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.stopPropagation();
          if (isMobile()) {
            copyToClipboard(clamp)
          } else navigator.clipboard.writeText(clamp);
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
