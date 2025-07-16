// types/Address.ts
export interface Address {
  id: number;
  recipient: string;
  phone: string;
  address: string;
  detailAddress: string;
  deliveryMessage: string;
  isDefault: boolean;
  isRecent: boolean;
}
