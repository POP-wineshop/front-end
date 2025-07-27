export type OrderReqData = {
  wineId: number;
  quantity: number;
};

export type OrderResData = {
  orderId: number;
  tossOrderId: string;
  orderStatus: string;
  orderItems: OrderingWineItem[];
  totalPrice: number;
};

export type OrderingWineItem = {
  wineId: number;
  wineNameKor: string;
  winePrice: number;
  orderedQuantity: number;
  orderedPrice: number;
  wineImageUrl: string;
};
