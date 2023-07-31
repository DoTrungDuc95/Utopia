import Title from '@/components/Title';
import GeneratorClippath from '@/components/Utils/GeneratorClippath';
import GeneratorColor from '@/components/Utils/GeneratorColor';
import GeneratorPassword from '@/components/Utils/GeneratorPassword';
import Head from 'next/head';

const Utils = () => {
  return (
    <>
      <Head>
        <title>Utopia - Utils</title>
        <meta name="description" content="Fluid responsive design utils" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={`main-section`} aria-label="Tính toán khoảng cách">
        <Title title="Một vài công cụ tản mạn" />
        <GeneratorClippath />
        <GeneratorPassword />
        <GeneratorColor />
      </section>
    </>
  );
};

export default Utils;
