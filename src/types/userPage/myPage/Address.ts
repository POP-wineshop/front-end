export interface AddressReq {
  userId: number;
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

// API 요청 타입들
export interface AddressCreateReq {
  userId: number;
  address: string;
  detailAddress: string;
  recipientName: string;
  recipientPhoneNumber: string;
  deliveryMessage: string;
  default: boolean;
}

export interface AddressUpdateReq {
  address: string;
  detailAddress: string;
  recipientName: string;
  recipientPhoneNumber: string;
  deliveryMessage: string;
  default: boolean;
}

// API 응답 타입들
export interface AddressApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface AddressListResponse {
  addresses: AddressRes[];
}

// 폼 상태 타입
export interface AddressFormData {
  recipientName: string;
  zipCode: string;
  address: string;
  detailAddress: string;
  phoneNumber: string;
  deliveryMessage: string;
  customDeliveryMessage: string;
  isDefault: boolean;
}

// 배송 메시지 옵션 타입
export type DeliveryMessageOption =
  | '배송 전에 미리 연락바랍니다.'
  | '부재 시 경비실에 맡겨주세요.'
  | '부재 시 문 앞에 놓아주세요.'
  | '빠른 배송 부탁드립니다.'
  | '택배함에 보관해 주세요.'
  | '직접 입력';

// 배송지 상태 타입
export interface AddressState {
  addresses: AddressRes[] | null;
  loading: boolean;
  error: string | null;
}
