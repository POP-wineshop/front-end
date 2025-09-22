import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/shared/store';
import { setSelectedCartItems } from '../cartSlice';
import { CartItemDataRes } from '../cartTypes';
import { selectCartItems, selectCartSelectedItems } from '../selector';

export const useCartSelection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector(selectCartItems);
  const selectedCartItems = useSelector(selectCartSelectedItems);
  const [isAllCartItemsSelected, setIsAllCartItemsSelected] =
    useState<boolean>(false);

  // 전체 선택 상태 업데이트 함수
  const handleUpdateAllItemsSelectedState = (
    currentSelectedItems: CartItemDataRes[]
  ) => {
    const isAllSelected =
      cartItems.length > 0 && currentSelectedItems.length === cartItems.length;
    setIsAllCartItemsSelected(isAllSelected);
  };

  // 아이템 전체 선택
  const handleSelectAllCartItems = () => {
    if (isAllCartItemsSelected) {
      dispatch(setSelectedCartItems([]));
      setIsAllCartItemsSelected(false);
    } else {
      dispatch(setSelectedCartItems(cartItems));
      setIsAllCartItemsSelected(true);
    }
  };

  // 장바구니 아이템 개별 선택/해제
  const handleSelectCartItem = (id: number) => {
    let updatedSelectedItems: CartItemDataRes[];

    if (selectedCartItems.some((item) => item.wineId === id)) {
      // 선택 해제
      updatedSelectedItems = selectedCartItems.filter(
        (cartItem) => cartItem.wineId !== id
      );
    } else {
      // 선택 추가
      const targetItem = cartItems.find((cartItem) => cartItem.wineId === id);

      if (targetItem) {
        updatedSelectedItems = [...selectedCartItems, targetItem];
      } else {
        return; // 대상 아이템을 찾지 못한 경우
      }
    }

    dispatch(setSelectedCartItems(updatedSelectedItems));
    handleUpdateAllItemsSelectedState(updatedSelectedItems);
  };

  return {
    selectedCartItems,
    isAllCartItemsSelected,
    handleSelectAllCartItems,
    handleSelectCartItem,
    handleUpdateAllItemsSelectedState,
  };
};
