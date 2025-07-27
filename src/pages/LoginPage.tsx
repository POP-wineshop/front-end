import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [userId, setUserId] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [accessToken, setAccessToken] = useState<string>('');
  const [refreshToken, setRefreshToken] = useState<string>('');

  const navigate = useNavigate();

  const handleLogin = () => {
    fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json()) // () 빠졌던 부분 수정
      .then((jsonResponse) => {
        console.log(jsonResponse);
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
        console.log(`로그인 성공 : `, jsonResponse);
        alert(`로그인 성공!`);
        navigate('/list');
      })
      .catch((error) => {
        console.error(`로그인 실패 : `, error);
        alert(`로그인 실패!`);
      });
  };

  return (
    <div className="w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        className="m-auto flex flex-col gap-4 w-full max-w-md min-h-[400px] p-8 bg-white rounded-xl shadow-md"
      >
        <p className="font-mapodacapo italic text-3xl font-bold text-center mb-4">
          Login
        </p>

        <div>
          <label
            htmlFor="username"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            아이디
          </label>
          <input
            id="username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="아이디를 입력해주세요"
            className="w-full p-2 border border-[#D4D4D4] rounded-md focus:outline-none focus:ring focus:ring-1 focus:ring-[#6A1B1A]"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해주세요"
            className="w-full p-2 border border-[#D4D4D4] rounded-md focus:outline-none focus:ring focus:ring-1 focus:ring-[#6A1B1A]"
          />
        </div>

        <button
          type="submit"
          className="mt-4 py-2 bg-[#6A1B1A] text-white font-semibold rounded-md hover:bg-[#4E1212] transition"
        >
          로그인
        </button>
        <div className="text-center">
          <span className="text-sm text-gray-600">
            가입된 계정이 없으신가요?{' '}
          </span>
          <Link
            to="/signup"
            className="text-sm text-[#6A1B1A] hover:underline font-medium"
          >
            회원가입
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
