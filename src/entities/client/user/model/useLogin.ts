import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((jsonResponse) => {
        localStorage.setItem(
          'Access Token',
          `Bearer ${jsonResponse.data.accessToken}`
        );
        localStorage.setItem(
          'Refresh Token',
          `Bearer ${jsonResponse.data.refreshToken}`
        );
        localStorage.setItem('User Name', `${jsonResponse.data.username}`);
        localStorage.setItem('User Id', `${jsonResponse.data.userId}`);
        setAccessToken(jsonResponse.data.accessToken);
        setRefreshToken(jsonResponse.data.refreshToken);
        alert(`로그인 성공!`);
        navigate('/list');
      })
      .catch((error) => {
        alert(`로그인 실패!`);
      });
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    handleLogin,
  };
}
