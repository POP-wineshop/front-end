import { addQuantity, substractQuantity } from '@/utils/common/util';
import {
  useWineLike,
  useWineOrder,
  useWineQuantity,
  WineData,
} from '../../../model';
import { Heart, HeartPlus } from 'lucide-react';

const WineOrderSection = ({ wineInfoData }: { wineInfoData: WineData }) => {
  const { isLiked, toggleLike } = useWineLike(wineInfoData.id);
  const { quantity, setQuantity } = useWineQuantity();
  const { handleAddToCart, handleInstantOrder } = useWineOrder(
    wineInfoData,
    quantity
  );

  return (
    <div className="wine-description-order-addToCart bg-white p-4 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center border rounded-md overflow-hidden">
          <button
            className="px-3 py-1 text-lg"
            onClick={() => substractQuantity(quantity, setQuantity)}
          >
            -
          </button>
          <span className="w-12 text-center text-sm font-medium">
            {quantity}
          </span>
          <button
            className="px-3 py-1 text-lg"
            onClick={() => addQuantity(quantity, setQuantity)}
          >
            +
          </button>
        </div>
        <div className="text-right text-xl font-bold">
          ₩ {(wineInfoData.price * quantity).toLocaleString()}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          className="p-2 w-12 rounded-xl border border-gray-300 flex justify-center items-center"
          onClick={toggleLike}
          title={isLiked ? '좋아요 취소' : '좋아요 추가'}
        >
          {isLiked ? (
            <Heart className="w-6 h-6 stroke-red-500 fill-red-500 transition-colors" />
          ) : (
            <HeartPlus className="w-6 h-6 stroke-black fill-transparent" />
          )}
        </button>
        <button
          onClick={handleInstantOrder}
          className="bg-[#6A1B1A] hover:bg-[#8b2e2e] text-white p-2 w-full rounded-xl font-semibold"
        >
          주문하기
        </button>
        <button
          onClick={handleAddToCart}
          className="bg-[#e8e5eb] hover:bg-[#d6d1d1] text-black p-2 w-full rounded-xl font-semibold"
        >
          장바구니
        </button>
      </div>
    </div>
  );
};

export default WineOrderSection;
