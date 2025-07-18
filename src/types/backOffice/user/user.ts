import { Address } from '@/types/backOffice/user/Address';

export interface Order {
  orderNumber: string;
  totalPayment: number;
  orderDate: string;
  status: string;
}

export interface UserItemType {
  id: number;
  userId: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  createdAt: string;
  status: string;
  orders?: Order[];
  addresses?: Address[];
}
