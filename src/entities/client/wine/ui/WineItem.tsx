import { useNavigate } from 'react-router-dom';
import DuckhornMerlot from '@/assets/wineItem/Duckhorn_Napa Valley_Merlot.png';
import { Heart, HeartPlus } from 'lucide-react';
import { useState } from 'react';
import { WineData } from '../model/wineTypes';

const WineItem = (wineData: WineData) => {
  const navigate = useNavigate();
  // 추후 좋아요 기능 전역상태 관리 구현 후 적용할 것
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const grapeVariety = wineData.grapeVariety.split(',').map((v) => v.trim());

  // 태그: 국가, 종류, 빈티지, 품종 등
  const tags = [
    wineData.country,
    wineData.wineType,
    wineData.vintage + '년',
    ...grapeVariety,
  ];

  return (
    <div className="bg-white/80 rounded-2xl shadow flex flex-col justify-center items-center p-8 min-h-[420px] transition hover:shadow-xl">
      <div
        className="w-full flex justify-center cursor-pointer mb-6"
        onClick={() => navigate(`/description/${wineData.id}`)}
      >
        <img
          src={DuckhornMerlot}
          alt={`${wineData.korName} 이미지`}
          className="object-contain h-52"
        />
      </div>
      <div className="w-full flex flex-col items-center gap-1 mb-4">
        <span
          className={`
            font-pretendard tracking-tight font-extrabold text-gray-900 text-center line-clamp-2
            ${wineData.korName.length > 15 ? 'text-lg' : 'text-xl'}
          `}
          style={{
            fontSize: wineData.korName.length > 15 ? '1.125rem' : undefined,
          }}
        >
          {wineData.korName}
        </span>
        <span
          className={`
            font-montserrat tracking-tight italic text-gray-400 text-center line-clamp-2
            ${wineData.engName.length > 20 ? 'text-sm' : 'text-base'}
          `}
          style={{
            fontSize: wineData.engName.length > 20 ? '0.875rem' : undefined,
          }}
        >
          {wineData.engName}
        </span>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="rounded-full bg-gray-100 text-gray-700 px-3 py-1 text-xs font-semibold"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="w-full flex justify-between items-center">
        <button
          className="p-2"
          onClick={() => setIsLiked(!isLiked)}
          title={`${isLiked ? '클릭 시 좋아요 취소' : '클릭 시 좋아요 추가'}`}
        >
          {isLiked === false ? (
            <HeartPlus className="w-6 h-6 stroke-black fill-transparent" />
          ) : (
            <Heart className="w-6 h-6 stroke-red-500 fill-red-500 transition-colors " />
          )}
        </button>
        <div className="w-full flex justify-end items-center text-xl font-bold text-gray-800 my-auto">
          <span>₩{wineData.price.toLocaleString()}</span>
          <span className="text-gray-400 text-base ml-1">/ btl.</span>
        </div>
      </div>
    </div>
  );
};

export default WineItem;
