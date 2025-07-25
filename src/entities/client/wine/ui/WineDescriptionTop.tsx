import { useEffect, useState } from 'react';
import DuckhornMerlot from '@/assets/wineItem/Duckhorn_Napa Valley_Merlot.png';
import { Heart, HeartPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { WineData } from '../model/wineTypes';

const WineDescriptionTop = (wineData: WineData) => {
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
    : { sweetness, acidity, body }
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
    <div className="wine-description-top flex flex-col justify-center items-center lg:flex-row px-8 py-10 bg-[#f7f4f1]">
      <div className="wine-description-top-left flex justify-start items-center w-[400px] h-[600px]">
        <img
          className="object-contain max-h-full"
          src={DuckhornMerlot}
          alt="와인 상세 이미지"
        />
      </div>
      <div className="wine-description-top-right font-pretendard w-[500px] h-[600px]">
        <div className="wine-description-name mb-6">
          <p
            className="italic text-lg text-gray-500 mb-1 line-clamp-1"
            title={engName}
          >
            {engName}
          </p>
          <p
            className="text-3xl font-bold text-[#111] line-clamp-1"
            title={korName}
          >
            {korName}
          </p>
        </div>
        <table className="text-sm mb-6 w-full">
          <tbody>
            {wineDescriptionDetails.map(({ key, value }) => (
              <tr
                key={key}
                className="border-b border-dashed border-gray-300 h-10"
              >
                <th className="text-left w-40 text-gray-600 font-medium">
                  {key}
                </th>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="wine-description-taste-profile border-t border-b py-4 mb-6">
          {tasteProfileDetails.map(({ labelEng, labelKor, low, high }) => (
            <div key={labelEng} className="flex items-center my-3">
              <strong className="w-36 text-sm text-gray-700">{labelKor}</strong>
              <span className="w-12 text-xs text-right text-gray-400">
                {low}
              </span>
              <div className="flex gap-4 mx-3">
                {[1, 2, 3, 4, 5].map((n) => (
                  <div
                    key={n}
                    className={`w-5 h-5 p-3 rounded-full flex items-center justify-center ${
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
              <span className="w-12 text-xs text-gray-400">{high}</span>
            </div>
          ))}
        </div>
        <div className="wine-description-order-addToCart bg-white p-4 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center border rounded-md overflow-hidden">
              <button className="px-3 py-1 text-lg" onClick={substractQuantity}>
                -
              </button>
              <span className="w-12 text-center text-sm font-medium">
                {itemQuantity}
              </span>
              <button className="px-3 py-1 text-lg" onClick={addQuantity}>
                +
              </button>
            </div>
            <div className="text-right text-xl font-bold">
              ₩ {(price * itemQuantity).toLocaleString()}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="p-2 w-12 rounded-xl border border-gray-300 flex justify-center items-center"
              onClick={() => setIsLiked(!isLiked)}
              title={isLiked ? '좋아요 취소' : '좋아요 추가'}
            >
              {isLiked ? (
                <Heart className="w-6 h-6 stroke-red-500 fill-red-500 transition-colors" />
              ) : (
                <HeartPlus className="w-6 h-6 stroke-black fill-transparent" />
              )}
            </button>
            <button
              onClick={handleInstantOrder}
              className="bg-[#6A1B1A] hover:bg-[#8b2e2e] text-white p-2 w-full rounded-xl font-semibold"
            >
              주문하기
            </button>
            <button
              onClick={handleAddToCart}
              className="bg-[#e8e5eb] hover:bg-[#d6d1d1] text-black p-2 w-full rounded-xl font-semibold"
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
