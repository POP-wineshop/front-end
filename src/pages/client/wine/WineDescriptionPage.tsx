import { useEffect, useState } from 'react';
import { WineData } from '@/entities/client/wine/model/wineTypes';
import { useParams } from 'react-router-dom';
import getWineDetail from '@/entities/client/wine/api/getWineDetail';
import WineDescriptionTop from '@/entities/client/wine/ui/WineDescriptionTop';
import WineDescriptionBottom from '@/entities/client/wine/ui/WineDescriptionBottom';

const WineDescriptionPage = () => {
  const [wineData, setWineData] = useState<WineData>();
  const { wineId } = useParams();

  useEffect(() => {
    getWineDetail().then((res) => {
      setWineData(res);
    });
  }, [wineId]);

  return (
    <>
      <div className="wine-description w-full min-w-[900px]">
        {wineData && (
          <>
            <WineDescriptionTop wineData={wineData} />
            <WineDescriptionBottom wineData={wineData} />
          </>
        )}
      </div>
    </>
  );
};

export default WineDescriptionPage;
