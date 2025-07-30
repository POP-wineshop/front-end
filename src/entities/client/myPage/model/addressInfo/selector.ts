import { RootState } from '@/shared/store';

export const selectAddresses = (state: RootState) =>
  state.addressInfo.addresses;

export const selectDefaultAddress = (state: RootState) => {
  const addresses = state.addressInfo.addresses;
  return addresses?.find((addr) => addr.default) || null;
};

export const selectRecentAddress = (state: RootState) => {
  const addresses = state.addressInfo.addresses;
  if (!addresses || addresses.length === 0) return null;

  // 최근 등록된 배송지를 반환 (id가 큰 순서대로)
  return addresses.sort((a, b) => b.id - a.id)[0];
};

export const selectAddressById = (state: RootState, id: number) => {
  const addresses = state.addressInfo.addresses;
  return addresses?.find((addr) => addr.id === id) || null;
};
