import WineItem from '../components/wineList/WineItem';
import Pagination from '@/components/common/Pagination';

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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

const WineListPage = () => {
  // useNavigate() 이용
  const navigate = useNavigate();

  // useLocation() 이용
  const location = useLocation();

  // 페이지네이션 관련 상태
  // const [totalItems, setTotalItems] = useState<number | ''>('');
  // const [totalPages, setTotalPages] = useState<number | ''>('');
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const [finalUrl, setFinalUrl] = useState<string>(
  //   `http://localhost:8080/api/wines/search`
  // );

  // 데이터 수신 및 저장 관련 상태
  const [wineList, setWineList] = useState<Wine[]>([]);

  useEffect(() => {
    // fetch(`http://localhost:8080/api/wines`)
    //   .then((response) => response.json())
    //   .then((jsonResponse) => {
    //     console.log(`GET 요청 (api/wines) 응답: `, jsonResponse.data);
    //     setWineList(jsonResponse.data);
    //   })
    //   .catch((error) => console.error(`/api/wines 실행 오류 발생: `, error));

    const handleShowWines = () => {
      const url = new URL('http://localhost:8080/api/wines/search');
      const params = new URLSearchParams(url.search);
      if (location.state) {
        const { country, region, wineType, keyword } = location.state;

        if (country) params.append('country', country);
        if (region) params.append('region', region);
        if (wineType) params.append('wineType', wineType);
        if (keyword) params.append('keyword', keyword);
      }

      const finalUrl = `${url.origin}${url.pathname}?${params.toString()}`;

      fetch(finalUrl)
        .then((res) => res.json())
        .then((jsonRes) => {
          console.log(`fetch url : ${finalUrl}`);
          console.log(`jsonRes.data : ${jsonRes.data}`);
          // alert(`와인 조회 성공!
          //   url : ${finalUrl}
          //   국가 / 지역 : ${country} > ${region}
          //   종류 : ${wineType}
          //   키워드 : ${keyword}`);
          // // 전역 변수로 와인 목록 컴포넌트에 들어갈 와인 데이터 상태 변경
          setWineList(jsonRes.data);
        })
        .catch((error) =>
          alert(`와인 조회 실패 ㅠ
            국가 / 지역 : ${location.state ? location.state.country : null} > ${
            location.state ? location.state.region : null
          }
            종류 : ${location.state ? location.state.wineType : null}
            키워드 : ${location.state ? location.state.keyword : null}
            에러: ${error}`)
        );
    };

    handleShowWines();
  }, [location.state]);

  return (
    <>
      <div className="flex flex-col items-center ">
        {wineList.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 w-full px-8">
            {wineList.map((wine) => (
              <WineItem key={wine.id} wineData={wine} />
            ))}
          </div>
        ) : (
          <div className="w-full px-8">
            <p>조건에 만족하는 와인이 없습니다!</p>
          </div>
        )}
        <Pagination />
      </div>
    </>
  );
};

export default WineListPage;
