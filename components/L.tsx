import Link from 'next/link';
import { IconType } from 'react-icons';
import { useRouter } from 'next/router';

import styles from '@/styles/Header.module.css';

type LProps = {
  href: string;
  to: string;
  icon: IconType;
  iconSize?: string;
};

const L = ({ href, to, icon: Icon, iconSize = '1.5em' }: LProps) => {
  const route = useRouter();
  const currentRoute = route.pathname === href;
  return (
    <div className={`nav-item ${currentRoute ? 'current-nav-item' : ''}`}>
      <div className="icon-nav-item">
        <Icon size={iconSize} />
      </div>
      <Link
        className="not-pointer-events"
        href={href}
        style={{ width: '100%' }}
      >
        {to}
      </Link>
    </div>
  );
};

export default L;
