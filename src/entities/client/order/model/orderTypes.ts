export type OrderReqData = {
  wineId: number;
  quantity: number;
};

export type OrderResData = {
  orderId: number;
  tossOrderId: string;
  orderStatus: string;
  orderItems: OrderWineItem[];
  totalPrice: number;
};

export type OrderWineItem = {
  wineId: number;
  wineNameKor: string;
  winePrice: number;
  orderedQuantity: number;
  orderedPrice: number;
  wineImageUrl: string;
};
