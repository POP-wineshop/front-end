import CartItem from '@/entities/client/cart/ui/CartItem';
import CartPayment from '@/entities/client/cart/ui/CartPayment';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/entities/client/cart/model/hooks/useCart';

const CartPage = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    selectedCartItems,
    isAllCartItemsSelected,
    handleSelectAllCartItems,
    handleSelectCartItem,
    handleAddQuantity,
    handleSubtractQuantity,
    handlePatchCartQuantities,
    handleDeleteSelectedCartItems,
    handleOrderSelectedCartItems,
    handleOrderAllCartItems,
  } = useCart();

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
        <div className="cart-items-container w-full">
          <div className="bg-white/80 flex items-center gap-6 px-6   py-4">
            <input
              type="checkbox"
              checked={isAllCartItemsSelected}
              onChange={handleSelectAllCartItems}
              className="w-5 h-5 accent-[#A83E3E] border-gray-300 rounded focus:ring-[#A83E3E] focus:ring-2"
            />
            <span
              className="text-sm font-semibold text-[#A83E3E] hover:underline cursor-pointer transition"
              onClick={handleSelectAllCartItems}
            >
              전체 선택
            </span>
            <span
              onClick={handleDeleteSelectedCartItems}
              className="text-sm font-semibold text-gray-500 hover:text-[#A83E3E] hover:underline cursor-pointer transition"
            >
              선택 삭제
            </span>
          </div>
          {/* 주문 진행 중인 상품 목록의 데이터 형태에 따라 달라짐 */}
          <div className="cart-items-container border-t border-b border-[#E4E7EC] divide-y divide-[#E4E7EC]">
            {cartItems?.map((item) => (
              <CartItem
                key={item.wineId}
                cartItem={item}
                selected={selectedCartItems.some(
                  (selectedItem) => selectedItem.wineId === item.wineId
                )}
                onSelect={() => handleSelectCartItem(item.wineId)}
                onAddQuantity={handleAddQuantity}
                onSubtractQuantity={handleSubtractQuantity}
              />
            ))}
          </div>
        </div>
        <div className="cart-payment-container w-full py-8">
          <CartPayment
            onOrderSelected={handleOrderSelectedCartItems}
            onOrderAll={handleOrderAllCartItems}
            onPatchCartQuantities={handlePatchCartQuantities}
          />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
