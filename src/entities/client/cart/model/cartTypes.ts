export interface CartWineItem {
  cartItemId: number;
  wineName: string;
  quantity: number;
  totalPrice: number;
  wineId: number;
  thumbnail: string;
  winePrice: number;
}

export interface CartItemProps {
  cartItemList: CartWineItem[];
  selectedCartItemList: CartWineItem[];
  onOrderSelected: () => void;
  onOrderAll: () => void;
  onPatchCartQuantities: () => Promise<Response[]>;
}
