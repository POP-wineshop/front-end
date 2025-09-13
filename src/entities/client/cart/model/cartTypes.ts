export type CartItemDataReq = {
  wineId: number;
  quantity: number;
};

export interface CartItemDataRes {
  cartItemId: number;
  wineName: string;
  quantity: number;
  totalPrice: number;
  wineId: number;
  thumbnail: string;
  winePrice: number;
}

export interface CartItemCompProps {
  cartItem: CartItemDataRes;
  selected: boolean;
  onSelect: () => void;
  onAddQuantityState: (id: number) => void;
  onSubtractQuantityState: (id: number) => void;
}

export interface CartPaymentProps {
  cartItems: CartItemDataRes[];
  selectedCartItems: CartItemDataRes[];
  onOrderSelected: () => void;
  onOrderAll: () => void;
  onPatchCartQuantities: () => Promise<Response[]>;
}
