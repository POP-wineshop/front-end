// Redux Toolkit을 사용한 사용자(user) 상태 관리 모듈입니다.
// 이 파일은 사용자 정보(로그인 상태 등)를 전역에서 관리할 때 사용합니다.

import { createSlice } from '@reduxjs/toolkit'; // Redux Toolkit의 createSlice 함수 import
import type { User } from './userTypes'; // User 타입 import

// 사용자 상태의 초기값을 정의합니다. (처음에는 로그인 정보가 없으므로 null)
const initialState: { user: User | null; isLoggedIn: boolean } = {
  user: null,
  isLoggedIn: false,
};

// createSlice를 사용해 user 상태를 관리하는 슬라이스를 만듭니다.
const userSlice = createSlice({
  name: 'user', // 이 슬라이스의 이름(상태 구분용)
  initialState, // 초기 상태 값
  reducers: {
    // login: 사용자 정보를 상태에 저장하는 함수(로그인 성공 시 사용)
    login(state, action) {
      state.user = action.payload; // action.payload에 담긴 사용자 정보로 상태를 교체
      state.isLoggedIn = true;
    },
    // logout: 사용자 정보를 초기화하는 함수(로그아웃 시 사용)
    logout(state) {
      state.user = null; // 상태를 null로 초기화
      state.isLoggedIn = false;
    },
  },
});

// 액션 생성자와 리듀서를 export하여 다른 곳에서 사용할 수 있게 합니다.
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
