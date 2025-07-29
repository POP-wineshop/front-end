import { Heart, HeartPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import DuckhornMerlot from '@/assets/wineItem/Duckhorn_Napa Valley_Merlot.png';
import { useNavigate } from 'react-router-dom';
import { substractQuantity } from '@/utils/common/util';
import { CartItemCompProps } from '@/entities/client/cart/model/cartTypes';
import { createInstantOrder } from '@/entities/client/order/api/orderApi';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/shared/store';
import { setOrder } from '@/entities/client/order/model/orderSlice';
import { selectSelectedCartItems } from '@/entities/client/cart/model';

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
  const { cartItemId, wineId, wineName, quantity, winePrice } = cartItem;

  // 실제로 변경되는 상태들만 관리
  const [cartItemQuantity, setCartItemQuantity] = useState<number>(0);
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const instantOrderData = {
    wineId: wineId,
    quantity: quantity,
  };

  // 상품 개별 주문 페이지로 이동
  const handleInstantOrder = async () => {
    try {
      const jsonRes = await createInstantOrder(instantOrderData);
      console.log(`주문 생성 성공 : `, jsonRes.data);

      // 주문 데이터를 Redux store에 저장
      dispatch(setOrder(jsonRes.data));
      console.log('주문 데이터 저장 완료');
      alert(`주문 생성 성공!`);
      navigate(`/order`);
    } catch (error) {
      console.error(`주문 생성 실패 : `, error);
      alert(`주문 생성 실패 ㅠ : ${error}`);
    }
  };

  return (
    <div className="bg-white/80 p-6 w-full flex flex-col space-y-4">
      <div className="cart-item flex justify-center items-center w-full h-full">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onSelect()}
          className="w-4 h-4 accent-[#A83E3E] border-gray-300 rounded focus:ring-[#A83E3E] focus:ring-2"
        />
        <div className="w-[180px] h-60 border border-[#E4E7EC] rounded-lg m-3 flex-shrink-0 bg-gray-50">
          <img
            className="cart-item-img object-contain max-w-full max-h-full m-auto p-2"
            src={DuckhornMerlot}
            alt="장바구니에 담긴 와인 이미지"
          />
        </div>
        <div className="cart-item-context h-60 m-3 w-full">
          <div className="flex justify-between items-center h-1/2">
            <div className="flex flex-col justify-center items-left ">
              <span className="cart-item-name-eng text-lg font-montserrat text-gray-600">
                {wineName}
              </span>
              <span className="cart-item-name-kor text-xl font-bold text-[#A83E3E] font-montserrat">
                {wineName}
              </span>
            </div>
            <div className="cart-item-buttons flex items-center gap-4">
              <button
                className="cart-item-button-like text-black hover:scale-110 transition"
                onClick={() => setIsLiked(!isLiked)}
              >
                {isLiked === false ? (
                  <HeartPlus className="w-6 h-6 stroke-black fill-transparent" />
                ) : (
                  <Heart className="w-6 h-6 stroke-red-500 fill-red-500" />
                )}
              </button>
              <button
                onClick={handleInstantOrder}
                className="cart-item-button-order bg-[#A83E3E] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#7a2229] transition font-montserrat text-sm flex items-center"
                title="즉시 개별 주문하기"
              >
                {/* 아이콘 예시: 쇼핑백(장바구니) + 번개(즉시주문) 조합 */}
                {/* 
                이 SVG는 "개별 주문하기" 버튼에 들어가는 아이콘입니다.
                아래의 SVG는 쇼핑백(장바구니)과 번개(즉시주문)의 조합을 나타냅니다.
                - 첫 번째 <path>는 쇼핑백의 외곽선을 그립니다.
                - 두 번째 <path>는 쇼핑백의 윗부분(입구 라인)을 그립니다.
                - 세 번째 <path>는 번개 모양을 그리고, 노란색(#FFD600)으로 채웁니다.
                즉, 이 아이콘은 "장바구니에서 바로 주문" 또는 "즉시 주문"의 의미를 시각적으로 전달합니다. 
                */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline w-5 h-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 6h18"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 10l-4 6h3l-1 4 4-6h-3l1-4z"
                    fill="#FFD600"
                    stroke="#FFD600"
                    strokeWidth="1"
                  />
                </svg>
                {/* <span className="sr-only">따로 주문하기</span> */}
              </button>
            </div>
          </div>
          <div className="flex justify-between items-end h-1/3">
            <div className="cart-item-quantity-control flex items-center border rounded-md overflow-hidden">
              <button
                className="px-3 py-1 text-lg"
                onClick={() => {
                  onSubtractQuantity(wineId);
                  console.log('수량 빼기 버튼 클릭');
                }}
              >
                -
              </button>
              <span className="w-12 text-center text-sm font-medium">
                {quantity}
              </span>
              <button
                className="px-3 py-1 text-lg"
                onClick={() => {
                  onAddQuantity(wineId);
                  console.log('수량 더하기 버튼 클릭');
                }}
              >
                +
              </button>
            </div>
            <div className="flex flex-col items-end gap-1 ">
              <p className="cart-item-delivery-fee text-sm text-gray-600 font-montserrat">
                기본 배송 : [무료] / 개별배송
              </p>
              <span className="cart-item-cost text-right text-2xl font-bold text-[#A83E3E] font-montserrat">
                ₩{(quantity * winePrice).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
