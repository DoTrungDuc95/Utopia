import CalculatorInput from '@/components/CalculatorInput';
import Title from '@/components/Title';

const Grid = () => {
  return (
    <section className={`main-section`} aria-label="Tính toán khoảng cách">
      <Title title="Tính toán sự linh hoạt của lưới" />
      <CalculatorInput includeScale={false} />
      <div className="desc-type container ctn-padding">
        <p>Tính toán lưới dựa trên các thông số được lấy từ bảng tính khoảng cách nhằm tạo ra khoảng cách giữa các cột của lưới cũng như độ rộng của các cột. Thay vì tạo ra các lưới khác nhau cho mỗi <strong>breakpoints</strong>, ta sẽ chỉ tạo ra một lưới duy nhất đáp ứng một cách linh hoạt cho mọi thiết kế.</p>
      </div>
    </section>
  );
};

export default Grid;
