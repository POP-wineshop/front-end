import { RootState } from '@/shared/store';

export const selectUser = (state: RootState) => state.user.user;
export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;
