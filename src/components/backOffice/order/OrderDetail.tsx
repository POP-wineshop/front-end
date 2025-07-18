import { OrderRes } from '@/types/backOffice/order/order';
import React, { useState } from 'react';

const OrderDetail = ({ order }: { order: OrderRes }) => {
  if (!order) return null;

  const [orderStatus, setOrderStatus] = useState<string>('paid');

  return (
    <>
      <div className="m-auto orderDetail-container w-full flex flex-col gap-4">
        {/* 주문 식별 정보 */}
        <table className="border border-collapse text-sm">
          <colgroup>
            <col className="w-[120px]" />
            <col className="w-auto" />
          </colgroup>
          <tbody>
            <tr className="bg-[#18181b] text-white">
              <th className="p-2" colSpan={4}>
                주문 식별 정보
              </th>
            </tr>
            <tr>
              <th className="p-2 bg-gray-100">주문 번호</th>
              <td className="text-center p-2">{order.orderNumber}</td>
              <th className="p-2 bg-gray-100">주문 일시</th>
              <td className="text-center p-2">{order.orderDate}</td>
            </tr>
          </tbody>
        </table>

        {/* 주문 상품 */}
        <table className="border border-collapse text-sm w-full">
          <tbody>
            <tr className="bg-[#18181b] text-white">
              <th className="p-2" colSpan={6}>
                주문 상품
              </th>
            </tr>
            {order.items.map((item, idx) => (
              <React.Fragment key={item.id}>
                <tr className="border-gray-300">
                  <th className="p-2 text-white bg-gray-600">{idx + 1}</th>
                  <td className="text-center p-2" colSpan={5}>
                    {item.nameKor}
                  </td>
                </tr>
                <tr className="border-b">
                  <th className="w-[60px] p-2 bg-gray-100">수량</th>
                  <td className="w-[60px] text-center p-2">{item.quantity}</td>
                  <th className="w-[60px] p-2 bg-gray-100">단가</th>
                  <td className="w-[120px] text-center p-2">
                    ₩{item.unitPrice.toLocaleString()}
                  </td>
                  <th className="w-[60px] p-2 bg-gray-100">합계</th>
                  <td className="w-[120px] text-center p-2">
                    ₩{item.totalPrice.toLocaleString()}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {/* 주문자 정보 */}
        <table className="border border-collapse text-sm">
          <colgroup>
            <col className="w-[120px]" />
            <col className="w-[140px]" />
            <col className="w-[120px]" />
            <col className="w-[140px]" />
          </colgroup>
          <tbody>
            <tr className="bg-[#18181b] text-white">
              <th className="p-2" colSpan={4}>
                주문자 정보
              </th>
            </tr>
            <tr>
              <th className="p-2 bg-gray-100">이름</th>
              <td className="text-center p-2">{order.customer.name}</td>
              <th className="p-2 bg-gray-100">연락처</th>
              <td className="text-center p-2">{order.customer.phone}</td>
            </tr>
            <tr>
              <th className="p-2 bg-gray-100">주소</th>
              <td className="text-center p-2 whitespace-nowrap" colSpan={3}>
                [{order.customer.zipCode}] {order.customer.address}
              </td>
            </tr>
            <tr>
              <th className="p-2 bg-gray-100">상세 주소</th>
              <td
                className="text-center text-gray-500 p-2 whitespace-nowrap"
                colSpan={3}
              >
                상세 주소란
              </td>
            </tr>
            <tr>
              <th className="p-2 bg-gray-100">배송 메시지</th>
              <td className="text-center p-2" colSpan={3}>
                {order.customer.message || '없음'}
              </td>
            </tr>
          </tbody>
        </table>

        {/* 결제 정보 */}
        <table className="border border-collapse text-sm">
          <colgroup>
            <col className="w-[120px]" />
            <col className="w-auto" />
            <col className="w-[120px]" />
            <col className="w-auto" />
          </colgroup>
          <tbody>
            <tr className="bg-[#18181b] text-white ">
              <th className="p-2" colSpan={6}>
                결제 정보
              </th>
            </tr>
            <tr>
              <th className="p-2 bg-gray-100">총 상품 금액</th>
              <td className="text-center p-2">
                {order.payment.productTotal.toLocaleString()}원
              </td>
              <th className="p-2 bg-gray-100" rowSpan={3}>
                총 결제 금액
              </th>
              <td className="text-center p-2 font-semibold" rowSpan={3}>
                {order.payment.totalPayment.toLocaleString()}원
              </td>
            </tr>
            <tr>
              <th className="p-2 bg-gray-100">할인</th>
              <td className="text-center p-2">
                {order.payment.discount.toLocaleString()}원
              </td>
            </tr>
            <tr>
              <th className="p-2 bg-gray-100">배송비</th>
              <td className="text-center p-2">
                {order.payment.deliveryFee.toLocaleString()}원
              </td>
            </tr>
            <tr></tr>
            <tr>
              <th className="p-2 bg-gray-100">결제 수단</th>
              <td className="text-center p-2">{order.payment.method}</td>
              <th className="p-2 bg-gray-100">결제 상태</th>

              <td
                className={`text-center p-2 ${
                  order.payment.status === 'paid'
                    ? ''
                    : order.payment.status === 'cancelRequested'
                    ? 'text-orange-500 font-semibold'
                    : 'text-red-600 font-semibold'
                }`}
              >
                {order.payment.status === 'paid'
                  ? '결제 완료'
                  : order.payment.status === 'cancelRequested'
                  ? '취소 요청'
                  : '취소 완료'}
              </td>
            </tr>
            <tr></tr>
            {/* 취소 사유 (조건부) */}
            {order.payment.status !== 'paid' && (
              <tr>
                <th className="p-2 bg-gray-100 text-red-600">취소 사유</th>
                <td
                  className="text-center p-2 font-semibold text-red-600"
                  colSpan={5}
                >
                  {order.payment.cancelReason}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* 버튼 (조건부) */}
        {order.payment.status === 'cancelRequested' && (
          <div className="flex gap-4">
            <button className="w-full bg-red-500 text-white px-4 py-2 rounded">
              취소 확정
            </button>
            <button className="w-full bg-gray-300 px-4 py-2 rounded">
              취소 반려
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderDetail;
