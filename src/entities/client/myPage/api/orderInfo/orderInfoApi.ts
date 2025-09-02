import { setOrderItemList } from '../../model/orderInfo';

// 고객 전체 주문 조회 API 호출
export const readUserOrders = () => {
  fetch(`http://localhost:8080/api/orders/my`, {
    headers: {
      Authorization: `${localStorage.getItem('Access Token')}`,
    },
  })
    .then((res) => res.json())
    .then((jsonRes) => {
      setOrderItemList(jsonRes.data);
    });
};

// 주문 취소 API 호출
export const handleRequestOrderCancel = (
  e: React.MouseEvent<HTMLButtonElement>,
  orderId: number
) => {
  e.stopPropagation();
  fetch(`http://localhost:8080/api/orders/${orderId}/cancel`, {
    method: 'DELETE',
    headers: {
      Authorization: `${localStorage.getItem('Access Token')}`,
    },
  })
    .then((res) => res.json())
    .then((jsonRes) => console.log(`주문 취소 요청 성공: ${jsonRes}`))
    .catch((err) => {
      console.error(`주문 취소 요청 실패: ${err}`);
      alert(`주문 취소 요청 실패 ㅠ: ${err}`);
    });
};
