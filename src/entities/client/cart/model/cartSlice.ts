import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItemData } from '@/entities/client/cart/model/cartTypes';

interface CartState {
  cartItems: CartItemData[];
  selectedCartItems: CartItemData[];
}

const initialState: CartState = {
  cartItems: [],
  selectedCartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems(state, action: PayloadAction<CartItemData[]>) {
      state.cartItems = action.payload;
    },
    setSelectedCartItems(state, action: PayloadAction<CartItemData[]>) {
      state.selectedCartItems = action.payload;
    },
  },
});

export const { setCartItems, setSelectedCartItems } = cartSlice.actions;
export default cartSlice.reducer;
