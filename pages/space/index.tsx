import SpaceCSSGenerator from '@/components/CSSGenerator/SpaceCSSGenerator';
import CalculatorInput from '@/components/CalculatorInput';
import CustomPairSpaceTable from '@/components/Tables/CustomPairSpaceTable';
import PairSpaceTable from '@/components/Tables/PairSpaceTable';
import SpaceTable from '@/components/Tables/SpaceTable';
import Title from '@/components/Title';

const Space = () => {
  return (
    <section className={`main-section`} aria-label="Tính toán khoảng cách">
      <Title title="Tính toán sự linh hoạt của khoảng cách" />
      <CalculatorInput includeScale={false}/>
      <div className='desc-type container ctn-padding'>
         <h3>Giá trị mỗi khoảng cách</h3>
         <p>Sử dụng cùng một giá trị được nhập vào giống như khi tính toán cỡ chữ, công cụ này sẽ giúp ta tạo ra các giá trị về khoảng cách linh hoạt nhất. Ta có thể tạo ra nhiều khoảng cách khác nhau bằng việc cung cấp cho mỗi khoảng cách một hệ số nhân, sao cho phù hợp với dự án của bạn. Các giá trị về khoảng cách được biểu thị ở bảng bên dưới đây. Ngoài ra các cặp khoảng cách cũng được giới thiệu giúp ta tiếp cận một cách ấn tượng hơn khi làm việc với khoảng cách tại nhiều kích cỡ màn hình khác nhau.</p>
         <p>Ta cũng có thể sử dụng các giá trị khoảng cách bất kì để bắt cặp với nhau, để giúp kiểm soát tốt hơn khoảng cách trong thiết kế của ta.</p>
         <p>Bất cứ thay đổi nào được tạo ra sẽ tự động giúp ta sinh ra mã nguồn CSS, sẵn sàng dùng cho dự án. Khi đã thỏa mãn cùng với khoảng cách tại sao không thử thao tác với lưới (grid).</p>
      </div>
      <SpaceTable />
      <PairSpaceTable />
      <CustomPairSpaceTable />
      <SpaceCSSGenerator />
    </section>
  );
};

export default Space;
