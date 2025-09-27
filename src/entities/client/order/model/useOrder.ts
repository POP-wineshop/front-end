import { useNavigate } from 'react-router-dom';
import { createInstantOrder } from '../api/orderApi';
import { OrderDataReq } from './orderTypes';

// 상품 개별 주문 페이지로 이동
export const handleInstantOrder = async (orderdata: OrderDataReq) => {
  const navigate = useNavigate();

  try {
    const jsonRes = await createInstantOrder(orderdata);
    console.log(`주문 생성 성공 : `, jsonRes.data);
    navigate(`/order`, { state: jsonRes.data });
  } catch (error) {
    console.error(`주문 생성 실패 : `, error);
  }
};
