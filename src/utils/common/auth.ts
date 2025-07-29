// 인증 토큰 관련 유틸리티 함수들

export const getAccessToken = (): string | null => {
  return localStorage.getItem('Access Token');
};

export const setAccessToken = (token: string): void => {
  localStorage.setItem('Access Token', token);
};

export const removeAccessToken = (): void => {
  localStorage.removeItem('Access Token');
};

export const isAuthenticated = (): boolean => {
  return getAccessToken() !== null;
};

export const getAuthHeaders = (): Record<string, string> => {
  const token = getAccessToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: token }),
  };
};
