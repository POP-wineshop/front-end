// types/UserWithOrders.ts
export interface Order {
  orderNumber: string;
  totalPayment: number;
  orderDate: string;
  status: string;
}

export interface UserWithOrders {
  id: number;
  userId: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  createdAt: string;
  status: 'active' | 'inactive';
  orders: Order[];
}
