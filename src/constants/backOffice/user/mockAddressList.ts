// mock/mockAddressList.ts
import { Address } from '@/types/backOffice/user/Address';

export const mockAddressList: Address[] = [
  {
    id: 1,
    recipient: '김예시',
    phone: '010-1234-5678',
    address: '서울특별시 강남구 테헤란로 123',
    detailAddress: '101동 101호',
    deliveryMessage: '문 앞에 놓아주세요',
    isDefault: true,
    isRecent: true,
  },
  {
    id: 2,
    recipient: '이영희',
    phone: '010-2345-6789',
    address: '경기도 성남시 분당구 정자동 45',
    detailAddress: '303동 1201호',
    deliveryMessage: '경비실에 맡겨주세요',
    isDefault: false,
    isRecent: true,
  },
  {
    id: 3,
    recipient: '박철수',
    phone: '010-3456-7890',
    address: '부산광역시 해운대구 해운대로 777',
    detailAddress: '501호',
    deliveryMessage: '직접 연락 주세요',
    isDefault: false,
    isRecent: false,
  },
];
