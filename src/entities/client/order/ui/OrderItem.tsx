import { useEffect, useState } from 'react';
import DuckhornMerlot from '@/assets/wineItem/Duckhorn_Napa Valley_Merlot.png';
import { OrderingWineItem, OrderResData } from '../model/orderTypes';
import { useSelector } from 'react-redux';
import { selectOrder } from '../model';

export const OrderItem = (props: OrderingWineItem) => {
  const {
    wineId,
    wineNameKor,
    winePrice,
    orderedQuantity,
    orderedPrice,
    wineImageUrl,
  } = props;

  const [deliveryFee, setDeliveryFee] = useState<number>(0);

  return (
    <div className="bg-white/80 p-6 w-full flex flex-col space-y-4">
      <div className="order-item flex justify-center items-center w-full h-full">
        <div className="w-[180px] h-60 border border-[#E4E7EC] rounded-lg m-3 flex-shrink-0 bg-gray-50">
          <img
            className="order-item-img object-contain w-full h-full p-2"
            // src={wineImageUrl}
            src={DuckhornMerlot}
            alt="주문할 와인 이미지"
          />
        </div>
        <div className="order-item-context h-60 m-3 w-full">
          <div className="flex justify-between items-center h-1/2">
            <div className="flex flex-col justify-center items-left ">
              <span className="order-item-name-eng text-lg font-montserrat text-gray-600">
                {/* {wineNameEng} */}
                {/* 와인 영어 이름 데이터 호출 필요 */}
                와인 영어 이름
              </span>
              <span className="order-item-name-kor text-xl font-bold text-[#A83E3E] font-montserrat">
                {wineNameKor}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center h-1/2">
            <div className="order-item-quantity">
              <span className="w-12 text-left text-xl font-semibold text-[#A83E3E] font-montserrat">
                수량 : {orderedQuantity}병
              </span>
            </div>
            <div className="flex flex-col items-end gap-1 ">
              <p className="order-item-delivery-fee text-sm text-gray-600 font-montserrat">
                기본 배송 : [{deliveryFee === 0 ? '무료' : deliveryFee}] /
                개별배송
              </p>
              <span className="order-item-cost text-right text-2xl font-bold text-[#A83E3E] font-montserrat">
                ₩ {(orderedQuantity * winePrice).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
