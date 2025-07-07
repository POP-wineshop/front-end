import { useEffect, useState } from 'react';
import {
  loadTossPayments,
  ANONYMOUS,
  TossPaymentsWidgets,
} from '@tosspayments/tosspayments-sdk';
import { useLocation } from 'react-router-dom';

// ✅ 날짜 기반 readable ID (user_xxx용으로만 사용 중)
const today = new Date();
const dateStr = `${today.getFullYear()}${(today.getMonth() + 1)
  .toString()
  .padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}`;
const generateReadableId = (prefix: 'order' | 'user', id: number) =>
  `${dateStr}_${prefix}_${id}`;

const clientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';

export function WidgetCheckout() {
  const location = useLocation();
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);
  const [amount, setAmount] = useState({
    currency: 'KRW',
    value: 0,
  });

  const orderId = location.state?.orderId; // ✅ Toss에 넘길 문자열 주문 ID
  const userId = location.state?.userId;
  const totalPrice = location.state?.totalPrice;

  useEffect(() => {
    async function fetchPaymentWidgets() {
      const tossPayments = await loadTossPayments(clientKey);
      const customerKey = userId
        ? generateReadableId('user', userId)
        : ANONYMOUS;

      const newWidgets = tossPayments.widgets({ customerKey });
      setWidgets(newWidgets);
    }

    fetchPaymentWidgets();
  }, [userId]);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (!widgets || totalPrice == null) return;

      console.log(`[Checkout] 총 결제 금액: ${totalPrice}원`);

      await widgets.setAmount({ ...amount, value: totalPrice });

      await Promise.all([
        widgets.renderPaymentMethods({
          selector: '#payment-method',
          variantKey: 'DEFAULT',
        }),
        widgets.renderAgreement({
          selector: '#agreement',
          variantKey: 'AGREEMENT',
        }),
      ]);

      setReady(true);
    }

    renderPaymentWidgets();
  }, [widgets, totalPrice]);

  const handleRequestPayment = async () => {
    try {
      if (!orderId) {
        alert('❗ 주문 ID(orderId)가 존재하지 않습니다.');
        return;
      }

      await widgets?.requestPayment({
        orderId, // ✅ Toss에 전달될 주문 ID
        orderName: 'Popwine 주문 결제',
        customerName: '김예시',
        customerEmail: 'dilkusha27@gmail.com',
        successUrl: `${window.location.origin}/tosspayments/success`,
        failUrl: `${window.location.origin}/tosspayments/fail`,
      });

      console.log(`[Toss] 결제 요청 완료: orderId=${orderId}`);
    } catch (error) {
      console.error(`[Toss] 결제 요청 실패`, error);
    }
  };

  return (
    <div className="wrapper w-100">
      <div className="w-100">
        <div id="payment-method" className="w-100" />
        <div id="agreement" className="w-100" />
        <div className="btn-wrapper bg-white w-100">
          <button
            className="btn primary mb-6 w-100"
            onClick={handleRequestPayment}
            disabled={!ready}
          >
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
}
