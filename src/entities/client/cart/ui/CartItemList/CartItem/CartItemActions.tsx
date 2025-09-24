import { handleInstantOrder } from '@/entities/client/order/model/useOrder';
import { useWineLike } from '@/entities/client/wine/model';
import { Heart, HeartPlus } from 'lucide-react';

const CartItemActions = ({
  wineId,
  quantity,
}: {
  wineId: number;
  quantity: number;
}) => {
  const { isLiked, toggleLike } = useWineLike(wineId);

  return (
    <div className="cart-item-buttons flex items-center gap-4">
      {/* 좋아요 버튼 */}
      <button
        className="cart-item-button-like text-black hover:scale-110 transition"
        onClick={toggleLike}
      >
        {isLiked === false ? (
          <HeartPlus className="w-6 h-6 stroke-black fill-transparent" />
        ) : (
          <Heart className="w-6 h-6 stroke-red-500 fill-red-500" />
        )}
      </button>
      {/* 개별 주문하기 버튼 */}
      <button
        onClick={() => handleInstantOrder({ wineId, quantity })}
        className="cart-item-button-order bg-[#A83E3E] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#7a2229] transition font-montserrat text-sm flex items-center"
        title="즉시 개별 주문하기"
      >
        {/* 아이콘 예시: 쇼핑백(장바구니) + 번개(즉시주문) 조합 */}
        {/* 
            이 SVG는 "개별 주문하기" 버튼에 들어가는 아이콘
            아래의 SVG는 쇼핑백(장바구니)과 번개(즉시주문)의 조합을 나타냄
            - 첫 번째 <path>는 쇼핑백의 외곽선
            - 두 번째 <path>는 쇼핑백의 윗부분(입구 라인)
            - 세 번째 <path>는 번개 모양을 그리고, 노란색(#FFD600) 채움
            즉, 이 아이콘은 "장바구니에서 바로 주문" 또는 "즉시 주문"의 의미를 시각적으로 전달
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
      </button>
    </div>
  );
};

export default CartItemActions;
