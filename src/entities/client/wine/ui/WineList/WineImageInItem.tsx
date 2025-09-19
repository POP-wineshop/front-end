import DuckhornMerlot from '@/assets/wineItem/Duckhorn_Napa Valley_Merlot.png';
import { WineData } from '../../model/wineTypes';

interface WineImageInItemProps {
  wineData: WineData;
  onClick: () => void;
}

const WineImageInItem = ({ wineData, onClick }: WineImageInItemProps) => (
  <div
    className="w-full flex justify-center cursor-pointer mb-6"
    onClick={onClick}
  >
    <img
      src={DuckhornMerlot}
      alt={`${wineData.korName} 이미지`}
      className="object-contain h-52"
    />
  </div>
);

export default WineImageInItem;
