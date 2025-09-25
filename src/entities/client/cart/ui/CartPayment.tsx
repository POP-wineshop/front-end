import CartPaymentSummary from './CartPayment/CartPaymentSummary';
import CartPaymentButtons from './CartPayment/CartPaymentButtons';

const CartPayment = () => {
  return (
    <div className="cart-payment-container w-full py-8">
      <div className="bg-white/80 rounded-2xl shadow-md p-8 w-full flex flex-col space-y-6">
        <div className="cart-payment-header">
          <p className="text-2xl font-bold text-[#A83E3E] font-montserrat">
            결제 예정 금액
          </p>
        </div>
        <hr className="border-[#E4E7EC]" />
        <div className="cart-payment-contents">
          <CartPaymentSummary />
        </div>
        <CartPaymentButtons />
      </div>
    </div>
  );
};

export default CartPayment;
