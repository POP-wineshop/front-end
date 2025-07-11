import { useState } from 'react';
import DuckhornMerlot from '@/assets/wineItem/Duckhorn_Napa Valley_Merlot.png';
import { useNavigate } from 'react-router-dom';

type Wine = {
  id: number;
  price: number;
  vintage: number;
  country: string;
  grapeVariety: string;
  region: string;
  alcoholContent: number;
  imageUrl: string;
  tasteProfile: {
    sweetness: number;
    acidity: number;
    body: number;
  };
  wineType: string;
  stock: number;
  korName: string;
  engName: string;
};

type WineItemProps = {
  wineData: Wine; // 여기서 any 대신 Wine 타입 쓰는 게 더 좋아
};

const WineItem = ({ wineData }: WineItemProps) => {
  const navigate = useNavigate();

  const [wineNameEng, setWineNameEng] = useState<string>('');
  const [wineNameKor, setWineNameKor] = useState<string>('');

  return (
    <>
      <div className="wine-item w-full flex flex-col items-center bg-white rounded-lg p-4 h-full">
        <div className="w-full h-full flex items-center justify-center border hover:ring-1 hover:ring-[#6A1B1A] transition duration-200 ease-in-out cursor-pointer">
          <img
            src={DuckhornMerlot}
            alt="와인 이미지"
            className="object-contain w-full h-64"
            onClick={() => {
              navigate(`/description/${wineData.id}`, {
                state: { id: `${wineData.id}` },
              });
            }}
          />
        </div>
        <div className="wine-name w-full text-left mt-4">
          <div
            onClick={() => {
              navigate(`/description/${wineData.id}`, {
                state: { id: `${wineData.id}` },
              });
            }}
            className="inline-block cursor-pointer hover:underline "
          >
            <span className="font-pretendard font-semibold line-clamp-1">
              {wineData.korName}
            </span>
            <span className="italic text-gray-500 line-clamp-1">
              {wineData.engName}
            </span>
          </div>
        </div>
        <div className="w-full text-left text-sm text-gray-600">
          <p className="line-clamp-1">간략한 와인 설명</p>
        </div>
        <div className="w-full mt-2 text-right text-xl font-semibold text-gray-600">
          {/* <p>₩{price}</p> */}
          <p>
            ₩{wineData.price.toLocaleString()}{' '}
            <span className="text-gray-500 text-sm">/ btl.</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default WineItem;
