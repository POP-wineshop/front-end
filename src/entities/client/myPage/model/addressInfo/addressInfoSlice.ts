import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddressRes } from './addressInfoTypes';

interface AddressState {
  addresses: AddressRes[] | null;
}

const initialState: AddressState = {
  addresses: null,
};

const addressInfoSlice = createSlice({
  name: 'addressInfo',
  initialState,
  reducers: {
    setAddresses: (state, action: PayloadAction<AddressRes[]>) => {
      state.addresses = action.payload;
    },
    // ===== 동기 액션들 (직접 만든 액션) =====
    // clearAddresses: 로그아웃 등 사용자 전역 상태 초기화 시 사용
    clearAddresses: (state) => {
      state.addresses = null;
    },
  },
});

export const { setAddresses, clearAddresses } = addressInfoSlice.actions;
export default addressInfoSlice.reducer;
