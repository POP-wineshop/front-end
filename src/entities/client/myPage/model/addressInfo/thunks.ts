// src/entities/client/myPage/model/addressInfo/thunks.ts

import { AppDispatch, RootState } from '@/shared/store';
import { setAddresses } from './addressInfoSlice';
// API 함수들을 가져옵니다 (함수명 충돌을 피하기 위해 별칭 사용)
import {
  readAddresses,
  createAddress as createAddressApi,
  updateAddress as updateAddressApi,
} from '../../api/addressInfo/addressInfoApi';
import { AddressCreateReq, AddressUpdateReq } from './addressInfoTypes';

/**
 * 배송지 목록을 서버에서 가져와서 Redux 상태에 저장하는 thunk 함수
 * @returns Promise<void> - 비동기 작업을 수행하는 함수
 */
export const fetchAddresses = () => async (dispatch: AppDispatch) => {
  // 1. 서버에서 배송지 목록을 가져옵니다
  const data = await readAddresses();
  // 2. Redux 상태를 업데이트합니다
  dispatch(setAddresses(data));
};

/**
 * 새로운 배송지를 생성하고 Redux 상태에 추가하는 thunk 함수
 * @param addressData - 생성할 배송지 정보 (AddressCreateReq 타입)
 * @returns Promise<void> - 비동기 작업을 수행하는 함수
 */
export const createAddress =
  (addressData: AddressCreateReq) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    // 1. 서버에 새로운 배송지를 생성합니다
    const newAddress = await createAddressApi(addressData);

    // 2. 현재 Redux 상태에서 배송지 목록을 가져옵니다
    // getState()는 thunk 함수에서만 사용할 수 있는 Redux의 내장 함수입니다
    // useSelector와 달리 React 컴포넌트 외부에서도 상태에 접근할 수 있습니다
    const { addresses } = getState().addressInfo;

    // 3. 새로운 배송지를 기존 목록에 추가합니다
    // addresses가 null일 수 있으므로 기본값으로 빈 배열을 사용합니다
    const updatedAddresses = [...(addresses || []), newAddress];

    // 4. 업데이트된 목록으로 Redux 상태를 갱신합니다
    dispatch(setAddresses(updatedAddresses));
  };

/**
 * 기존 배송지를 수정하고 Redux 상태를 업데이트하는 thunk 함수
 * @param addrId - 수정할 배송지의 고유 ID
 * @param addressData - 수정할 배송지 정보 (AddressUpdateReq 타입)
 * @returns Promise<void> - 비동기 작업을 수행하는 함수
 */
export const updateAddress =
  (addrId: number, addressData: AddressUpdateReq) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    // 1. 서버에 배송지 수정 요청을 보냅니다
    const updatedAddress = await updateAddressApi(addrId, addressData);

    // 2. 현재 Redux 상태에서 배송지 목록을 가져옵니다
    const { addresses } = getState().addressInfo;

    // 3. 수정된 배송지로 목록을 업데이트합니다
    // map 함수를 사용하여 특정 ID의 배송지만 새로운 정보로 교체합니다
    // addresses가 null일 수 있으므로 기본값으로 빈 배열을 사용합니다
    const updatedAddresses =
      addresses?.map((addr) =>
        addr.id === updatedAddress.id ? updatedAddress : addr
      ) || [];

    // 4. 업데이트된 목록으로 Redux 상태를 갱신합니다
    dispatch(setAddresses(updatedAddresses));
  };
