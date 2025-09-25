import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/shared/store';
import {
  createOrderFromSelectedItems,
  createOrderFromAllItems,
} from '@/entities/client/order/api/orderApi';
import { setOrder } from '@/entities/client/order/model';
import { selectCartItems, selectCartSelectedItems } from '../selector';

export const useCartOrder = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector(selectCartItems);
  const selectedCartItems = useSelector(selectCartSelectedItems);

  // 선택된 장바구니 아이템 주문 생성
  const handleOrderSelectedCartItems = async () => {
    try {
      const selectedCartItemIds = selectedCartItems.map(
        (item) => item.cartItemId
      );
      console.log(`선택된 장바구니 아이템 ID 목록 : `, selectedCartItemIds);

      const jsonRes = await createOrderFromSelectedItems(selectedCartItems);
      console.log(`장바구니 내 선택된 아이템 주문 생성 성공: `, jsonRes);

      // 주문 데이터를 Redux store에 저장
      dispatch(setOrder(jsonRes.data));
      alert(`장바구니 내 선택된 아이템 주문 생성 성공!`);
      window.location.href = `/order`;
      console.log('Cart Page에서 보낸 orderId :', jsonRes.data.orderId);
    } catch (error) {
      console.error(`장바구니 내 선택된 아이템 주문 생성 실패 : `, error);
      alert(`장바구니 내 선택된 아이템 주문 생성 실패 ㅠ : ${error}`);
    }
  };

  // 모든 장바구니 아이템 주문 생성
  const handleOrderAllCartItems = async () => {
    try {
      const jsonRes = await createOrderFromAllItems(cartItems);
      console.log(`장바구니 내 모든 아이템 주문 생성 성공 : `, jsonRes);

      // 주문 데이터를 Redux store에 저장
      dispatch(setOrder(jsonRes.data));

      alert(`장바구니 내 모든 아이템 주문 생성 성공!`);
      window.location.href = `/order`;
    } catch (error) {
      console.error(`장바구니 내 모든 아이템 주문 생성 실패 : `, error);
      alert(`장바구니 내 모든 아이템 주문 생성 실패 ㅠ : ${error}`);
    }
  };

  return {
    handleOrderSelectedCartItems,
    handleOrderAllCartItems,
  };
};
