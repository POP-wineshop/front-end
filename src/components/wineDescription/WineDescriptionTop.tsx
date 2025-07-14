import { useEffect, useState } from 'react';
import DuckhornMerlot from '@/assets/wineItem/Duckhorn_Napa Valley_Merlot.png';
import { Heart, HeartPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

type WineDataProps = { wineData: WineData };

const WineDescriptionTop = ({ wineData }: WineDataProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [itemQuantity, setItemQuantity] = useState<number>(1);

  const {
    korName,
    engName,
    price,
    vintage,
    country,
    grapeVariety,
    region,
    alcoholContent,
    imageUrl,
    tasteProfile,
    // : { sweetness, acidity, body }
    wineType,
    stock,
    id,
  } = wineData;

  const navigate = useNavigate();

  const substractQuantity = () => {
    if (itemQuantity >= 2) {
      return setItemQuantity(itemQuantity - 1);
    } else {
      alert('1 이하로는 수량을 줄일 수 없습니다.');
      return null;
    }
  };

  const addQuantity = () => {
    return setItemQuantity(itemQuantity + 1);
  };

  const instantOrderData = {
    wineId: id,
    quantity: itemQuantity,
  };

  const cartOrderData = {
    wineId: id,
    quantity: itemQuantity,
  };

  const handleInstantOrder = () => {
    fetch(`http://localhost:8080/api/orders/instant`, {
      method: 'POST',
      headers: {
        Authorization: `${localStorage.getItem('Access Token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(instantOrderData),
    })
      .then((res) => res.json())
      .then((jsonRes) => {
        console.log(`주문 생성 성공 : `, jsonRes.data);
        alert(`주문 생성 성공!`);
        navigate(`/order`, {
          state: {
            orderId: jsonRes.data.orderId,
            tossOrderId: jsonRes.data.tossOrderId,
          },
        });
      })
      .catch((error) => {
        console.error(`주문 생성 실패 : `, error);
        alert(`주문 생성 실패 ㅠ : ${error}`);
      });
  };

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
      })
      .catch((err) => {
        console.error(`장바구니 추가 실패 : `, err);
        alert(`장바구니 추가 실패 ㅠ : ${err}`);
      });
  };

  const wineDescriptionDetails = [
    { key: '타입', value: `${wineType}` },
    {
      key: '생산국 / 생산지',
      value: `${country} > ${region}`,
    },
    { key: '와이너리', value: `와이너리` },
    { key: '포도품종', value: `${grapeVariety}` },
  ];

  const tasteProfileDetails = [
    { labelEng: 'sweetness', labelKor: '당도', low: '드라이', high: '스위트' },
    { labelEng: 'acidity', labelKor: '산도', low: '낮음', high: '높음' },
    { labelEng: 'body', labelKor: '바디', low: '가벼움', high: '무거움' },
  ];

  return (
    <div className="wine-description-top flex gap-4 m-8 min-w-[800px] min-h-[500px] justify-evenly items-center">
      <div className="wine-description-top-left">
        <img
          className="object-contain w-auto h-[480px] mx-auto my-auto"
          src={DuckhornMerlot}
          alt="와인 상세 이미지"
        />
      </div>
      <div className="wine-description-top-right font-pretendard w-[500px]">
        <div className="wine-description-name mb-8">
          <p
            className="wine-description-name-eng italic text-lg font-light text-[#666666] mb-1 line-clamp-1"
            title={`${engName}`}
          >
            {engName}
          </p>
          <p
            className="wine-description-name-kor text-3xl font-semibold text-[#111] line-clamp-1"
            title={`${korName}`}
          >
            {korName}
          </p>
        </div>
        <div className="wine-description-details">
          <table className="border-separate border-spacing-y-4">
            <tbody>
              {wineDescriptionDetails.map(({ key, value }) => (
                <tr key={key}>
                  <th className="text-left w-40 p-0">{key}</th>
                  <td className="p-0">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="wine-description-taste-profile border-t border-b">
          {tasteProfileDetails.map(({ labelEng, labelKor, low, high }) => (
            <div key={labelEng} className="flex items-center my-4 pr-4">
              <strong className="w-40">{labelKor}</strong>
              <span className="w-12 text-xs text-right">{low}</span>
              <div className="flex gap-4 mx-3">
                {/* 수평 간격 12px = 3 * 4px */}
                {[1, 2, 3, 4, 5].map((n) => (
                  <div
                    key={n}
                    className={`text-sm w-6 h-6 rounded-full flex items-center justify-center ${
                      // 값과 일치하면 강조, 아니면 기본색
                      // typeof로 객체의 타입을 먼저 추출, 그 다음 keyof로 키들의 유니언 타입('a' | 'b' | 'c' 같이 여러 값 중 하나만 가질 수 있는 타입) 만듦
                      // 순서를 바꾸면 타입스크립트 에러, 항상 keyof typeof 순서로 사용해야 함
                      n ===
                      wineData.tasteProfile[
                        labelEng as keyof typeof wineData.tasteProfile
                      ]
                        ? 'bg-[#6A1B1A] text-white'
                        : 'bg-[#e8e5eb] text-[#c1acbf]'
                    }`}
                  >
                    <li className="list-none">{n}</li>
                  </div>
                ))}
              </div>
              <span className="w-12 text-xs">{high}</span>
            </div>
          ))}
        </div>
        <div className="wine-description-order-addToCart my-4">
          <div className="set-quantity-and-price flex w-full mb-4">
            <div className="quantity-control w-1/2 flex items-center">
              <button className="border w-6" onClick={substractQuantity}>
                -
              </button>
              <span className="w-12 text-center">{itemQuantity}</span>
              <button className="border w-6" onClick={addQuantity}>
                +
              </button>
            </div>
            <div className="total-cost w-1/2 flex gap-2 justify-end items-center text-right italic">
              {itemQuantity !== 1 && (
                <span className="text-sm text-gray-500 whitespace-nowrap">
                  ₩ {price.toLocaleString()}/btl. * {itemQuantity} =
                </span>
              )}{' '}
              <span className="font-semibold text-2xl">TOTAL</span>
              <span className="font-semibold text-2xl">
                ₩{(price * itemQuantity).toLocaleString()}
              </span>
            </div>
          </div>
          <div className="wine-description-buttons flex justify-between items-center gap-2">
            <button
              className="text-black p-2 w-[200px] rounded-xl border flex justify-center items-center"
              onClick={() => setIsLiked(!isLiked)}
              title={`${
                isLiked ? '클릭 시 좋아요 취소' : '클릭 시 좋아요 추가'
              }`}
            >
              {isLiked === false ? (
                <HeartPlus className="w-6 h-6 stroke-black fill-transparent" />
              ) : (
                <Heart className="w-6 h-6 stroke-red-500 fill-red-500 transition-colors " />
              )}
            </button>
            <button
              onClick={handleInstantOrder}
              className="bg-[#e8e5eb] p-2 w-full rounded-xl font-bold"
            >
              주문하기
            </button>
            <button
              onClick={handleAddToCart}
              className="bg-[#e8e5eb] p-2 w-full rounded-xl font-bold"
            >
              장바구니
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WineDescriptionTop;
