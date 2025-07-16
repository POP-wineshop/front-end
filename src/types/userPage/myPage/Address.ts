export interface AddressReq {
  address: string;
  detailAddress: string;
  recipientName: string;
  recipientPhoneNumber: string;
  deliveryMessage: string;
  default: boolean;
}

export interface AddressRes {
  id: number;
  address: string;
  detailAddress: string;
  recipientName: string;
  recipientPhoneNumber: string;
  deliveryMessage: string;
  default: boolean;
}
