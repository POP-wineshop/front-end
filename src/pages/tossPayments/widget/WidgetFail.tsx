import { Link, useSearchParams } from 'react-router-dom';

export function WidgetFail() {
  const [searchParams] = useSearchParams();

  return (
    <div className="wrapper mx-auto w-[500px] font-pretendard">
      <div className="mx-auto bg-white rounded-2xl shadow-md p-6 flex flex-col items-center gap-6">
        <img
          src="https://static.toss.im/lotties/error-spot-no-loop-space-apng.png"
          alt="결제 실패"
          className="w-[100px]"
        />
        <h2 className="text-xl font-semibold text-red-500">
          결제를 실패했어요
        </h2>

        <div className="w-full text-sm mt-4 border-t border-gray-200 pt-4 space-y-2">
          <div className="flex justify-between gap-4">
            <span className="text-gray-600 font-medium whitespace-nowrap">
              에러 메시지
            </span>
            <span
              id="message"
              className="text-gray-800 font-semibold text-right"
            >
              {searchParams.get('message')}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-600 font-medium">에러 코드</span>
            <span id="code" className="text-gray-800 font-semibold text-right">
              {searchParams.get('code')}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full mt-6">
          <Link to="https://docs.tosspayments.com/guides/v2/payment-widget/integration">
            <button className="w-full py-2 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-50">
              연동 문서
            </button>
          </Link>
          <Link to="https://discord.gg/A4fRFXQhRu">
            <button className="w-full py-2 text-sm font-medium bg-[#e8f3ff] text-[#1b64da] rounded-md hover:bg-[#d6e8ff]">
              실시간 문의
            </button>
          </Link>
          <Link to="/">
            <button className="w-full py-2 text-sm font-medium bg-[#fff3e0] text-[#ef6c00] rounded-md hover:bg-[#ffe0b2]">
              홈 화면으로 이동
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
