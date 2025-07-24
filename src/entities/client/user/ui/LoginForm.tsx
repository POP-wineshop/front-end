import React from 'react';
import { Link } from 'react-router-dom';

interface LoginFormProps {
  username: string;
  password: string;
  onUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  username,
  password,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
}) => {
  return (
    <div className="w-full">
      <form
        onSubmit={onSubmit}
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
            value={username}
            onChange={onUsernameChange}
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
            value={password}
            onChange={onPasswordChange}
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

export default LoginForm;
