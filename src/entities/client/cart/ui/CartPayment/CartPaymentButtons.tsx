import { useCartOrder } from '../../model/hooks/useCartOrder';
import { useCartQuantity } from '../../model/hooks/useCartQuantity';
import { useCartSelection } from '../../model/hooks/useCartSelection';
import { useCartCalculations } from '../../model/hooks/useCartCalculations';

// 결제 버튼 컴포넌트
const CartPaymentButtons = () => {
  const { handleOrderSelectedCartItems, handleOrderAllCartItems } =
    useCartOrder();
  const { handlePatchCartQuantities } = useCartQuantity();
  const { selectedCartItems } = useCartSelection();
  const { selectedTotalPaymentPrice, allTotalPaymentPrice } =
    useCartCalculations();

  return (
    <div className="cart-payment-submit flex flex-col md:flex-row gap-4 w-full">
      <button
        className="bg-[#A83E3E] text-white p-4 w-full md:w-1/2 rounded-lg font-bold hover:bg-[#7a2229] transition font-montserrat text-sm"
        onClick={async () => {
          await handlePatchCartQuantities();
          handleOrderSelectedCartItems();
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
          await handlePatchCartQuantities();
          handleOrderAllCartItems();
        }}
      >
        전체 상품{' '}
        <span className="font-bold">
          {allTotalPaymentPrice.toLocaleString()}
        </span>
        원 결제하러 가기
      </button>
    </div>
  );
};

export default CartPaymentButtons;
