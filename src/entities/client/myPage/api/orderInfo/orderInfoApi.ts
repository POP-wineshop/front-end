import { setOrderItemList } from '../../model/orderInfo';
import { AppDispatch } from '@/shared/store';

// 주문 목록 조회 (Read)
export const fetchOrders = () => async (dispatch: AppDispatch) => {
  try {
    const response = await fetch(`http://localhost:8080/api/orders/my`, {
      headers: {
        Authorization: `${localStorage.getItem('Access Token')}`,
      },
    });
    const jsonRes = await response.json();
    dispatch(setOrderItemList(jsonRes.data));
  } catch (error) {
    console.error('주문 목록 조회 실패:', error);
  }
};

// 주문 취소 요청 (Delete Request)
export const requestOrderCancel =
  (orderId: number) => async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/orders/${orderId}/cancel`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `${localStorage.getItem('Access Token')}`,
          },
        }
      );
      const jsonRes = await response.json();
      console.log(`주문 취소 요청 성공: ${jsonRes}`);
      // 필요 시 주문 목록 재조회 등 추가 dispatch
    } catch (error) {
      console.error('주문 취소 요청 실패:', error);
      alert(`주문 취소 요청 실패 ㅠ: ${error}`);
    }
  };
