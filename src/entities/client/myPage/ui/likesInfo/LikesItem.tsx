import { BaggageClaim, Bell, BellOff, Heart, ShoppingCart } from 'lucide-react';
import DuckhornMerlot from '@/assets/wineItem/Duckhorn_Napa Valley_Merlot.png';
import { useNavigate } from 'react-router-dom';
import { LikesWineItemExample } from '../../model/likesInfo/likesInfoTypes';
import { useLikesItem } from '../../model/likesInfo/useLikesItem';

type LikesItemProps = {
  likesWineItem: LikesWineItemExample;
};

export const LikesItem = ({ likesWineItem }: LikesItemProps) => {
  const navigate = useNavigate();

  // 커스텀 훅 사용
  const {
    wineId,
    wineNameKor,
    wineNameEng,
    likesItemPrice,
    isLiked,
    inCart,
    restockAlarm,
    handleCancelLike,
    handleAddToCart,
    handleToggleRestockAlarm,
  } = useLikesItem({ initialItem: likesWineItem });

  return (
    <div className="bg-white/80 p-6">
      <div className="likes-item flex justify-center items-center w-full h-full">
        <div
          className="w-[120px] h-40 border border-[#E4E7EC] m-3 flex-shrink-0 cursor-pointer hover:ring-2 hover:ring-[#A83E3E] transition duration-200 ease-in-out rounded-lg"
          onClick={() =>
            navigate(`/description/${wineId}`, {
              state: { id: `${wineId}` },
            })
          }
        >
          <img
            className="likes-item-img object-contain max-w-full max-h-full m-auto"
            src={DuckhornMerlot}
            alt="좋아요 아이템에 담긴 와인 이미지"
          />
        </div>
        <div className="likes-item-context flex flex-col justify-center h-40 m-3 w-full gap-4">
          <div
            onClick={() =>
              navigate(`/description/${wineId}`, {
                state: { id: `${wineId}` },
              })
            }
            className="flex flex-col justify-center cursor-pointer hover:underline"
            title="해당 와인 상세페이지 이동"
          >
            <span className="text-xl font-montserrat font-bold text-[#A83E3E] line-clamp-1">
              {wineNameKor}
            </span>
            <span className="italic text-gray-500 line-clamp-1 font-montserrat">
              {wineNameEng}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xl font-bold text-gray-700 font-montserrat">
                ₩{likesItemPrice.toLocaleString()}{' '}
                <span className="text-gray-500 text-sm">/ btl.</span>
              </p>
            </div>
            <div className="likes-item-buttons flex items-center gap-4">
              <button
                className="likes-item-button-like w-10 h-10 px-2 py-2 rounded-xl font-bold hover:scale-110 transition"
                onClick={handleCancelLike}
                title="현재 좋아요 / 클릭 시 좋아요 취소"
              >
                <Heart className="w-6 h-6 stroke-red-500 fill-red-500" />
              </button>
              {!inCart ? (
                <button
                  onClick={handleAddToCart}
                  className="likes-item-button-add-to-cart w-10 h-10 bg-[#A83E3E] px-2 py-2 rounded-xl font-bold hover:bg-[#7a2229] hover:scale-110 transition"
                  title="장바구니 담기"
                >
                  <ShoppingCart className="stroke-white" />
                </button>
              ) : (
                <button
                  className="likes-item-button-add-to-cart w-10 h-10 bg-gray-500 px-2 py-2 rounded-xl font-bold"
                  title="이미 장바구니에 담겨져 있습니다"
                >
                  <BaggageClaim className="stroke-white" />
                </button>
              )}
              {!restockAlarm ? (
                <button
                  onClick={handleToggleRestockAlarm}
                  className="likes-item-button-restock-alarm-false w-10 h-10 bg-gray-300 px-2 py-2 rounded-xl font-bold hover:bg-gray-400 hover:scale-110 transition"
                  title="클릭 시 재입고 알림 신청"
                >
                  <BellOff />
                </button>
              ) : (
                <button
                  onClick={handleToggleRestockAlarm}
                  className="likes-item-button-restock-alarm-true w-10 h-10 bg-red-500 px-2 py-2 rounded-xl font-bold hover:scale-110 transition"
                  title="클릭 시 재입고 알림 해제 / 현재 재입고 알림을 받고 있습니다."
                >
                  <Bell className="stroke-white" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikesItem;
