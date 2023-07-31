import CalculatorGrid from '@/components/CalculatorGrid';
import CalculatorInput from '@/components/CalculatorInput';
import GridTable from '@/components/Tables/GridTable';
import Title from '@/components/Title';

import {
  CalculatorInput as CalculatorInputType,
  useCalculatorInput,
} from '@/store/useCalculatorInput';
import Head from 'next/head';

const Grid = () => {
  const sizes = useCalculatorInput((state: CalculatorInputType) => state.sizes);

  if (sizes.length <= 1)
    return (
      <div
        style={{
          display: 'grid',
          placeContent: 'center',
          color: '#000',
          paddingTop: '150px',
          paddingInline: '1rem',
          fontSize: 'var(--step-1)',
        }}
      >
        Thêm nhiều hơn các khoảng cách để tính toán lưới
      </div>
    );

  return (
    <>
      <Head>
        <title>Utopia - Grid</title>
        <meta name="description" content="Fluid responsive design grid" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={`main-section`} aria-label="Tính toán khoảng cách">
        <Title title="Tính toán sự linh hoạt của lưới" />
        <CalculatorInput includeScale={false} />
        <div
          className="desc-type container ctn-padding"
          style={{ marginBottom: 'var(--space-3xl)' }}
        >
          <p>
            Tính toán lưới dựa trên các thông số được lấy từ bảng tính khoảng
            cách nhằm tạo ra khoảng cách giữa các cột của lưới cũng như độ rộng
            của các cột. Thay vì tạo ra các lưới khác nhau cho mỗi{' '}
            <strong>breakpoints</strong>, ta sẽ chỉ tạo ra một lưới duy nhất đáp
            ứng một cách linh hoạt cho mọi thiết kế.
          </p>
        </div>
        <CalculatorGrid />
        <GridTable />
      </section>
    </>
  );
};

export default Grid;
