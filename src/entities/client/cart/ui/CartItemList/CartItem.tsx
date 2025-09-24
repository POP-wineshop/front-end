import DuckhornMerlot from '@/assets/wineItem/Duckhorn_Napa Valley_Merlot.png';
import { useNavigate } from 'react-router-dom';
import { CartItemCompProps } from '@/entities/client/cart/model/cartTypes';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/shared/store';
import CartItemCheckbox from './CartItem/CartItemCheckbox';
import CartItemImage from './CartItem/CartItemImage';
import CartItemName from './CartItem/CartItemName';
import CartItemCostInfo from './CartItem/CartItemCostInfo';
import CartItemActions from './CartItem/CartItemActions';
import CartItemQuantityControl from './CartItem/CartItemQuantityControl';

export const CartItem = ({
  cartItem,
  selected,
  onSelect,
  onAddQuantity,
  onSubtractQuantity,
}: CartItemCompProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // props에서 직접 사용할 수 있는 값들
  const { wineId, wineName, quantity, winePrice } = cartItem;

  // 실제로 변경되는 상태들만 관리
  // const [deliveryFee, setDeliveryFee] = useState<number>(0);

  return (
    <div className="bg-white/80 p-6 w-full flex flex-col space-y-4">
      <div className="cart-item flex justify-center items-center w-full h-full">
        {/* 선택 체크박스 */}
        <CartItemCheckbox selected={selected} onSelect={onSelect} />
        {/* 상품 이미지 (TODO: 추후 이미지 데이터 패칭 후 넘겨주는 걸로 바꾸기) */}
        <CartItemImage imageUrl={DuckhornMerlot} wineName={wineName} />
        <div className="cart-item-context h-60 m-3 w-full">
          <div className="flex justify-between items-center h-1/2">
            {/* 카트 아이템 이름 컴포넌트: CartItemName */}
            <CartItemName wineName={wineName} />
            {/* 카트 아이템 좋아요, 바로 구매하기 액션 컴포넌트: CartItemActions */}
            <CartItemActions wineId={wineId} quantity={quantity} />
          </div>
          <div className="flex justify-between items-end h-1/3">
            {/* 수량 조절 컴포넌트 */}
            <CartItemQuantityControl
              wineId={wineId}
              quantity={quantity}
              onAddQuantity={onAddQuantity}
              onSubtractQuantity={onSubtractQuantity}
            />
            {/* 상품 결제 금액, 배송비 컴포넌트 */}
            <CartItemCostInfo quantity={quantity} winePrice={winePrice} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
