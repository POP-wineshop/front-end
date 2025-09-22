import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItemDataRes } from '@/entities/client/cart/model/cartTypes';

interface CartState {
  cartItems: CartItemDataRes[];
  selectedCartItems: CartItemDataRes[];
}

const initialState: CartState = {
  cartItems: [],
  selectedCartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems(state, action: PayloadAction<CartItemDataRes[]>) {
      state.cartItems = action.payload;
    },
    setSelectedCartItems(state, action: PayloadAction<CartItemDataRes[]>) {
      state.selectedCartItems = action.payload;
    },
  },
});

export const { setCartItems, setSelectedCartItems } = cartSlice.actions;
export default cartSlice.reducer;
