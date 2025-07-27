import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [pwForConfirming, setPwForConfirming] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const navigate = useNavigate();

  const handleSignup = () => {
    fetch('http://localhost:8080/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((jsonResponse) => {
        console.log(`회원가입 성공 : `, jsonResponse);
        alert(`회원가입 성공!`);
        navigate('/login');
      })
      .catch((error) => {
        console.error(`회원가입 실패 : `, error);
        alert('회원가입에 실패했습니다');
      });
  };

  return (
    <>
      <div
        className="m-auto w-full py-32"
        // 스크린 높이 - 헤더 높이 (120px)
        // style={{ minHeight: 'calc(100vh - 120px)' }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignup();
          }}
          className="mx-auto flex flex-col gap-4 w-full max-w-md min-w-[400px] p-8 bg-white rounded-xl shadow-md"
        >
          <p className="font-mapodacapo italic text-3xl font-bold text-center mb-4">
            Sign Up
          </p>

          <div>
            <label
              htmlFor="username"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              아이디
            </label>
            <div className="flex gap-2 justify-between items-center">
              <input
                id="username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="아이디를 입력해주세요"
                className="w-full p-2 border border-[#D4D4D4] rounded-md focus:outline-none focus:ring focus:ring-1 focus:ring-[#6A1B1A]"
              />
              <button className="w-1/4 px-4 py-2 border border-[#6A1B1A] rounded-md bg-[#6A1B1A] text-white whitespace-nowrap hover:bg-[#8B2E2E] hover:border-[#8B2E2E] transition-colors duration-150">
                <span>중복 확인</span>
              </button>
            </div>
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

          <div>
            <label
              htmlFor="pwForConfirming"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              비밀번호 확인
            </label>
            <input
              id="pwForConfirming"
              type="password"
              onChange={(e) => setPwForConfirming(e.target.value)}
              placeholder="비밀번호를 다시 입력해주세요"
              className="w-full p-2 border border-[#D4D4D4] rounded-md focus:outline-none focus:ring focus:ring-1 focus:ring-[#6A1B1A]"
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              사용자 이름
            </label>
            <input
              id="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력해주세요"
              className="w-full p-2 border border-[#D4D4D4] rounded-md focus:outline-none focus:ring focus:ring-1 focus:ring-[#6A1B1A]"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              이메일 주소
            </label>
            <div className="flex gap-2 justify-between items-center">
              <input
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="메일 주소를 입력해주세요"
                className="w-full p-2 border border-[#D4D4D4] rounded-md focus:outline-none focus:ring focus:ring-1 focus:ring-[#6A1B1A]"
              />
              <button className="w-1/4 px-4 py-2 border border-[#6A1B1A] rounded-md bg-[#6A1B1A] text-white whitespace-nowrap hover:bg-[#8B2E2E] hover:border-[#8B2E2E] transition-colors duration-150">
                <span>중복 확인</span>
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              전화번호
            </label>

            <div className="flex gap-2 justify-between items-center">
              <input
                id="phone"
                type="tel"
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="전화번호를 입력해주세요"
                className="w-full p-2 border border-[#D4D4D4] rounded-md focus:outline-none focus:ring focus:ring-1 focus:ring-[#6A1B1A]"
              />
              <button className="w-1/4 px-4 py-2 border border-[#6A1B1A] rounded-md bg-[#6A1B1A] text-white whitespace-nowrap hover:bg-[#8B2E2E] hover:border-[#8B2E2E] transition-colors duration-150">
                <span>중복 확인</span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 py-2 bg-[#6A1B1A] text-white font-semibold rounded-md hover:bg-[#4E1212] transition"
          >
            회원 가입
          </button>
          <div className="text-center">
            <span className="text-sm text-gray-600">
              이미 계정이 있으신가요?{' '}
            </span>
            <Link
              to="/login"
              className="text-sm text-[#6A1B1A] hover:underline font-medium"
            >
              로그인
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignupPage;
