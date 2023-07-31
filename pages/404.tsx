import styles from '@/styles/C404.module.css';
import Link from 'next/link';

const Custom404 = () => {
  return (
    <div className={styles.c404}>
      <h1>404</h1>
      <p>Không tìm thấy trang web</p>
      <Link href={'/'}>
        <div className={styles.home_btn}>Trang chủ</div>
      </Link>
    </div>
  );
};

export default Custom404;
