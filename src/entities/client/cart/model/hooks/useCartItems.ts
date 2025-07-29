import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/shared/store';
import { setCartItems } from '../cartSlice';
import { fetchCartItems, deleteCartItem } from '../../api/cartApi';
import { selectCartItems, selectCartSelectedItems } from '../selector';

export const useCartItems = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector(selectCartItems);
  const selectedCartItems = useSelector(selectCartSelectedItems);

  // 장바구니 아이템 목록 조회
  const handleLoadCartItems = async () => {
    try {
      const data = await fetchCartItems();
      dispatch(setCartItems(data));
    } catch (error) {
      console.error('장바구니 조회 실패:', error);
    }
  };

  // 선택된 장바구니 아이템들을 삭제하는 함수
  const handleDeleteSelectedCartItems = async () => {
    try {
      const selectedCartItemIds = selectedCartItems.map(
        (item) => item.cartItemId
      );

      const deleteRequests = selectedCartItemIds.map((cartItemId) =>
        deleteCartItem(cartItemId)
      );

      await Promise.all(deleteRequests);
      console.log(`선택된 장바구니 아이템 삭제 성공`);
      alert(`선택된 장바구니 아이템이 성공적으로 삭제되었습니다!`);
      // 삭제 후 장바구니 목록 새로고침
      window.location.reload();
    } catch (error) {
      console.error(`삭제 중 오류 발생 : `, error);
      alert(`삭제 중 오류가 발생했습니다.`);
    }
  };

  return {
    cartItems,
    handleLoadCartItems,
    handleDeleteSelectedCartItems,
  };
};
