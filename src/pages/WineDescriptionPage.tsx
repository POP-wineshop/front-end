import { useEffect, useState } from 'react';
import WineFilter from '../components/common/WineFilter';
import WineDescriptionBottom from '../components/wineDescription/WineDescriptionBottom';
import WineDescriptionTop from '../components/wineDescription/WineDescriptionTop';
import OrderModal from '../components/wineDescription/OrderModal';
import { useLocation } from 'react-router-dom';

type WineData = {
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

const WineDescriptionPage = () => {
  // WineListPage 내 WineItem에서 받아온 id값
  const location = useLocation();

  const [wineData, setWineData] = useState<WineData>();
  // const [isModalOn, setIsModalOn] = useState<boolean>(false);

  useEffect(() => {
    fetch(`http://localhost:8080/api/wines/${location.state.id}`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        console.log(
          `GET 요청 (api/wines/${location.state.id}) 응답: `,
          jsonResponse.data
        );
        setWineData(jsonResponse.data);
      })
      .catch((error) => console.error(`/api/wines 실행 오류 발생: `, error));
  }, []);

  return (
    <>
      <div className="wine-description min-w-[900px]">
        {wineData && (
          <>
            <WineDescriptionTop wineData={wineData} />
            <WineDescriptionBottom wineData={wineData} />
          </>
        )}
      </div>
      {/* 개별 주문 시 MODAL */}
      {/* {isModalOn ? <OrderModal /> : ''} */}
    </>
  );
};

export default WineDescriptionPage;
