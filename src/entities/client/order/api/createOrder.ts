import { OrderReqData } from '../model/orderTypes';

export async function createInstantOrder(orderData: OrderReqData) {
  const res = await fetch(`http://localhost:8080/api/orders/instant`, {
    method: 'POST',
    headers: {
      Authorization: `${localStorage.getItem('Access Token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });
  if (!res.ok) throw new Error('주문 생성 실패');
  return res.json();
}
