import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWineList } from '@/entities/client/wine/api/wineApi';
import {
  createCartItemData,
  createInstantOrderData,
  setWineList,
  toggleLike,
  WineData,
} from '@/entities/client/wine/model';
import {
  selectWineFilter,
  selectWineLikeStatus,
  selectWineList,
} from '@/entities/client/wine/model/selectors';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../cart/api/cartApi';

export const useWineList = () => {
  const dispatch = useDispatch();
  const wineList = useSelector(selectWineList);
  const wineFilter = useSelector(selectWineFilter);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;
  const startItemIndex = (currentPage - 1) * itemsPerPage;
  const endItemIndex = startItemIndex + itemsPerPage;
  const currentItems = wineList.slice(startItemIndex, endItemIndex);

  useEffect(() => {
    fetchWineList(wineFilter || {})
      .then((res) => {
        dispatch(setWineList(res));
      })
      .catch((error) => {
        console.error('와인 목록 조회 실패', error);
      });
  }, [wineFilter, dispatch]);

  return {
    wineList,
    wineFilter,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    currentItems,
  };
};

export function useWineListItem(wineData: WineData) {
  const { isLiked, toggleLike } = useWineLike(wineData.id);
  const { quantity, setQuantity } = useWineQuantity();
  const { handleAddToCart, handleInstantOrder } = useWineOrder(
    wineData,
    quantity
  );

  return {
    isLiked,
    toggleLike,
    quantity,
    setQuantity,
    handleAddToCart,
    handleInstantOrder,
  };
}

export function useWineLike(wineId: number) {
  const dispatch = useDispatch();
  const isLiked = useSelector(selectWineLikeStatus(wineId));

  const handleToggleLike = () => {
    dispatch(toggleLike(wineId));
  };

  return { isLiked, toggleLike: handleToggleLike };
}

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
  };

  return { handleAddToCart, handleInstantOrder };
}
