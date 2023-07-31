import styles from '@/styles/C404.module.css';
import Head from 'next/head';
import Link from 'next/link';

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>Utopia - 404</title>
        <meta name="description" content="Not found any things" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.c404}>
        <h1>404</h1>
        <p>Không tìm thấy trang web</p>
        <Link href={'/'}>
          <div className={styles.home_btn}>Trang chủ</div>
        </Link>
      </div>
    </>
  );
};

export default Custom404;
