import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWineList } from '@/entities/client/wine/api/wineApi';
import {
  createCartItemData,
  createInstantOrderData,
  setWineList,
  WineData,
} from '@/entities/client/wine/model';
import {
  selectWineFilter,
  selectWineList,
} from '@/entities/client/wine/model/selectors';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../cart/api/cartApi';
import useWineLike from './useWineLike';

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

  return {
    isLiked,
    toggleLike,
  };
}
