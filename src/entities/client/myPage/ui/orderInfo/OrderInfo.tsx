import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Order, OrderItem } from '../../model/orderInfo/orderInfoTypes';
import { useDispatch } from 'react-redux';
import {
  handleRequestOrderCancel,
  readUserOrders,
} from '../../api/orderInfo/orderInfoApi';

const orderInfo = () => {
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState<Order[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readUserOrders());
  }, [dispatch]);

  return (
    <div className="flex flex-col space-y-6">
      {orderList.length > 0 ? (
        orderList.map((order) => (
          <div
            key={order.orderId}
            className="bg-white/80 rounded-2xl shadow-md p-6 space-y-4 "
          >
            {/* 주문 정보 바 */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-wrap justify-evenly items-center divide-x divide-gray-300">
                <span className="pr-4 text-[#A83E3E] font-bold text-base md:text-lg">
                  No. {order.orderId}
                </span>
                <span className="px-4 text-gray-700 font-bold text-sm md:text-base">
                  2025-XX-XX XX:XX:XX
                </span>
                <span className="px-4 text-gray-700 font-bold text-sm md:text-base">
                  ₩ {order.totalPrice.toLocaleString()}
                </span>
                <span className="px-4 text-gray-700 font-bold text-sm md:text-base">
                  <span className="font-bold">{order.orderStatus}</span>
                </span>
              </div>
              <button
                className="bg-red-400 text-white font-bold rounded-lg px-4 py-2 hover:bg-red-600 transition whitespace-nowrap"
                onClick={(e) => handleRequestOrderCancel(e, order.orderId)}
              >
                취소 요청
              </button>
            </div>

            {/* 주문 상품 테이블 */}
            <div className="overflow-x-auto">
              <table className="table-fixed w-full text-sm font-montserrat">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-1 w-16">이미지</th>
                    <th className="text-left py-1 w-1/2">상품명</th>
                    <th className="text-center py-1 w-16">수량</th>
                    <th className="text-right py-1 w-24">가격</th>
                    <th className="text-right py-1 w-24">합계</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItems.map((item) => (
                    <tr key={item.wineId} className="border-b">
                      <td className="py-1">
                        <img
                          src={item.wineImageUrl}
                          alt={item.wineNameKor}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </td>
                      <td
                        className="py-1 max-w-[120px] truncate cursor-pointer hover:whitespace-normal hover:bg-gray-100 hover:rounded"
                        onClick={() => {
                          navigate(`/description/${item.wineId}`, {
                            state: { id: `${item.wineId}` },
                          });
                        }}
                        title={item.wineNameKor}
                      >
                        {item.wineNameKor}
                      </td>
                      <td className="text-center py-1">
                        {item.orderedQuantity}
                      </td>
                      <td className="text-right py-1">
                        ₩ {item.winePrice.toLocaleString()}
                      </td>
                      <td className="text-right py-1 font-bold">
                        ₩ {item.orderedPrice.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-400 py-12">주문 내역이 없습니다.</p>
      )}
    </div>
  );
};

export default orderInfo;
