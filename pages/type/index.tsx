import React from 'react';
import CalculatorInput from '../../components/CalculatorInput';
import Title from '../../components/Title';
import TypeTable from '../../components/Tables/TypeTable';
import TypeCssGenerator from '@/components/CSSGenerator/TypeCssGenerator';

const TypePage = () => {
  return (
    <section className={`main-section`} aria-label="Tính toán cỡ chữ">
      <Title title="Tính toán sự linh hoạt của chữ" />
      <CalculatorInput />
      <div className={`desc-type container ctn-padding `}>
        <h3>Tính toán cỡ chữ</h3>
        <p>
          Bảng dưới đây liệt kê các giá trị cỡ chữ theo tỉ lệ tại hai khung nhìn
          nhỏ nhất và khung nhìn lớn nhất nhập ở trên.
        </p>
        <p>
          Thêm và điều chỉnh các độ rộng khung nhìn khác để hiển thị các giá trị
          cỡ chữ tương ứng
        </p>
        <p>
          Ngoài ra còn có thể thêm các kích cỡ chữ khác tương ứng với mỗi khung
          nhìn
        </p>
      </div>
      <TypeTable />
      <TypeCssGenerator />
    </section>
  );
};

export default TypePage;
