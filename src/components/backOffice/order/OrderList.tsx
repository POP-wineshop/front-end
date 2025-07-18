import { OrderRes } from '@/types/backOffice/order/order';

interface OrderListProps {
  orders: OrderRes[];
  onSelect: (order: OrderRes) => void;
  selectedOrder: OrderRes | null;
}

const OrderList = ({ orders, onSelect, selectedOrder }: OrderListProps) => (
  <div className="flex flex-col gap-2">
    <div className="rounded border bg-white px-6 py-2 shadow-sm">
      <table className="w-full text-sm text-gray-700">
        <tbody>
          <tr>
            <th className="px-4 py-1 bg-gray-100">주문자</th>
            <th className="px-4 py-1 bg-gray-100">일시</th>
            <th className="px-4 py-1 bg-gray-100">총금액</th>
            <th className="px-4 py-1 bg-gray-100">상태</th>
          </tr>
          {orders.map((order) => (
            <tr
              key={order.orderNumber}
              onClick={() => onSelect(order)}
              className={`group hover:shadow-md transition cursor-pointer ${
                selectedOrder?.orderNumber === order.orderNumber
                  ? 'border-red-400 ring-2 ring-red-200 bg-red-50'
                  : 'border-gray-200'
              }`}
            >
              <td className="w-[100px] px-4 py-1 text-center">
                {order.customer.name}
              </td>

              <td className="px-4 py-1 text-center">{order.orderDate}</td>
              <td className="w-[160px] px-4 py-1 text-center">
                {order.payment.totalPayment.toLocaleString()}원
              </td>
              <td
                className={`px-4 py-1 text-center ${
                  order.payment.status === 'paid'
                    ? ''
                    : order.payment.status === 'cancelRequested'
                    ? 'text-orange-600 font-semibold'
                    : 'text-red-600 font-semibold'
                }`}
              >
                {order.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
export default OrderList;
