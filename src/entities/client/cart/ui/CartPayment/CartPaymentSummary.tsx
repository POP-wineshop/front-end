import { useCartCalculations } from '../../model/hooks/useCartCalculations';

// 결제 요약 테이블 컴포넌트
const CartPaymentSummary = () => {
  const { cartPaymentSummary } = useCartCalculations();
  return (
    <table className="w-full border-separate border-spacing-y-3">
      <tbody>
        {cartPaymentSummary.map(({ key, value }) => (
          <tr key={key}>
            <td className="p-0 text-left w-1/2">
              <span className="font-montserrat text-gray-700">{key}</span>
            </td>
            <td className="p-0 text-right w-1/2">
              <span
                className={`font-semibold font-montserrat ${
                  key === '총 상품 금액' || key === '총 결제 예정 금액'
                    ? 'text-[#A83E3E] text-lg'
                    : 'text-gray-700'
                }`}
              >
                {!(key === '총 상품 금액' || key === '총 결제 예정 금액') &&
                  (value > 0 ? '+' : value < 0 ? '-' : '')}{' '}
                {value.toLocaleString()}원
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CartPaymentSummary;
