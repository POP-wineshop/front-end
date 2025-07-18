export interface OrderItemData {
  id: number;
  nameKor: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderCustomerData {
  name: string;
  zipCode: string;
  address: string;
  phone: string;
  message?: string;
}

export interface OrderPaymentData {
  productTotal: number;
  discount: number;
  deliveryFee: number;
  totalPayment: number;
  method: string;
  status: 'paid' | 'cancelRequested' | 'cancelled';
  cancelReason?: string;
}

export interface OrderRes {
  orderNumber: string;
  orderDate: string;
  status: string;
  items: OrderItemData[];
  customer: OrderCustomerData;
  payment: OrderPaymentData;
}
