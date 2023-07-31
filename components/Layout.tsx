import { Roboto } from 'next/font/google';
import Header from './Header';
import { useDarkMode, DarkMode } from '../store/useDarkMode';
import VpModal from './VpModal';
import Footer from './Footer';
import { useRouter } from 'next/router';

const roboto = Roboto({
  subsets: ['vietnamese'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const darkMode = useDarkMode((state: DarkMode) => state.darkMode);
  const router = useRouter();
  
  return (
    <div
      className={roboto.className}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {router.pathname !== '/404' && <VpModal />}
      {router.pathname !== '/404' && <Header />}
      <main style={{ flexGrow: '1' }}>{children}</main>
      {router.pathname !== '/404' && <Footer />}
    </div>
  );
};

export default Layout;
