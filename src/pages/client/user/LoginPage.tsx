import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '@/entities/client/user/model/userSlice';
import { loginUser } from '@/entities/client/user/api/loginUser';
import LoginForm from '@/entities/client/user/ui/LoginForm';

const LoginPage = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const jsonResponse = await loginUser({ username, password });
      // 토큰 및 사용자 정보 localStorage 저장
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

      // Redux store에 사용자 정보 저장
      dispatch(
        login({
          userId: jsonResponse.data.userId,
          username: jsonResponse.data.username,
          accessToken: jsonResponse.data.accessToken,
          refreshToken: jsonResponse.data.refreshToken,
        })
      );

      alert('로그인 성공!');
      navigate('/list');
    } catch (error) {
      console.error('로그인 실패 : ', error);
      alert('로그인 실패!');
    }
  };

  return (
    <div className="w-full">
      <LoginForm
        username={username}
        password={password}
        onUsernameChange={(e) => setUsername(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onSubmit={handleLogin}
      />
    </div>
  );
};

export default LoginPage;
