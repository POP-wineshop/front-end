import { WineData } from '@/entities/client/wine/model/wineTypes';
import WineImageSection from './WineSummarySection/WineImageSection';
import WineBasicInfoSection from './WineSummarySection/WineBasicInfoSection';
import WineTasteProfileSection from './WineSummarySection/WineTasteProfileSection';
import WineOrderSection from './WineSummarySection/WineOrderSection';

const WineSummarySection = ({ wineInfoData }: { wineInfoData: WineData }) => {
  return (
    <div className="wine-description-top flex flex-col justify-center items-center lg:flex-row px-8 py-10 bg-[#f7f4f1]">
      <WineImageSection />
      {/* TODO: 추후 이미지 URL 패칭 API 구현 시 적용해둘 것 */}
      <div className="wine-description-top-right font-pretendard w-[500px] h-[600px]">
        <WineBasicInfoSection wineInfoData={wineInfoData} />
        <WineTasteProfileSection wineInfoData={wineInfoData} />
        <WineOrderSection wineInfoData={wineInfoData} />
      </div>
    </div>
  );
};

export default WineSummarySection;
