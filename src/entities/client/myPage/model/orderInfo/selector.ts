import { RootState } from '@/shared/store';

export const selectOrderItemList = (state: RootState) =>
  state.orderInfo.orderItemList;
