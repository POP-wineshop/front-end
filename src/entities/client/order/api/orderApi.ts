import { CartItemDataRes } from '../../cart/model';
import { OrderDataReq } from '../model/orderTypes';

const API_BASE_URL = 'http://localhost:8080/api';

// TODO: 사실 이 주문하는 API 호출이 서로 다를 필요는 없다. 같은 방식으로 리팩토링해볼 필요가 있음.

// 선택된 장바구니 아이템들 주문 생성
export const createOrderFromSelectedItems = async (
  selectedCartItemIds: CartItemDataRes[]
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
export const createOrderFromAllItems = async (cartItems: CartItemDataRes[]) => {
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

// 즉시 주문 생성
export const createInstantOrder = async (orderData: OrderReqData) => {
  const response = await fetch(`${API_BASE_URL}/orders/instant`, {
    method: 'POST',
    headers: {
      Authorization: `${localStorage.getItem('Access Token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
