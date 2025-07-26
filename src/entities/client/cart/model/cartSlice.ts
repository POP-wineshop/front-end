import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartWineItem } from '@/entities/client/cart/model';

const initialState: CartWineItem[] = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItemList(state, action: PayloadAction<CartWineItem[]>) {
      state = action.payload;
    },
  },
});

export const { setCartItemList } = cartSlice.actions;
export default cartSlice.reducer;
