// UserDetail.tsx
import { mockUserList } from '@/constants/backOffice/user/mockUserList';

interface Order {
  orderNumber: string;
  totalPayment: number;
  orderDate: string;
  status: string;
}

interface UserItem {
  id: number;
  userId: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  createdAt: string;
  status: string;
  orders?: Order[];
}

const UserDetail = ({ user }: { user: UserItem }) => {
  if (!user) return null;

  return (
    <div className="w-full h-full max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 border">
      {/* 회원 정보 */}
      <table className="w-full border-collapse text-sm table-fixed mb-8">
        <colgroup>
          <col style={{ width: '15%' }} />
          <col style={{ width: '35%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '35%' }} />
        </colgroup>
        <tbody>
          <tr>
            <th className="p-2 bg-gray-100" colSpan={4}>
              회원 정보
            </th>
          </tr>
          <tr>
            <th className="p-2 bg-gray-100">아이디</th>
            <td
              className="text-center p-2 truncate overflow-hidden whitespace-nowrap max-w-[200px]"
              title={user.userId}
            >
              {user.userId}
            </td>
            <th className="p-2 bg-gray-100">이름</th>
            <td
              className="text-center p-2 truncate overflow-hidden whitespace-nowrap max-w-[200px]"
              title={user.name}
            >
              {user.name}
            </td>
          </tr>
          <tr>
            <th className="p-2 bg-gray-100">이메일</th>
            <td
              className="text-center p-2 truncate overflow-hidden whitespace-nowrap max-w-[200px]"
              title={user.email}
            >
              {user.email}
            </td>
            <th className="p-2 bg-gray-100">전화번호</th>
            <td
              className="text-center p-2 truncate overflow-hidden whitespace-nowrap max-w-[120px]"
              title={user.phone}
            >
              {user.phone}
            </td>
          </tr>
          <tr>
            <th className="p-2 bg-gray-100">권한</th>
            <td className="text-center p-2">{user.role}</td>
            <th className="p-2 bg-gray-100">가입일</th>
            <td className="text-center p-2">{user.createdAt}</td>
          </tr>
        </tbody>
      </table>

      {/* 주문 내역 */}
      <table className="w-full border-collapse text-sm table-fixed">
        <colgroup>
          <col style={{ width: '25%' }} />
          <col style={{ width: '25%' }} />
          <col style={{ width: '25%' }} />
          <col style={{ width: '25%' }} />
        </colgroup>
        <tbody>
          <tr>
            <th className="p-2 bg-gray-100" colSpan={4}>
              주문 내역
            </th>
          </tr>
          <tr>
            <th className="p-2 bg-gray-100">주문 번호</th>
            <th className="p-2 bg-gray-100">주문 금액</th>
            <th className="p-2 bg-gray-100">주문 일시</th>
            <th className="p-2 bg-gray-100">주문 상태</th>
          </tr>
          {user.orders && user.orders.length > 0 ? (
            user.orders.map((order, i) => (
              <tr className="border-b" key={order.orderNumber}>
                <td
                  className="text-center p-2 truncate overflow-hidden whitespace-nowrap max-w-[110px]"
                  title={order.orderNumber}
                >
                  {order.orderNumber}
                </td>
                <td className="text-center p-2">
                  ₩{order.totalPayment.toLocaleString()}
                </td>
                <td
                  className="text-center p-2 truncate overflow-hidden whitespace-nowrap max-w-[90px]"
                  title={order.orderDate}
                >
                  {order.orderDate}
                </td>
                <td className="text-center p-2">{order.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="p-2 text-center" colSpan={4}>
                주문 내역이 없습니다
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// 예시로 직접 렌더링할 경우 아래처럼 사용 가능
// <UserDetail user={sampleUserItemData} />

export default UserDetail;
