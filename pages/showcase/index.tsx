import { showcase } from '@/assest-data/showcase';
import Title from '@/components/Title';

import styles from '@/styles/Showcase.module.css';

const Showcase = () => {
  return (
    <section
      className={`main-section`}
      aria-label="Showcase"
      style={{ backgroundColor: '#f1f2f3' }}
    >
      <Title title="Showcase" />
      <p
        className="container ctn-padding"
        style={{ marginTop: 'var(--space-2xl)', fontSize: 'var(--step-1)' }}
      >
        Utopia doesn’t look like anything – it’s a way to organise fluid type
        and space in any style, on any website. If you’d like your project to
        appear here, please email us.{' '}
      </p>
      <div className={`${styles.showcase} container ctn-padding`}>
        {showcase.map((s) => (
          <article
            key={s.id}
            className={styles.showcase_item}
            data-size={s.data_size}
          >
            <div className={styles.showcase_img_outer}>
              <img src={s.img} alt="" loading="lazy" />
            </div>
            <p>
              <span className={styles.showcase_title}>{s.title}</span>
              <span> by </span>
              <span className={styles.showcase_author}>
                {s.author.length === 1 ? s.author[0] : s.author.join(', ')}
              </span>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Showcase;
