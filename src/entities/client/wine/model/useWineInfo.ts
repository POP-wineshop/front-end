import { useEffect, useState } from 'react';
import { WineData } from './wineTypes';
import { createCartItemData, createInstantOrderData } from './wineUtils';
import { addToCart } from '../../cart/api/cartApi';
import { fetchWineInfo } from '../api/wineApi';

export const useWineInfo = () => {
  const [wineInfo, setWineInfo] = useState<WineData | null>(null);

  useEffect(() => {
    console.time('와인 정보 데이터 패칭');
    fetchWineInfo()
      .then((res) => {
        console.timeEnd('와인 정보 데이터 패칭');
        setWineInfo(res);
      })
      .catch((error) => {
        console.timeEnd('와인 정보 데이터 패칭');
        console.error('와인 정보 조회 실패', error);
      });
  }, []);

  return { wineInfo };
};

export function useWineQuantity() {
  const [quantity, setQuantity] = useState<number>(1);
  return { quantity, setQuantity };
}

export function useWineOrder(wineData: WineData, quantity: number) {
  const handleAddToCart = () => {
    const cartItemData = createCartItemData(wineData.id, quantity);
    addToCart(cartItemData);
  };

  // TODO: 장바구니에 이미 포함되어 있을 시 이미 포함되어있다는 알림 처리

  const handleInstantOrder = () => {
    const instantOrderData = createInstantOrderData(wineData.id, quantity);
    addToCart(instantOrderData);
    // TODO: 이거 왜 addToCart로 되어있는지 파악하기
  };

  return { handleAddToCart, handleInstantOrder };
}
