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
    <div className="bg-white/80 rounded-2xl shadow-md p-8 w-full flex flex-col space-y-6">
      <div className="likes-items-container w-full py-4 border-t border-b border-[#E4E7EC] divide-y divide-[#E4E7EC]">
        {/* 주문 진행 중인 상품 목록의 데이터 형태에 따라 달라짐 */}
        {likesItemList?.map((likesItem) => (
          <LikesItem key={likesItem.id} likesWineItem={likesItem} />
        ))}
        {likesItemList.length === 0 && (
          <p className="text-center text-gray-400 py-12 font-montserrat">
            좋아요한 상품이 없습니다.
          </p>
        )}
      </div>

      <div className="flex items-center justify-center gap-4 my-8">
        <img
          src={ToFirstPage}
          alt="첫 페이지"
          className="cursor-pointer hover:opacity-70 transition"
        />
        <img
          src={ToPreviousPage}
          alt="이전 페이지"
          className="cursor-pointer hover:opacity-70 transition"
        />
        {[1, 2, 3, 4, 5].map((page) => (
          <span key={page} className="font-montserrat">
            <a
              href=""
              className="px-3 py-1 rounded-lg hover:bg-[#A83E3E] hover:text-white transition"
            >
              {page}
            </a>
          </span>
        ))}
        <img
          src={ToNextPage}
          alt="다음 페이지"
          className="cursor-pointer hover:opacity-70 transition"
        />
        <img
          src={ToLastPage}
          alt="마지막 페이지"
          className="cursor-pointer hover:opacity-70 transition"
        />
      </div>
    </div>
  );
};

export default LikesInfo;
