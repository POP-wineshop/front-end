import {
  AddressRes,
  AddressCreateReq,
  AddressUpdateReq,
  AddressListRes,
} from '@/entities/client/myPage/model/addressInfo/addressInfoTypes';
import {
  apiRequest,
  showSuccessMessage,
  showErrorMessage,
  reloadPage,
} from '@/utils/common/api';
import { getAuthHeaders } from '@/utils/common/auth';

// 배송지 목록 조회
export const readAddresses = async (): Promise<any> => {
  try {
    const response = await apiRequest<any>('/delivery', {
      headers: getAuthHeaders(),
    });

    showSuccessMessage('배송지 조회 성공');
    return response.data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : '배송지 조회 실패';
    // 에러 로깅, Error 객체 여부 확인. 참일 경우 error.message, 거짓일 경우 '배송지 조회 실패' 문자열 사용
    console.error(`배송지 조회 실패: ${errorMessage}`);
    showErrorMessage(`배송지 조회 실패: ${errorMessage}`);
    throw error;
  }
};

// 배송지 생성
export const createAddress = async (
  addressData: AddressCreateReq
): Promise<any> => {
  try {
    const response = await apiRequest<any>('/delivery/create', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify([addressData]),
    });

    showSuccessMessage('배송지 등록 성공! 배송지 목록으로 이동합니다.');
    return response.data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : '배송지 등록 실패';
    showErrorMessage(`배송지 등록 실패: ${errorMessage}`);
    throw error;
  }
};

// 배송지 수정
export const updateAddress = async (
  addrId: number,
  addressData: AddressUpdateReq
): Promise<AddressRes> => {
  try {
    const response = await apiRequest<any>(`/delivery/${addrId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(addressData),
    });

    showSuccessMessage('배송지가 수정되었습니다.');
    reloadPage();
    return response.data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : '배송지 수정 실패';
    showErrorMessage(`배송지 수정 실패: ${errorMessage}`);
    throw error;
  }
};

// 배송지 삭제
export const deleteAddress = async (addrId: number): Promise<void> => {
  try {
    await apiRequest<void>(`/delivery/${addrId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    showSuccessMessage('배송지가 삭제되었습니다.');
    reloadPage();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : '배송지 삭제 실패';
    showErrorMessage(`배송지 삭제 실패: ${errorMessage}`);
    throw error;
  }
};
