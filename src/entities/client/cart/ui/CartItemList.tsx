import { useCartItems } from '../model/hooks/useCartItems';
import { useCartSelection } from '../model/hooks/useCartSelection';
import { useCartQuantity } from '../model/hooks/useCartQuantity';
import CartItem from './CartItemList/CartItem';

const CartItemList = () => {
  const { cartItems } = useCartItems();
  const {
    selectedCartItems,
    isAllCartItemsSelected,
    handleSelectAllCartItems,
    handleSelectCartItem,
  } = useCartSelection();
  const { handleAddQuantity, handleSubtractQuantity } = useCartQuantity();
  const { handleDeleteSelectedCartItems } = useCartItems();

  return (
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
            onAddQuantity={() => handleAddQuantity(item.wineId)}
            onSubtractQuantity={() => handleSubtractQuantity(item.wineId)}
          />
        ))}
      </div>
    </div>
  );
};

export default CartItemList;
