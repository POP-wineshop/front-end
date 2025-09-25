export interface CartItemDataReq {
  wineId: number;
  quantity: number;
}

export interface CartItemDataRes {
  cartItemId: number;
  wineName: string;
  // TODO: API로 korName, engName 분리해서 받아오도록 수정 필요
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
  onAddQuantity: (id: number) => void;
  onSubtractQuantity: (id: number) => void;
}

export interface CartPaymentProps {
  cartItems: CartItemDataRes[];
  selectedCartItems: CartItemDataRes[];
  onOrderSelected: () => void;
  onOrderAll: () => void;
  onPatchCartQuantities: () => Promise<Response[]>;
}
