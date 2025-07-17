import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WineFilter from './WineFilter';

const Header = () => {
  const [userName, setUserName] = useState<string>('XXX');
  const navigate = useNavigate();

  // 로그아웃 API 필요
  const handleLogout = () => {
    localStorage.clear();
    alert('로그아웃 되었습니다.');
  };

  return (
    <header className="relative w-full flex items-center justify-between px-12 py-4 bg-[#7a2229] shadow-sm border-b sticky top-0 z-20">
      <div className="w-[400px] flex justify-start items-center gap-6">
        {/* <img
          className="w-16 h-16 rounded-xl hover:scale-105 cursor-pointer transition"
          src="src/assets/logo/logo-Image.png"
          alt="로고 이미지"
          onClick={() => navigate(`/list`)}
        /> */}
        <span
          onClick={() => navigate('/list')}
          className="font-mapodacapo text-[64px] text-white font-semibold italic cursor-pointer hover:text-[#A83E3E] transition"
        >
          WINEHALLE
        </span>
      </div>
      <WineFilter />
      <nav>
        <ul className="w-[400px] flex justify-end items-center gap-8 font-mapodacapo italic text-white text-[24px] font-medium whitespace-nowrap">
          {!localStorage.getItem('Access Token') ? (
            <>
              <li
                onClick={() => navigate(`/login`)}
                className="cursor-pointer hover:text-[#A83E3E] transition"
              >
                Login
              </li>
              <li
                onClick={() => navigate(`/signup`)}
                className="cursor-pointer hover:text-[#A83E3E] transition"
              >
                Sign Up
              </li>
            </>
          ) : (
            <>
              <li
                onClick={() => navigate(`/mypage`)}
                className="cursor-pointer hover:text-[#A83E3E] transition"
              >
                My Page
              </li>
              <li
                onClick={() => navigate(`/cart`)}
                className="cursor-pointer hover:text-[#A83E3E] transition"
              >
                Cart
              </li>
              <li
                onClick={() => {
                  handleLogout();
                  navigate(`/list`);
                }}
                className="cursor-pointer hover:text-[#A83E3E] transition"
              >
                Logout
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
