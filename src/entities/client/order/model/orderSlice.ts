import { createSlice } from '@reduxjs/toolkit';
import { OrderResData } from './orderTypes';

const initialState: OrderResData = {
  orderId: 0,
  tossOrderId: '',
  orderStatus: '',
  orderItems: [],
  totalPrice: 0,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setInstantOrder: (state, action) => {
      state.orderId = action.payload.orderId;
      state.tossOrderId = action.payload.tossOrderId;
      state.orderStatus = action.payload.orderStatus;
      state.orderItems = action.payload.orderItems;
      state.totalPrice = action.payload.totalPrice;
    },

    // 장바구니 주문 상태 설정
    setCartOrder: (state, action) => {
      state.orderId = action.payload.orderId;
      state.tossOrderId = action.payload.tossOrderId;
      state.orderStatus = action.payload.orderStatus;
      state.orderItems = action.payload.orderItems;
      state.totalPrice = action.payload.totalPrice;
    },
  },
});

export const { setInstantOrder } = orderSlice.actions;
export default orderSlice.reducer;
