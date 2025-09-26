import * as ReactDom from 'react-dom';
import * as React from 'react';

(window as any).React2 = React;
console.log(
  'React1 === React2:',
  (window as any).React1 === (window as any).React2
);

import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';

import Header from './entities/client/common/ui/Header';
import Footer from './entities/client/common/ui/Footer';

import LoginPage from './pages/client/user/LoginPage';
import SignupPage from './pages/client/user/SignupPage';
import MyPage from './pages/MyPage';

import WineListPage from './pages/client/wine/WineListPage';
import WineInfoPage from './pages/client/wine/WineInfoPage';
import OrderPage from './pages/OrderPage';
import CartPage from './pages/client/cart/CartPage';

import BackOfficePage from './pages/backOffice/BackOfficePage';
import TossPaymentPage from './pages/tossPayments/TossPaymentPage';

// import WineApiTestPage from './pages/WineApiTestPage';
// import WinePostPage from './pages/WinePostPage';

function App() {
  const location = useLocation();
  const shouldShowBackOffice = location.pathname.startsWith(`/backoffice`);
  const shouldShowTossPayments = location.pathname.startsWith(`/tosspayments`);
  const shouldShowWineFilter = location.pathname.startsWith(`/list`);

  return (
    <>
      <div className={`${!shouldShowBackOffice ? 'background-wrapper' : ''}`}>
        {shouldShowBackOffice ? (
          <div className="backOffice-layout font-pretendard">
            <Routes>
              <Route path="/backoffice/*" element={<BackOfficePage />} />
            </Routes>
          </div>
        ) : shouldShowTossPayments ? (
          <div className="tossPayments-layout">
            <Routes>
              <Route path="/tosspayments/*" element={<TossPaymentPage />} />
            </Routes>
          </div>
        ) : (
          <div className="service-page-layout">
            <Header />
            <main
              className="main-layout flex justify-center items-center"
              style={{ minHeight: `calc(100vh - 289px)` }}
            >
              <Routes>
                <Route index element={<Navigate to="list" />} />

                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/mypage/*" element={<MyPage />} />

                <Route path="/list" element={<WineListPage />} />
                <Route path="/list/:wineId" element={<WineInfoPage />} />

                <Route path="/cart" element={<CartPage />} />
                <Route path="/order" element={<OrderPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
