import { useState } from 'react';
import DuckhornMerlot from '@/assets/wineItem/Duckhorn_Napa Valley_Merlot.png';
import { Heart, HeartPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { WineData } from '@/entities/client/wine/model/wineTypes';
import { addToCart } from '../../../cart/api/cartApi';
import {
  createCartItemData,
  createInstantOrderData,
  getTasteProfileDetails,
  getWineBasicDetails,
  useWineListItem,
} from '../../model';
import { addQuantity, substractQuantity } from '@/utils/common/util';

const WineSummarySection = ({ wineInfoData }: { wineInfoData: WineData }) => {
  const {
    korName,
    engName,
    price,
    vintage,
    country,
    grapeVariety,
    region,
    alcoholContent,
    imageUrl,
    tasteProfile,
    wineType,
    stock,
    id,
  } = wineInfoData;

  const navigate = useNavigate();

  const {
    isLiked,
    toggleLike,
    quantity,
    setQuantity,
    handleAddToCart,
    handleInstantOrder,
  } = useWineListItem(wineInfoData);

  return (
    <div className="wine-description-top flex flex-col justify-center items-center lg:flex-row px-8 py-10 bg-[#f7f4f1]">
      <div className="wine-description-top-left flex justify-start items-center w-[400px] h-[600px]">
        <img
          className="object-contain max-h-full"
          src={DuckhornMerlot}
          alt="와인 상세 이미지"
        />
      </div>
      <div className="wine-description-top-right font-pretendard w-[500px] h-[600px]">
        <div className="wine-description-name mb-6">
          <p
            className="italic text-lg text-gray-500 mb-1 line-clamp-1"
            title={engName}
          >
            {engName}
          </p>
          <p
            className="text-3xl font-bold text-[#111] line-clamp-1"
            title={korName}
          >
            {korName}
          </p>
        </div>
        <table className="text-sm mb-6 w-full">
          <tbody>
            {getWineBasicDetails(wineInfoData).map(({ key, value }) => (
              <tr
                key={key}
                className="border-b border-dashed border-gray-300 h-10"
              >
                <th className="text-left w-40 text-gray-600 font-medium">
                  {key}
                </th>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="wine-description-taste-profile border-t border-b py-4 mb-6">
          {getTasteProfileDetails().map(({ labelEng, labelKor, low, high }) => (
            <div key={labelEng} className="flex items-center my-3">
              <strong className="w-36 text-sm text-gray-700">{labelKor}</strong>
              <span className="w-12 text-xs text-right text-gray-400">
                {low}
              </span>
              <div className="flex gap-4 mx-3">
                {[1, 2, 3, 4, 5].map((n) => (
                  <div
                    key={n}
                    className={`w-5 h-5 p-3 rounded-full flex items-center justify-center ${
                      n ===
                      wineInfoData.tasteProfile[
                        labelEng as keyof typeof wineInfoData.tasteProfile
                      ]
                        ? 'bg-[#6A1B1A] text-white'
                        : 'bg-[#e8e5eb] text-[#c1acbf]'
                    }`}
                  >
                    <li className="list-none">{n}</li>
                  </div>
                ))}
              </div>
              <span className="w-12 text-xs text-gray-400">{high}</span>
            </div>
          ))}
        </div>
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
              ₩ {(price * quantity).toLocaleString()}
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
      </div>
    </div>
  );
};

export default WineSummarySection;
