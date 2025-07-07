import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="h-[120px] flex items-center justify-between px-8 py-4 border-b">
      <div className="flex items-center gap-4 ">
        <img
          className="w-20 h-20 rounded hover:scale-105 hover:cursor-pointer transition duration-200 ease-in-out shadow-sm"
          src="src/assets/logo/logo-Image.png"
          alt="로고 이미지"
          onClick={() => navigate(`/list`)}
        />
        <strong
          onClick={() => navigate('/list')}
          className="text-2xl italic transition-all duration-200 ease-in-out cursor-pointer hover:scale-105 hover:text-[#7B0033]"
        >
          WINEHALLE
        </strong>
      </div>
      <div className="flex items-center gap-8 text-lg">
        <span
          onClick={() => navigate(`/mypage`)}
          className="italic cursor-pointer transition-all duration-200 ease-in-out cursor-pointer hover:scale-105 hover:text-[#7B0033]"
        >
          My page
        </span>
        <span
          onClick={() => navigate(`/likes`)}
          className="italic cursor-pointer transition-all duration-200 ease-in-out cursor-pointer hover:scale-105 hover:text-[#7B0033]"
        >
          Likes
        </span>
        <span
          onClick={() => navigate(`/cart`)}
          className="italic cursor-pointer transition-all duration-200 ease-in-out cursor-pointer hover:scale-105 hover:text-[#7B0033]"
        >
          Cart
        </span>
      </div>
    </div>
  );
};

export default Header;
