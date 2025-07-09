import { useEffect, useState } from 'react';
import LikesItem from '../components/likes/LikesItem';
import { useNavigate } from 'react-router-dom';

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

const LikesPage = () => {
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
      <div className="w-[800px]">
        <div className="items-left py-20 w-full">
          <span className="likes-page-title text-[48px] font-bold italic">
            Likes
          </span>
        </div>
        <div className="likes-items-container w-full py-8">
          {/* 주문 진행 중인 상품 목록의 데이터 형태에 따라 달라짐 */}
          {likesItemList?.map((likesItem) => (
            <LikesItem key={likesItem.id} likesWineItem={likesItem} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LikesPage;
