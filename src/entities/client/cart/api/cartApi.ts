import { CartItemDataRes } from '../model/cartTypes';
import { CartItemDataReq } from '../../wine/model';

const API_BASE_URL = 'http://localhost:8080/api';

export const addToCart = async (cartItemData: any) => {
  const response = await fetch(`http://localhost:8080/api/carts`, {
    method: 'POST',
    headers: {
      Authorization: `${localStorage.getItem('Access Token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cartItemData),
  });

  const jsonRes = await response.json();
  if (jsonRes.data.length === 0) {
    throw new Error('장바구니 추가 항목이 비어 있음. 다시 시도하세요.');
  }

  return jsonRes.data;
};

// 장바구니 아이템 목록 조회
export const fetchCartItems = async () => {
  const response = await fetch(`${API_BASE_URL}/carts`, {
    headers: {
      Authorization: `${localStorage.getItem('Access Token')}`,
    },
  });

  const jsonRes = await response.json();

  if (!response.ok) {
    throw new Error(jsonRes.message);
  }

  return jsonRes.data;
};

// 장바구니 수량 업데이트
export const updateCartItemQuantity = async (
  cartItemId: number,
  quantity: number
) => {
  const response = await fetch(`${API_BASE_URL}/carts/${cartItemId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `${localStorage.getItem('Access Token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// 장바구니 아이템 삭제
export const deleteCartItem = async (cartItemId: number) => {
  const response = await fetch(`${API_BASE_URL}/carts/${cartItemId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `${localStorage.getItem('Access Token')}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
