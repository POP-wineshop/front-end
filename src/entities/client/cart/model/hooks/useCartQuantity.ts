import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/shared/store';
import { setCartItems, setSelectedCartItems } from '../cartSlice';
import { updateCartItemQuantity } from '../../api/cartApi';
import { selectCartItems, selectCartSelectedItems } from '../selector';

export const useCartQuantity = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector(selectCartItems);
  const selectedCartItems = useSelector(selectCartSelectedItems);

  // 수량 증가
  const handleAddQuantity = (id: number) => {
    const newCartItems = cartItems.map((item) =>
      item.wineId === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    dispatch(setCartItems(newCartItems));

    const newSelectedCartItems = selectedCartItems.map((item) =>
      item.wineId === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    dispatch(setSelectedCartItems(newSelectedCartItems));
  };

  // 수량 감소
  const handleSubtractQuantity = (id: number) => {
    const newCartItems = cartItems.map((item) =>
      item.wineId === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    dispatch(setCartItems(newCartItems));

    const newSelectedCartItems = selectedCartItems.map((item) =>
      item.wineId === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    dispatch(setSelectedCartItems(newSelectedCartItems));
  };

  // 장바구니 수량 상태를 서버에 PATCH 요청으로 동기화하는 함수
  const handlePatchCartQuantities = async () => {
    try {
      const patchRequests = cartItems.map((item) =>
        updateCartItemQuantity(item.cartItemId, item.quantity)
      );

      const responses = await Promise.all(patchRequests);
      console.log(`PATCH 요청 성공 : `, responses);
      alert(`장바구니 수량이 성공적으로 업데이트되었습니다!`);
      return responses;
    } catch (error) {
      console.error(`PATCH 요청 중 오류 발생 : `, error);
      alert(`장바구니 수량 업데이트 중 오류가 발생했습니다.`);
      throw error;
    }
  };

  return {
    handleAddQuantity,
    handleSubtractQuantity,
    handlePatchCartQuantities,
  };
};
