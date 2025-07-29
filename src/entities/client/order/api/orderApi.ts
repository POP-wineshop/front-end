import { CartItemDataReq, CartItemDataRes } from '../../cart/model';
import { OrderReqData } from '../model/orderTypes';

const API_BASE_URL = 'http://localhost:8080/api';

// 선택된 장바구니 아이템들 주문 생성
export const createOrderFromSelectedItems = async (
  selectedCartItemIds: number[]
) => {
  const response = await fetch(`${API_BASE_URL}/orders/cart`, {
    method: 'POST',
    headers: {
      Authorization: `${localStorage.getItem('Access Token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(selectedCartItemIds),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// 모든 장바구니 아이템들 주문 생성
export const createOrderFromAllItems = async (cartItems: CartItemDataReq[]) => {
  const response = await fetch(`${API_BASE_URL}/orders/from-cart`, {
    method: 'POST',
    headers: {
      Authorization: `${localStorage.getItem('Access Token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cartItems),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
