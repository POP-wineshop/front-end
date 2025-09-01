export interface OrderItem {
  wineId: number;
  wineNameKor: string;
  winePrice: number;
  orderedQuantity: number;
  orderedPrice: number;
  wineImageUrl: string;
}

export interface Order {
  orderId: number;
  orderStatus: string;
  orderItems: OrderItem[];
  totalPrice: number;

  // 주문 일시 추가 시 불러오기
  orderDate: string;
}
