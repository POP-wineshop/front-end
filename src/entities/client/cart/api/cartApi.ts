import { CartItemDataReq } from '../model/cartTypes';

const API_BASE_URL = 'http://localhost:8080/api';

export const addToCart = async (cartItem: CartItemDataReq) => {
  console.time('addToCart');
  const response = await fetch(`http://localhost:8080/api/carts`, {
    method: 'POST',
    headers: {
      Authorization: `${localStorage.getItem('Access Token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cartItem),
  });

  const jsonRes = await response.json();
  console.timeEnd('addToCart');
  console.log('addToCart 응답:', jsonRes);

  if (jsonRes.data.length === 0) {
    throw new Error('장바구니 추가 항목이 비어 있음. 다시 시도하세요.');
  }

  return jsonRes.data;
};

// 장바구니 아이템 목록 조회
export const fetchCartItems = async () => {
  console.time('fetchCartItems');
  const response = await fetch(`${API_BASE_URL}/carts`, {
    headers: {
      Authorization: `${localStorage.getItem('Access Token')}`,
    },
  });

  const jsonRes = await response.json();
  console.timeEnd('fetchCartItems');
  console.log('fetchCartItems 응답:', jsonRes);

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
  console.time('updateCartItemQuantity');
  const response = await fetch(`${API_BASE_URL}/carts/${cartItemId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `${localStorage.getItem('Access Token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ quantity }),
  });

  const jsonRes = await response.json();
  console.timeEnd('updateCartItemQuantity');
  console.log('updateCartItemQuantity 응답:', jsonRes);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return jsonRes.data;
};

// 장바구니 아이템 삭제
export const deleteCartItem = async (cartItemId: number) => {
  console.time('deleteCartItem');
  const response = await fetch(`${API_BASE_URL}/carts/${cartItemId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `${localStorage.getItem('Access Token')}`,
    },
  });

  const jsonRes = await response.json();
  console.timeEnd('deleteCartItem');
  console.log('deleteCartItem 응답:', jsonRes);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return jsonRes.data;
};
