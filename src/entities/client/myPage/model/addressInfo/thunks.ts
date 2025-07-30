// src/entities/client/myPage/model/addressInfo/thunks.ts
import { AppDispatch } from '@/shared/store';
import { setAddresses } from './addressInfoSlice';
import { readAddresses } from '../../api/addressInfo/addressInfoApi';

export const fetchAddresses = () => async (dispatch: AppDispatch) => {
  const data = await readAddresses();
  dispatch(setAddresses(data));
};
