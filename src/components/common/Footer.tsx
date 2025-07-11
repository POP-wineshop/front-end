const Footer = () => {
  return (
    <footer className="w-full h-40 border-t border-gray-200 py-6 px-4 text-sm text-gray-600 bg-white">
      <div className="max-w-5xl mx-auto flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-[#6A1B1A]">WINEHALLE</span>
          <div className="flex gap-4 text-xs">
            <a href="/privacy" className="hover:underline">
              개인정보처리방침
            </a>
            <a href="/terms" className="hover:underline">
              이용약관
            </a>
            <a href="/support" className="hover:underline">
              고객센터
            </a>
          </div>
        </div>
        <div className="text-xs leading-relaxed text-gray-500">
          <p>
            (주) 와인할래 | 대표자: 김현수, 차현우 | 사업자등록번호:
            123-45-67890
          </p>
          <p>
            서울특별시 성동구 와인데이로 7, 1층 | 고객센터: 1544-9999 (평일
            09:00 ~ 18:00)
          </p>
        </div>
        <div className="text-center text-xs text-gray-400 mt-2">
          ⓒ WINEHALLE ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
