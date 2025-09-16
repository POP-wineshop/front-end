import { useEffect, useState } from 'react';
import { WineData } from '@/entities/client/wine/model/wineTypes';
import { useParams } from 'react-router-dom';
import { fetchWineDetail } from '@/entities/client/wine/api/wineApi';
import WineSummarySection from '@/entities/client/wine/ui/WineSummarySection';
import WineDetailSection from '@/entities/client/wine/ui/WineDetailSection';

const WineInfoPage = () => {
  const [wineInfoData, setWineInfoData] = useState<WineData>();
  const { wineId } = useParams();

  useEffect(() => {
    fetchWineDetail().then((res) => {
      setWineInfoData(res);
    });
  }, [wineId]);

  return (
    <>
      <div className="wine-description w-full min-w-[900px]">
        {wineInfoData && (
          <>
            <WineSummarySection wineInfoData={wineInfoData} />
            <WineDetailSection wineInfoData={wineInfoData} />
          </>
        )}
      </div>
    </>
  );
};

export default WineInfoPage;
