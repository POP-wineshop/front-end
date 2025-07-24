// entities/user/model/userTypes.ts
export interface User {
  userId: string;
  username: string;
  accessToken: string;
  refreshToken: string;
}

// 회원가입 요청에 사용할 타입 (API 요청용)
export interface SignupRequest {
  name: string;
  username: string;
  password: string;
  // email?: string;
  // phoneNumber?: string;
}
