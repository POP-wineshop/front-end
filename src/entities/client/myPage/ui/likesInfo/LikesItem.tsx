import { BaggageClaim, Bell, BellOff, Heart, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import DuckhornMerlot from '@/assets/wineItem/Duckhorn_Napa Valley_Merlot.png';
import { useNavigate } from 'react-router-dom';

// type LikesWineItem = {
//   wineName: string;
//   wineId: number;
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

type LikesItemProps = {
  likesWineItem: LikesWineItemExample;
};

export const LikesItem = ({ likesWineItem }: LikesItemProps) => {
  const navigate = useNavigate();
  const [wineId, setWineId] = useState<number>(0);
  const [wineNameEng, setWineNameEng] = useState<string>('와인 영어 이름');
  const [wineNameKor, setWineNameKor] = useState<string>('와인 한글 이름');
  const [likesItemPrice, setLikesItemPrice] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(true);

  // 전역변수로 장바구니 내 와인 유무 확인 후 초기값 수정 필요
  const [isInCart, setIsInCart] = useState<boolean>(false);

  // 재입고 알림 와인 설정 API 구현 이후 초기값 수정 필요
  const [isRestockAlarmRegistered, setIsRestockAlarmRegistered] =
    useState<boolean>(false);

  useEffect(() => {
    if (!likesWineItem) return;
    setWineId(likesWineItem.id);
    setWineNameKor(likesWineItem.korName);
    setWineNameEng(likesWineItem.engName);
    setLikesItemPrice(likesWineItem.price);
  }, [likesWineItem]);

  const cartOrderData = {
    wineId: wineId,
    quantity: 1,
  };

  // 좋아요 해제
  const handleCancelLike = () => {
    alert(`해당 와인을 좋아요 목록에서 제외하시겠습니까? : ${wineNameKor}`);
    setIsLiked(false);
    // fetch 좋아요 삭제
    // 좋아요 목록 재렌더링
  };

  // 장바구니 담기
  const handleAddToCart = () => {
    fetch(`http://localhost:8080/api/carts`, {
      method: 'POST',
      headers: {
        Authorization: `${localStorage.getItem('Access Token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartOrderData),
    })
      .then((res) => res.json())
      .then((jsonRes) => {
        // data가 객체이면 배열로 변환
        const dataList = Array.isArray(jsonRes.data)
          ? jsonRes.data
          : [jsonRes.data];

        if (dataList.length === 0) {
          console.warn('빈 주문 응답 수신됨');
          alert('주문 항목이 비어 있음. 다시 시도하세요.');
          return;
        }

        console.log(`장바구니 추가 성공 : `, dataList);
        alert(`장바구니 추가 성공! : ${dataList}`);
        setIsInCart(true);
      })
      .catch((err) => {
        console.error(`장바구니 추가 실패 : `, err);
        alert(`장바구니 추가 실패 ㅠ : ${err}`);
      });
  };

  // 재입고 알림 신청 및 해제
  const handleToggleRestockAlarm = () => {
    if (!isRestockAlarmRegistered) {
      alert(`${wineNameKor} 상품 재입고 알림을 신청하셨습니다.`);
      setIsRestockAlarmRegistered(true);
      // 재입고 알림 신청 리스트에서 제외
    } else {
      alert(`${wineNameKor} 상품 재입고 알림을 해제하셨습니다.`);
      setIsRestockAlarmRegistered(false);
      // 재입고 알림 신청 리스트에 추가
    }
  };

  return (
    <div className="bg-white/80 p-6">
      <div className="likes-item flex justify-center items-center w-full h-full">
        <div
          className="w-[120px] h-40 border border-[#E4E7EC] m-3 flex-shrink-0 cursor-pointer hover:ring-2 hover:ring-[#A83E3E] transition duration-200 ease-in-out rounded-lg"
          onClick={() =>
            navigate(`/description/${wineId}`, {
              state: { id: `${wineId}` },
            })
          }
        >
          <img
            className="likes-item-img object-contain max-w-full max-h-full m-auto"
            src={DuckhornMerlot}
            alt="좋아요 아이템에 담긴 와인 이미지"
          />
        </div>
        <div className="likes-item-context flex flex-col justify-center h-40 m-3 w-full gap-4">
          <div
            onClick={() =>
              navigate(`/description/${wineId}`, {
                state: { id: `${wineId}` },
              })
            }
            className="flex flex-col justify-center cursor-pointer hover:underline"
            title="해당 와인 상세페이지 이동"
          >
            <span className="text-xl font-montserrat font-bold text-[#A83E3E] line-clamp-1">
              {wineNameKor}
            </span>
            <span className="italic text-gray-500 line-clamp-1 font-montserrat">
              {wineNameEng}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xl font-bold text-gray-700 font-montserrat">
                ₩{likesItemPrice.toLocaleString()}{' '}
                <span className="text-gray-500 text-sm">/ btl.</span>
              </p>
            </div>
            <div className="likes-item-buttons flex items-center gap-4">
              <button
                className="likes-item-button-like w-10 h-10 px-2 py-2 rounded-xl font-bold hover:scale-110 transition"
                onClick={handleCancelLike}
                title="현재 좋아요 / 클릭 시 좋아요 취소"
              >
                <Heart className="w-6 h-6 stroke-red-500 fill-red-500" />
              </button>
              {!isInCart ? (
                <button
                  onClick={handleAddToCart}
                  className="likes-item-button-add-to-cart w-10 h-10 bg-[#A83E3E] px-2 py-2 rounded-xl font-bold hover:bg-[#7a2229] hover:scale-110 transition"
                  title="장바구니 담기"
                >
                  <ShoppingCart className="stroke-white" />
                </button>
              ) : (
                <button
                  className="likes-item-button-add-to-cart w-10 h-10 bg-gray-500 px-2 py-2 rounded-xl font-bold"
                  title="이미 장바구니에 담겨져 있습니다"
                >
                  <BaggageClaim className="stroke-white" />
                </button>
              )}
              {!isRestockAlarmRegistered ? (
                <button
                  onClick={handleToggleRestockAlarm}
                  className="likes-item-button-restock-alarm-false w-10 h-10 bg-gray-300 px-2 py-2 rounded-xl font-bold hover:bg-gray-400 hover:scale-110 transition"
                  title="클릭 시 재입고 알림 신청"
                >
                  <BellOff />
                </button>
              ) : (
                <button
                  onClick={handleToggleRestockAlarm}
                  className="likes-item-button-restock-alarm-true w-10 h-10 bg-red-500 px-2 py-2 rounded-xl font-bold hover:scale-110 transition"
                  title="클릭 시 재입고 알림 해제 / 현재 재입고 알림을 받고 있습니다."
                >
                  <Bell className="stroke-white" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikesItem;
