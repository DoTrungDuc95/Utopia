import { Roboto } from 'next/font/google';
import Header from './Header';
import { useDarkMode, DarkMode } from '../store/useDarkMode';
import VpModal from './VpModal';
import Footer from './Footer';

const roboto = Roboto({
  subsets: ['vietnamese'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const darkMode = useDarkMode((state: DarkMode) => state.darkMode);
  return (
    <div
      className={roboto.className}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <VpModal />
      <Header />
      <main style={{ flexGrow: '1' }}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
