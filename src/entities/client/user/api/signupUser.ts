import { SignupRequest } from '../model/userTypes';

export async function signupUser(signupData: SignupRequest) {
  const res = await fetch('http://localhost:8080/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(signupData),
  });
  if (!res.ok) throw new Error('회원가입 실패');
  return res.json();
}
