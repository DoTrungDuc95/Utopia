import { BsArrowRight } from 'react-icons/bs';

import Title from '@/components/Title';
import { blogs } from '@/assest-data/blogs';

import styles from '@/styles/Blog.module.css';
import Head from 'next/head';

const Blog = () => {
  return (
    <>
      <Head>
        <title>Utopia - BLogs</title>
        <meta name="description" content="Fluid responsive design blogs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={`main-section`} aria-label="Blog">
        <Title title="Blog" />
        <div className={`${styles.blog_outer} container ctn-padding`}>
          {blogs.map((b) => (
            <article key={b.id} className={styles.blog_item}>
              <div className={`flex-bw-ct`}>
                <p className={styles.blog_tag}>{b.tag}</p>
                <BsArrowRight color="#9D8D6C" size="1.5rem" />
              </div>
              <p className={styles.blog_title}>{b.title}</p>
              <p className={styles.blog_author}>
                by {b.author.length === 1 ? b.author[0] : b.author.join(' & ')}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default Blog;
