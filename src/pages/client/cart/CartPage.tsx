import CartItemList from '@/entities/client/cart/ui/CartItemList';
import CartPayment from '@/entities/client/cart/ui/CartPayment';
import { useEffect } from 'react';

const CartPage = () => {
  console.time('CartPage 렌더링');
  useEffect(() => {
    console.timeEnd('CartPage 렌더링');
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-[800px]">
        <div className="items-left py-16 w-full flex flex-col items-start relative">
          <div className="flex items-center gap-4">
            <span className="cart-page-title font-mapodacapo text-[48px] font-bold italic drop-shadow-lg">
              Cart
            </span>
          </div>
        </div>
        <CartItemList />
        <CartPayment />
      </div>
    </div>
  );
};

export default CartPage;
