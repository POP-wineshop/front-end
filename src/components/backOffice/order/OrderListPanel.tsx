import { useState } from 'react';
import OrderList from './OrderList';
import OrderDetail from './OrderDetail';
import sampleOrderList from '@/constants/backOffice/order/sampleOrderList';
import { OrderRes } from '@/types/backOffice/order/order';

const OrderListPanel = () => {
  const [selectedOrder, setSelectedOrder] = useState<OrderRes | null>(null);
  const [sortKey, setSortKey] = useState<'date' | 'status' | 'payment'>('date');

  // 정렬/필터 옵션 등 확장 가능
  const sortedOrders = [...sampleOrderList].sort((a, b) => {
    if (sortKey === 'date') return b.orderNumber.localeCompare(a.orderNumber);
    if (sortKey === 'status') return a.status.localeCompare(b.status);
    // ...필요 시 추가
    return 0;
  });

  return (
    <div className="m-auto flex h-[80vh] rounded-xl overflow-hidden shadow-lg border bg-gray-50">
      <div className="border-r bg-white flex flex-col">
        {/* 정렬 옵션바 */}
        <div className="flex gap-4 justify-between items-center py-4 px-10 border-b bg-gray-50">
          <button
            className={`flex items-center gap-1 ${
              sortKey === 'date' ? 'font-bold text-red-500' : ''
            }`}
            onClick={() => setSortKey('date')}
          >
            주문일시 순
          </button>
          <button
            className={`flex items-center gap-1 ${
              sortKey === 'status' ? 'font-bold text-red-500' : ''
            }`}
            onClick={() => setSortKey('status')}
          >
            상태 순
          </button>
          {/* 추후 결제금액 등 옵션 확장 */}
        </div>
        <div className="flex-1 overflow-y-auto p-8">
          <OrderList
            orders={sortedOrders}
            onSelect={setSelectedOrder}
            selectedOrder={selectedOrder}
          />
        </div>
      </div>
      <div className="w-[600px] flex-1 flex items-start justify-center bg-gray-50 p-8 overflow-y-scroll">
        {selectedOrder ? (
          <OrderDetail order={selectedOrder} />
        ) : (
          <div className="m-auto text-gray-400 text-center flex flex-col items-center">
            <span className="text-4xl mb-2">🧾</span>
            <p>주문을 선택하면 상세 정보가 표시됨</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderListPanel;
