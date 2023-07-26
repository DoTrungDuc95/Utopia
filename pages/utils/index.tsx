import Title from '@/components/Title';
import GeneratorClippath from '@/components/Utils/GeneratorClippath';
import GeneratorColor from '@/components/Utils/GeneratorColor';
import GeneratorPassword from '@/components/Utils/GeneratorPassword';
import React from 'react';
const Utils = () => {
  return (
    <section className={`main-section`} aria-label="Tính toán khoảng cách">
      <Title title="Một vài công cụ tản mạn" />
      <GeneratorClippath />
      <GeneratorPassword />
      <GeneratorColor />
    </section>
  );
};

export default Utils;
