import { useEffect, useState } from 'react';
import { WineData } from '@/entities/client/wine/model/wineTypes';
import { useParams } from 'react-router-dom';
import { fetchWineDetail } from '@/entities/client/wine/api/wineApi';
import WineBasicDetails from '@/entities/client/wine/ui/WineBasicDetails';
import WineDescription from '@/entities/client/wine/ui/WineDescription';

const WineDescriptionPage = () => {
  const [wineData, setWineData] = useState<WineData>();
  const { wineId } = useParams();

  useEffect(() => {
    fetchWineDetail().then((res) => {
      setWineData(res);
    });
  }, [wineId]);

  return (
    <>
      <div className="wine-description w-full min-w-[900px]">
        {wineData && (
          <>
            <WineBasicDetails wineData={wineData} />
            <WineDescription wineData={wineData} />
          </>
        )}
      </div>
    </>
  );
};

export default WineDescriptionPage;
