import WineListPage from './pages/WineListPage';
import WineDescriptionPage from './pages/WineDescriptionPage';
import OrderPage from './pages/OrderPage';
import CartPage from './pages/CartPage';

// import WinePostPage from './pages/WinePostPage';

import WineApiTestPage from './pages/WineApiTestPage';

import './App.css';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import BackOfficePage from './pages/backOffice/BackOfficePage';
import WineFilter from './components/common/WineFilter';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';
import TossPaymentPage from './pages/tossPayments/TossPaymentPage';

function App() {
  const location = useLocation();
  const shouldShowBackOffice = location.pathname.startsWith(`/backoffice`);
  const shouldShowTossPayments = location.pathname.startsWith(`/tosspayments`);

  const shouldShowWineFilter =
    location.pathname.startsWith(`/list`) ||
    location.pathname.startsWith(`/description`);

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
            {/* <Sidebar /> */}
            <Header />
            {/* {shouldShowWineFilter && <WineFilter />} */}
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
                <Route
                  path="/description/:wineId"
                  element={<WineDescriptionPage />}
                />
                <Route path="/order" element={<OrderPage />} />
                <Route path="/cart" element={<CartPage />} />
                {/* <Route path="/checkout" element={<TossPaymentPage />} /> */}
                {/* <Route path="/post" element={<WinePostPage />} /> */}
                {/* <Route path="/apitest" element={<WineApiTestPage />} /> */}
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
