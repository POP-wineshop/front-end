import { useState } from 'react';
import { WineData } from './wineTypes';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createCartItemData, createInstantOrderData } from './wineUtils';
import { addToCart } from '../../cart/api/cartApi';

export function useWineQuantity() {
  const [quantity, setQuantity] = useState<number>(1);
  return { quantity, setQuantity };
}

export function useWineOrder(wineData: WineData, quantity: number) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const cartItemData = createCartItemData(wineData, quantity);
    addToCart(cartItemData);
  };

  // TODO: 장바구니에 이미 포함되어 있을 시 이미 포함되어있다는 알림 처리

  const handleInstantOrder = () => {
    const instantOrderData = createInstantOrderData(wineData, quantity);
    addToCart(instantOrderData);
    // TODO: 이거 왜 addToCart로 되어있는지 파악하기
  };

  return { handleAddToCart, handleInstantOrder };
}
