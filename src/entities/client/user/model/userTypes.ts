// entities/user/model/userTypes.ts
export interface User {
  userId: string;
  username: string;
  accessToken: string;
  refreshToken: string;
}

export interface LoginFormProps {
  username: string;
  password: string;
  onUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

// 회원가입 요청에 사용할 타입 (API 요청용)
export interface SignupReq {
  name: string;
  username: string;
  password: string;
  // email?: string;
  // phoneNumber?: string;
}
