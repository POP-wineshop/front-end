import { createSlice } from '@reduxjs/toolkit';

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: {
    // orderItemList: [],
  },
  reducers: {
    setOrderItemList: (state, action) => {
      state.orderItemList = action.payload;
    },
  },
});

export const { setOrderItemList } = orderInfoSlice.actions;
export default orderInfoSlice.reducer;
