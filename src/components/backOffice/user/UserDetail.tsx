// UserDetail.tsx
import { mockUserList } from '@/constants/backOffice/user/mockUserList';
import { Order, UserItemType } from '@/types/backOffice/user/user';
import React from 'react';

const UserDetail = ({ user }: { user: UserItemType }) => {
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
            <th className="p-2 bg-[#18181b] text-white" colSpan={4}>
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

      {/* UserDetail.tsx 내 배송지 목록 테이블 추가 부분 */}
      {user.addresses && user.addresses.length > 0 && (
        <table className="w-full border-collapse text-sm mb-8">
          <colgroup>
            <col className="w-[100px]" />
            <col className="max-w-full" />
            <col className="w-[100px]" />
            <col className="max-w-full" />
          </colgroup>
          <tbody>
            <tr>
              <th className="p-2 bg-[#18181b] text-white" colSpan={4}>
                배송지 목록
              </th>
            </tr>
            {user.addresses.map((addr) => (
              // React Fragment 사용, key는 addr.id로!
              <React.Fragment key={addr.id}>
                <tr>
                  <th className="p-2 bg-gray-100 w-20 whitespace-nowrap">
                    수령인
                  </th>
                  <td className="p-2 text-center">{addr.recipient}</td>
                  <th className="p-2 bg-gray-100 w-20 whitespace-nowrap">
                    연락처
                  </th>
                  <td className="p-2 text-center">{addr.phone}</td>
                </tr>
                <tr>
                  <th className="p-2 bg-gray-100 whitespace-nowrap">주소</th>
                  <td className="p-2 text-center" colSpan={3}>
                    {addr.address} {addr.detailAddress}
                  </td>
                </tr>
                <tr>
                  <th className="p-2 bg-gray-100 whitespace-nowrap">
                    배송메시지
                  </th>
                  <td className="p-2 text-center" colSpan={3}>
                    {addr.deliveryMessage || '-'}
                  </td>
                </tr>
                <tr>
                  <th className="p-2 bg-gray-100 whitespace-nowrap">상태</th>
                  <td className="p-2 text-center" colSpan={3}>
                    {addr.isDefault && (
                      <span className="bg-black text-white px-2 py-1 rounded mr-1 text-xs">
                        기본
                      </span>
                    )}
                    {addr.isRecent && (
                      <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
                        최근
                      </span>
                    )}
                  </td>
                </tr>
                {/* 각 배송지 구분선 */}
                <tr>
                  <td colSpan={4}>
                    <div className="border-b my-2" />
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}

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
            <th className="p-2 bg-[#18181b] text-white" colSpan={4}>
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
