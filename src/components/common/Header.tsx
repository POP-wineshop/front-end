import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [userName, setUserName] = useState<string>('XXX');
  const navigate = useNavigate();

  // 로그아웃 API 필요
  const handleLogout = () => {
    localStorage.clear();
    alert('로그아웃 되었습니다.');
  };

  return (
    <div className="min-w-[800px] h-[120px] flex items-center justify-between mx-8 border-b">
      <div className="flex items-center gap-8 ">
        <img
          className="w-24 h-24 rounded hover:scale-105 hover:cursor-pointer transition duration-200 ease-in-out shadow-sm"
          src="src/assets/logo/logo-Image.png"
          alt="로고 이미지"
          onClick={() => navigate(`/list`)}
        />
        <strong
          onClick={() => navigate('/list')}
          className="text-[40px] italic transition-all duration-200 ease-in-out cursor-pointer hover:scale-105 hover:text-[#7B0033] hover:drop-shadow-lg"
        >
          WINEHALLE
        </strong>
      </div>
      <div className="flex flex-col gap-1">
        {/* 회원 이름 및 환영 문구 렌더링 (보류) */}
        {/* <div className="flex justify-end items-center gap-2 italic font-light tracking-tight">
          <span className="">SALUTE🍷</span>
          <span className="">{userName}님, 환영합니다!</span>
        </div> */}
        <div className="flex items-end gap-12 font-medium italic text-xl">
          {!localStorage.getItem('Access Token') ? (
            <>
              <span
                onClick={() => navigate(`/login`)}
                className="cursor-pointer transition-all duration-200 ease-in-out cursor-pointer hover:scale-105 hover:text-[#7B0033]"
              >
                Login
              </span>
              <span
                onClick={() => navigate(`/signup`)}
                className="cursor-pointer transition-all duration-200 ease-in-out cursor-pointer hover:scale-105 hover:text-[#7B0033]"
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              <span
                onClick={() => navigate(`/mypage`)}
                className="cursor-pointer transition-all duration-200 ease-in-out cursor-pointer hover:scale-105 hover:text-[#7B0033]"
              >
                My Page
              </span>
              <span
                onClick={() => navigate(`/cart`)}
                className="cursor-pointer transition-all duration-200 ease-in-out cursor-pointer hover:scale-105 hover:text-[#7B0033]"
              >
                Cart
              </span>
              <span
                onClick={() => {
                  handleLogout();
                  navigate(`/list`);
                }}
                className="cursor-pointer transition-all duration-200 ease-in-out cursor-pointer hover:scale-105 hover:text-[#7B0033]"
              >
                Logout
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
