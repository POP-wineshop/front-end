import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

export function WidgetSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [responseData, setResponseData] = useState<any>(null);
  const hasCalled = useRef(false);

  useEffect(() => {
    async function confirm() {
      const requestData = {
        orderId: searchParams.get('orderId'),
        amount: searchParams.get('amount'),
        paymentKey: searchParams.get('paymentKey'),
      };

      console.log('requestData: ', requestData);

      try {
        const response = await fetch(
          `http://localhost:8080/api/payments/confirm`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${localStorage.getItem('Access Token')}`,
            },
            body: JSON.stringify(requestData),
          }
        );

        const resText = await response.text();
        let json;
        try {
          json = JSON.parse(resText);
        } catch (e) {
          console.error('⚠️ JSON 파싱 실패. 원문:', resText);
          throw {
            message: '응답이 비어있거나 JSON 형식이 아님',
            code: response.status,
          };
        }

        if (!response.ok) {
          throw { message: json.message, code: json.code };
        }

        setResponseData(json);
        alert('결제 확인 화면으로 이동합니다');
        navigate('/');
      } catch (error: any) {
        navigate(
          `/tosspayments/fail?code=${error.code}&message=${error.message}`
        );
      }
    }

    if (hasCalled.current) return;
    hasCalled.current = true;
    confirm();
  }, []);

  return (
    <div className="wrapper mx-auto max-w-[500px] font-pretendard">
      <div className="mx-auto bg-white rounded-2xl shadow-md p-6 flex flex-col items-center gap-6">
        <img
          src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
          alt="결제 완료"
          className="w-[100px]"
        />
        <h2 className="text-xl font-semibold text-center">결제를 완료했어요</h2>

        <div className="w-full text-base mt-4 border-t border-gray-200 pt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">결제금액</span>
            <span
              id="amount"
              className="text-gray-800 font-semibold text-right"
            >
              {`${Number(searchParams.get('amount')).toLocaleString()}원`}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-600 font-medium">주문번호</span>
            <span
              className="pl-4 text-gray-800 text-sm text-right"
              id="orderId"
            >
              {searchParams.get('orderId')}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-600 font-medium">PaymentKey</span>
            <span
              className="text-gray-800 text-sm break-words text-right"
              id="paymentKey"
            >
              {searchParams.get('paymentKey')}
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
        </div>
      </div>

      {responseData && (
        <div className="w-[600px] mx-auto mt-8 p-4 bg-gray-50 rounded-lg shadow-sm text-sm text-gray-800 whitespace-pre-wrap">
          <b className="block mb-2">Response Data :</b>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
