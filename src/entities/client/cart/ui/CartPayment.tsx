import { useCart } from '../model/hooks/useCart';

const CartPayment = ({
  onOrderSelected,
  onOrderAll,
  onPatchCartQuantities,
}: {
  onOrderSelected: () => void;
  onOrderAll: () => void;
  onPatchCartQuantities: () => Promise<Response[]>;
}) => {
  const {
    selectedCartItems,
    cartPaymentSummary,
    selectedTotalPaymentPrice,
    allTotalPaymentPrice,
  } = useCart();

  return (
    <div className="bg-white/80 rounded-2xl shadow-md p-8 w-full flex flex-col space-y-6">
      <div className="cart-payment-header">
        <p className="text-2xl font-bold text-[#A83E3E] font-montserrat">
          결제 예정 금액
        </p>
      </div>
      <hr className="border-[#E4E7EC]" />
      <div className="cart-payment-contents">
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
      </div>
      <div className="cart-payment-submit flex flex-col md:flex-row gap-4 w-full">
        <button
          className="bg-[#A83E3E] text-white p-4 w-full md:w-1/2 rounded-lg font-bold hover:bg-[#7a2229] transition font-montserrat text-sm"
          onClick={async () => {
            await onPatchCartQuantities();
            onOrderSelected();
            console.log('selectedCartItems:', selectedCartItems);
          }}
        >
          선택 상품{' '}
          <span className="font-bold">
            {selectedTotalPaymentPrice.toLocaleString()}
          </span>
          원 결제하러 가기
        </button>
        <button
          className="bg-[#A83E3E] text-white p-4 w-full md:w-1/2 rounded-lg font-bold hover:bg-[#7a2229] transition font-montserrat text-sm"
          onClick={async () => {
            await onPatchCartQuantities();
            onOrderAll();
          }}
        >
          전체 상품{' '}
          <span className="font-bold">
            {allTotalPaymentPrice.toLocaleString()}
          </span>
          원 결제하러 가기
        </button>
      </div>
    </div>
  );
};

export default CartPayment;
