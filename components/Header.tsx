import { useState } from 'react';
import { IoEarthSharp } from 'react-icons/io5';
import { BsMoon, BsSun } from 'react-icons/bs';
import { GrMenu } from 'react-icons/gr';

import styles from '@/styles/Header.module.css';
import Cookies from 'js-cookie';
import RoundButton from './RoundButton';
import { useDarkMode, DarkMode } from '../store/useDarkMode';

import { navItems } from '../assest-data/nav-data';
import L from './L';

type HeaderProps = {};

const Header = () => {
  const [open, setOpen] = useState(false);
  const setDarkMode = useDarkMode((state: DarkMode) => state.setDarkMode);
  const darkMode = useDarkMode((state: DarkMode) => state.darkMode);

  const toggleDarkMode = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const val = darkMode == 'true' ? 'false' : 'true';
    Cookies.set('utopiaDarkMode', val);
    setDarkMode(val);
  };

  const toggleNav = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setOpen((p) => !p);
  };

  return (
    <div className={`${styles.header}`}>
      <div className="container flex-bw-ct">
        <div className={`${styles.logo} flex-bw-ct `}>
          <IoEarthSharp size={'2.5em'} />
          <p className="not-pointer-events h3-text">UTOPIA</p>
        </div>
        <nav
          className={`${styles.nav} ${
            open ? styles.nav_open : styles.nav_close
          }`}
        >
          {navItems.map((item) => (
            <div key={item.id} onClick={() => setOpen(false)}>
              <L to={item.to} href={item.href} icon={item.icon} />
            </div>
          ))}
        </nav>
        <div className="flex-bw-ct">
          {darkMode == 'true' ? (
            <RoundButton onClick={toggleDarkMode} ariaLabel="toggle dark mode">
              <BsMoon size={'1.5em'} />
            </RoundButton>
          ) : (
            <RoundButton onClick={toggleDarkMode} ariaLabel="toggle dark mode">
              <BsSun size={'1.5em'} />
            </RoundButton>
          )}
          <div className={`${styles.menu_buttom}`}>
            <RoundButton onClick={toggleNav} ariaLabel="nav menu">
              <GrMenu size={'1.5em'} />
            </RoundButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
