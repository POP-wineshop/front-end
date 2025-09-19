import { useNavigate } from 'react-router-dom';
import DuckhornMerlot from '@/assets/wineItem/Duckhorn_Napa Valley_Merlot.png';
import { WineData } from '../../model/wineTypes';
import WineTags from './WineTags';
import LikeToggleButton from './LikeToggleButton';
import { useWineLike } from '../../model';
import WineNameInItem from './WineNameInItem';
import WineImageInItem from './WineImageInItem';

const WineListItem = (wineData: WineData) => {
  const navigate = useNavigate();
  const { isLiked, toggleLike } = useWineLike(wineData.id);
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
      <WineImageInItem
        wineData={wineData}
        onClick={() => navigate(`/description/${wineData.id}`)}
      />
      <WineNameInItem korName={wineData.korName} engName={wineData.engName} />
      <WineTags tags={tags} />
      <div className="w-full flex justify-between items-center">
        <LikeToggleButton isLiked={isLiked} onToggle={toggleLike} />
        <div className="w-full flex justify-end items-center text-xl font-bold text-gray-800 my-auto">
          <span>₩{wineData.price.toLocaleString()}</span>
          <span className="text-gray-400 text-base ml-1">/ btl.</span>
        </div>
      </div>
    </div>
  );
};

export default WineListItem;
