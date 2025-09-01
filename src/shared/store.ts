import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/entities/client/user/model/userSlice';
import wineReducer from '@/entities/client/wine/model/wineSlice';
import cartReducer from '@/entities/client/cart/model/cartSlice';
import orderReducer from '@/entities/client/order/model/orderSlice';
import addressInfoReducer from '@/entities/client/myPage/model/addressInfo/addressInfoSlice';
import orderInfoReducer from '@/entities/client/myPage/model/orderInfo/orderInfoSlice';

export const store = configureStore({
  reducer: {
    user: userReducer, // 사용자 상태 관리 리듀서 등록
    wine: wineReducer, // 와인 상태 관리 리듀서 등록
    order: orderReducer, // 주문 상태 관리 리듀서 등록
    cart: cartReducer, // 장바구니 상태 관리 리듀서 등록
    addressInfo: addressInfoReducer, // 주소 정보 상태 관리 리듀서 등록
    orderInfo: orderInfoReducer, // 주문 정보 상태 관리 리듀서 등록
  },
});

export type RootState = ReturnType<typeof store.getState>; // 전체 상태 타입 정의
export type AppDispatch = typeof store.dispatch; // 디스패치 타입 정의
