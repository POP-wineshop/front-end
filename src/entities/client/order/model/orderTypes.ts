// 일단 파생되는 타입보다는 단순한 타입 위주로 작성할 것이므로 interface로 변경

export interface OrderDataReq {
  wineId: number;
  quantity: number;
}

export interface OrderDataRes {
  orderId: number;
  tossOrderId: string;
  orderStatus: string;
  orderItems: OrderWineItem[];
  totalPrice: number;
}

export interface OrderWineItem {
  wineId: number;
  wineNameKor: string;
  winePrice: number;
  orderedQuantity: number;
  orderedPrice: number;
  wineImageUrl: string;
}
