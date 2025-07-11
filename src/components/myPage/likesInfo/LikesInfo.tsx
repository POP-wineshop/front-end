import { useEffect, useState } from 'react';
import LikesItem from '@/components/myPage/likesInfo/LikesItem';
import { useNavigate } from 'react-router-dom';

import ToFirstPage from '@/assets/pagination/WineListPage_Pagination_ToFirstPage.svg';
import ToPreviousPage from '@/assets/pagination/WineListPage_Pagination_ToPreviousPage.svg';
import ToNextPage from '@/assets/pagination/WineListPage_Pagination_ToNextPage.svg';
import ToLastPage from '@/assets/pagination/WineListPage_Pagination_ToLastPage.svg';

// type LikesWineItem = {
//   wineName: string;
//   Id: number;
//   thumbnail: string;
//   winePrice: number;
// };

type LikesWineItemExample = {
  id: number;
  korName: string;
  engName: string;
  grapeVariety: string;
  country: string;
  region: string;
  vintage: number;
  wineType: string;
  price: number;
  stock: number;
  imageUrl: string | null;
  alcoholContent: number;
  tasteProfile: {
    sweetness: number;
    acidity: number;
    body: number;
  };
};

const LikesInfo = () => {
  const navigate = useNavigate();
  const [likesItemList, setLikesItemList] = useState<LikesWineItemExample[]>(
    []
  );

  // UI 확인용 목록 fetch
  useEffect(() => {
    fetch(`http://localhost:8080/api/wines`)
      .then((response) => response.json())
      .then((jsonRes) => {
        const exampleForLikes = jsonRes.data.slice(0, 5);
        console.log(
          `좋아요 페이지 임시 GET 요청 (api/wines) 응답: `,
          exampleForLikes
        );
        setLikesItemList(exampleForLikes);
      })
      .catch((error) => console.error(`/api/wines 실행 오류 발생: `, error));
  }, []);

  useEffect(() => {
    // fetch 좋아요 리스트 GET
    // setLikesItemList(응답값으로 받은 좋아요 리스트)
  }, [likesItemList]);

  return (
    <div className="w-full flex flex-col items-center">
      {/* <div className="items-left py-20 w-full">
          <span className="likes-page-title text-[48px] font-bold italic">
            Likes
          </span>
        </div> */}
      <div className="likes-items-container w-full py-8">
        {/* 주문 진행 중인 상품 목록의 데이터 형태에 따라 달라짐 */}
        {likesItemList?.map((likesItem) => (
          <LikesItem key={likesItem.id} likesWineItem={likesItem} />
        ))}
        <hr />
      </div>
      <div className="flex items-center justify-center gap-4 my-8">
        <img src={ToFirstPage} alt="첫 페이지" />
        <img src={ToPreviousPage} alt="이전 페이지" />
        {[1, 2, 3, 4, 5].map((page) => (
          <span key={page}>
            <a href="">{page}</a>
          </span>
        ))}
        <img src={ToNextPage} alt="다음 페이지" />
        <img src={ToLastPage} alt="마지막 페이지" />
      </div>
    </div>
  );
};

export default LikesInfo;
