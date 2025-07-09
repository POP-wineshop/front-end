import { useEffect, useState } from 'react';
import {
  Navigate,
  NavLink,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import UserInfo from '@/components/myPage/userInfo/UserInfo';
import OrderInfo from '@/components/myPage/orderInfo/OrderInfo';
import AddressInfo from '@/components/myPage/addressInfo/AddressInfo';
import LikesInfo from '@/components/myPage/likesInfo/LikesInfo';

type OrderItem = {
  wineId: number;
  wineNameKor: string;
  winePrice: number;
  orderedQuantity: number;
  orderedPrice: number;
  wineImageUrl: string;
};

type Order = {
  orderId: number;
  orderStatus: string;
  orderItems: OrderItem[];
  totalPrice: number;

  // 주문 일시 추가 시 불러오기
  orderDate: string;
};

const MyPage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    id: 'testuser01',
    name: '김예시',
    email: 'testuseremail@example.com',
    phoneNumber: '010-XXXX-XXXX',
  });
  const [isEmailOnUpdate, setIsEmailOnUpdate] = useState<boolean>(false);
  const [orderList, setOrderList] = useState<Order[]>([]);

  useEffect(() => {
    // 주문 목록 조회 API 호출
    fetch(`http://localhost:8080/api/orders/my`, {
      headers: {
        Authorization: `${localStorage.getItem('Access Token')}`,
      },
    })
      .then((res) => res.json())
      .then((jsonRes) => {
        setOrderList(jsonRes.data);
      });
  }, []);

  // 주문 취소 API 호출
  const handleRequestOrderCancel = (
    e: React.MouseEvent<HTMLButtonElement>,
    orderId: number
  ) => {
    e.stopPropagation();
    fetch(`http://localhost:8080/api/orders/${orderId}/cancel`, {
      method: 'DELETE',
      headers: {
        Authorization: `${localStorage.getItem('Access Token')}`,
      },
    })
      .then((res) => res.json())
      .then((jsonRes) => console.log(`주문 취소 요청 성공: ${jsonRes}`))
      .catch((err) => {
        console.error(`주문 취소 요청 실패: ${err}`);
        alert(`주문 취소 요청 실패 ㅠ: ${err}`);
      });
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-[800px]">
        <div className="py-20">
          <span className="text-[48px] font-bold italic">My Page</span>
        </div>

        {/* 추후 경로 모듈화 통해서 리팩토링 */}
        {/* // src/constants/routes.ts
        export const ROUTES = {
          MYPAGE: '/mypage',
          USER_INFO: '/mypage/user',
          ORDER_INFO: '/mypage/order',
          ADDRESS_INFO: '/mypage/address',
          LIKES_INFO: '/mypage/likes',
        }; */}

        <div className="my-page-tab">
          <div className="flex ">
            <NavLink
              to="/mypage/user"
              className={({ isActive }) =>
                [
                  'px-4 py-1 border-b cursor-pointer',
                  isActive
                    ? 'font-semibold text-gray-800 shadow-sm bg-gray-100'
                    : 'text-gray-500 hover:font-semibold hover:text-gray-800 hover:shadow-sm hover:bg-gray-100',
                ].join(' ')
              }
            >
              회원 정보
            </NavLink>
            <NavLink
              to="/mypage/order"
              className={({ isActive }) =>
                [
                  'px-4 py-1 border-b cursor-pointer',
                  isActive
                    ? 'font-semibold text-gray-800 shadow-sm bg-gray-100'
                    : 'text-gray-500 hover:font-semibold hover:text-gray-800 hover:shadow-sm hover:bg-gray-100',
                ].join(' ')
              }
            >
              주문 내역
            </NavLink>
            <NavLink
              to="/mypage/address"
              className={({ isActive }) =>
                [
                  'px-4 py-1 border-b cursor-pointer',
                  isActive
                    ? 'font-semibold text-gray-800 shadow-sm bg-gray-100'
                    : 'text-gray-500 hover:font-semibold hover:text-gray-800 hover:shadow-sm hover:bg-gray-100',
                ].join(' ')
              }
            >
              배송지 목록
            </NavLink>
            <NavLink
              to="/mypage/likes"
              className={({ isActive }) =>
                [
                  'px-4 py-1 border-b cursor-pointer',
                  isActive
                    ? 'font-semibold text-gray-800 shadow-sm bg-gray-100'
                    : 'text-gray-500 hover:font-semibold hover:text-gray-800 hover:shadow-sm hover:bg-gray-100',
                ].join(' ')
              }
            >
              좋아요 목록
            </NavLink>

            {/* <div className="px-4 py-1 border-b text-gray-500 hover:font-semibold hover:text-gray-800 hover:shadow-sm hover:bg-gray-100 cursor-pointer">
              회원 정보
            </div>
            <div className="px-4 py-1 border-b text-gray-500 hover:font-semibold hover:text-gray-800 hover:shadow-sm hover:bg-gray-100 cursor-pointer">
              주문 내역
            </div>
            <div className="px-4 py-1 border-b text-gray-500 hover:font-semibold hover:text-gray-800 hover:shadow-sm hover:bg-gray-100 cursor-pointer">
              배송지 목록
            </div>
            <div className="px-4 py-1 border-b text-gray-500 hover:font-semibold hover:text-gray-800 hover:shadow-sm hover:bg-gray-100 cursor-pointer">
              좋아요 목록
            </div> */}
          </div>
        </div>

        <div className="flex flex-col space-y-6 p-6">
          <Routes>
            <Route index element={<Navigate to="user" />} />
            <Route path="user" element={<UserInfo />} />
            <Route path="order" element={<OrderInfo />} />
            <Route path="address" element={<AddressInfo />} />
            <Route path="likes" element={<LikesInfo />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
