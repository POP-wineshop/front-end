import { RootState } from '@/shared/store';

export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectCartSelectedItems = (state: RootState) =>
  state.cart.selectedCartItems;
