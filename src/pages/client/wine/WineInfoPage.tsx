import { useEffect, useState } from 'react';
import { WineData } from '@/entities/client/wine/model/wineTypes';
import { useParams } from 'react-router-dom';
import { useWineInfo } from '@/entities/client/wine/model/useWineInfo';
import WineSummarySection from '@/entities/client/wine/ui/WineInfo/WineSummarySection';
import WineDetailSection from '@/entities/client/wine/ui/WineInfo/WineDetailSection';

const WineInfoPage = () => {
  const { wineInfo } = useWineInfo();
  const { wineId } = useParams();

  useEffect(() => {
    console.time('와인 정보 페이지 렌더링');
    return () => {
      console.timeEnd('와인 정보 페이지 렌더링');
    };
  }, [wineId]);

  return (
    <>
      <div className="wine-description w-full min-w-[900px]">
        {wineInfo && (
          <>
            <WineSummarySection wineInfoData={wineInfo} />
            <WineDetailSection wineInfoData={wineInfo} />
          </>
        )}
      </div>
    </>
  );
};

export default WineInfoPage;
