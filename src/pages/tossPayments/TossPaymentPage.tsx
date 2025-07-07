import { Routes, Route } from 'react-router-dom';
import { WidgetCheckout } from '@/pages/tossPayments/widget/WidgetCheckout';
import { WidgetSuccess } from '@/pages/tossPayments/widget/WidgetSuccess';
import { WidgetFail } from '@/pages/tossPayments/widget/WidgetFail';
import '@/styles/tossPayments/TossPaymentPage.css';

export default function TossPaymentPage() {
  return (
    <Routes>
      <Route path="/" element={<WidgetCheckout />} />
      <Route path="success" element={<WidgetSuccess />} />
      <Route path="fail" element={<WidgetFail />} />
    </Routes>
  );
}
