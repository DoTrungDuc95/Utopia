import Head from 'next/head';
import Link from 'next/link';

import { BsArrowRight } from 'react-icons/bs';
import { AiOutlineArrowRight, AiOutlineYoutube } from 'react-icons/ai';

import { get4Blogs } from '@/utils/calculator';
import { Blog as BlogType } from '@/assest-data/blogs';

import HomeShow from '@/components/HomeShow';
import { useEffect, useState } from 'react';

import blogsStyles from '@/styles/Blog.module.css';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const [blogs, setBlogs] = useState<BlogType[]>();

  useEffect(() => {
    const b = get4Blogs();
    setBlogs(b);
  }, []);
  return (
    <>
      <Head>
        <title>Utopia - Home</title>
        <meta name="description" content="Fluid responsive design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeShow />
      <section className="main-section home">
        <div className={`${styles.effect} container ctn-padding desc-type`}>
          <p>
            {`Utopia nổi lên khi các nhà thiết kế và nhà phát triển chia sẻ cách
            tiếp cận có hệ thống đối với linh hoạt trong thiết kế. Thay vì thiết kế cho số lượng "n" điểm ngắt tùy ý, chúng ta có thể thiết kế một hệ thống trong đó các phần tử chia tỷ lệ một cách hợp lý và linh hoạt. Điều này có thể giúp bạn:`}
          </p>
          <ul className={`desc-type effect-list`} role="list">
            <li className="flex-start-ct">
              <span></span>
              <p>Thiết kế và viết mã tối thiểu và thanh lịch</p>
            </li>
            <li className="flex-start-ct">
              <span></span>
              <p>Kết hợp hài hòa giữa vai trò thiết kế và lập trình</p>
            </li>
            <li className="flex-start-ct">
              <span></span>
              <p>Đảm bảo sự hài hòa và nhất quán về mặt giao diện</p>
            </li>
          </ul>
        </div>
        <div className={`${styles.nav_outer} container ctn-padding desc-type`}>
          <p>
            Utopia không phải là một sản phẩm, plugin hay framework. Nó là một
            từ đáng nhớ/tự phụ mà chúng tôi sử dụng để chỉ cách suy nghĩ về sự
            linh hoạt trong thiết kế . Không có chương trình hoặc phần phụ thuộc
            nào để cài đặt, mặc dù chúng tôi đang phát triển một số công cụ miễn
            phí để hỗ trợ dự án Utopian tiếp theo của bạn:
          </p>
          <div className={`${styles.nav}`}>
            <Link href="/type">
              <div className={`${styles.nav_item}`}>
                <p>Tính toán cỡ chữ</p>
                <div>
                  <AiOutlineArrowRight size="1.5em" color="#fff" />
                </div>
              </div>
            </Link>
            <Link href="/space">
              <div className={`${styles.nav_item}`}>
                <p>Tính khoảng cách</p>
                <div>
                  <AiOutlineArrowRight size="1.5em" color="#fff" />
                </div>
              </div>
            </Link>
            <Link href="/grid">
              <div className={`${styles.nav_item}`}>
                <p>Tính toán lưới</p>
                <div>
                  <AiOutlineArrowRight size="1.5em" color="#fff" />
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div
          className={`${styles.introduction} container ctn-padding desc-type`}
        >
          <h3>Giới thiệu về utopia</h3>
          <p>
            Mặc dù đơn giản về mặt khái niệm, nhưng suy nghĩ theo thuật ngữ
            không tưởng có thể đòi hỏi một chút thay đổi trong tư duy. Chúng tôi
            đã viết một số bài viết về sự thiết kế linh hoạt là gì, cách thức và
            lý do của thiết kế linh hoạt.
          </p>
          <div className={`${styles.link}`}>
            <p>Một video giới thiệu về Utopia</p>
            <a
              href="https://www.youtube.com/watch?v=DDuGtN-GakA"
              target="_blank"
              className="flex-ct-ct"
            >
              Xem trên Youtube
              <span className="flex-ct-ct">
                <AiOutlineYoutube color="#fff" size="1.25em" />
              </span>
            </a>
          </div>
          <div className={`${blogsStyles.blog_outer}`}>
            {blogs &&
              blogs.map((b: BlogType) => (
                <article key={b.id} className={blogsStyles.blog_item}>
                  <div className={`flex-bw-ct`}>
                    <p className={blogsStyles.blog_tag}>{b.tag}</p>
                    <BsArrowRight color="#9D8D6C" size="1.5rem" />
                  </div>
                  <p className={blogsStyles.blog_title}>{b.title}</p>
                  <p className={blogsStyles.blog_author}>
                    by{' '}
                    {b.author.length === 1 ? b.author[0] : b.author.join(' & ')}
                  </p>
                </article>
              ))}
          </div>
        </div>
        <div className={`${styles.why} container ctn-padding desc-type`}>
          <h3>Tại sao lại là Utopia?</h3>
          <p>
            <strong>Utopia</strong> ban đầu là một tên gọi đùa giỡn mô tả về một
            tương lai giả định nơi các nhà thiết kế và các lập trình viên theo
            đuổi cùng một phong cách, dễ dàng tạo ra các sản phẩm đẹp mắt thông
            qua các quyết định có chủ ý được truyền đạt rõ ràng. Nghe có vẻ buồn
            cười vào thời điểm đó. Bây giờ nó chỉ là một mục tiêu căng.
          </p>
        </div>
      </section>
    </>
  );
}
