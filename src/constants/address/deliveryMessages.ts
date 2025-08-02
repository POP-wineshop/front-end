import { DeliveryMessageOption } from '@/entities/client/myPage/model/addressInfo/addressInfoTypes';

export const DELIVERY_MESSAGE_OPTIONS: DeliveryMessageOption[] = [
  '배송 전에 미리 연락바랍니다.',
  '부재 시 경비실에 맡겨주세요.',
  '부재 시 문 앞에 놓아주세요.',
  '빠른 배송 부탁드립니다.',
  '택배함에 보관해 주세요.',
  '직접 입력',
];

export const DEFAULT_DELIVERY_MESSAGE = '배송 전에 미리 연락바랍니다.';
