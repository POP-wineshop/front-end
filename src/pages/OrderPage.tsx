import { OrderItem } from '../components/order/OrderItem';
import DeliveryInfo from '../components/order/DeliveryInfo';
import PaymentMethod from '../components/order/PaymentMethod';
import OrderPayment from '../components/order/OrderPayment';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type OrderingWineItem = {
  wineId: number;
  wineNameKor: string;
  winePrice: number;
  orderedQuantity: number;
  orderedPrice: number;
  wineImageUrl: string;
};

interface OrderInfo {
  orderId: number;
  tossOrderId: string;
  orderStatus: string;
  orderItems: OrderingWineItem[];
  totalPrice: number;
}

const OrderPage = () => {
  const location = useLocation();
  const orderId = location.state.orderId;

  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>();

  useEffect(() => {
    fetch(`http://localhost:8080/api/orders/${orderId}`, {
      headers: {
        Authorization: `${localStorage.getItem('Access Token')}`,
      },
    })
      .then((res) => res.json())
      .then((jsonRes) => {
        const orderInfo = jsonRes.data;
        setOrderInfo(orderInfo);
        console.log(`주문 불러오기 성공 : `, jsonRes);
        alert(`주문 불러오기 성공!`);
      })
      .catch((err) => {
        console.error(`주문 불러오기 실패 ㅠ`, err);
        alert(`주문 불러오기 실패 ㅠ : ${err}`);
      });
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-[800px]">
        <div className="items-left py-16 w-full flex flex-col items-start relative">
          <div className="flex items-center gap-4">
            <span className="order-page-title font-mapodacapo text-[48px] font-bold italic drop-shadow-lg">
              Order
            </span>
          </div>
        </div>

        <div className="order-page-container flex flex-col gap-8 pb-16">
          <div className="order-items-container w-full">
            {/* 주문 진행 중인 상품 목록의 데이터 형태에 따라 달라짐 */}
            <div className="cart-items-container border-t border-b border-[#E4E7EC] divide-y divide-[#E4E7EC]">
              {orderInfo?.orderItems ? (
                orderInfo.orderItems.map(
                  (orderingWineItem: OrderingWineItem) => (
                    <OrderItem
                      key={orderingWineItem.wineId}
                      orderingWineItem={orderingWineItem}
                    />
                  )
                )
              ) : (
                <div className="bg-white/80 p-12 text-center">
                  <p className="text-gray-400 text-lg font-montserrat">
                    로딩 중입니다...
                  </p>
                </div>
              )}
            </div>
          </div>

          <DeliveryInfo />

          {orderInfo ? (
            <OrderPayment orderInfo={orderInfo} />
          ) : (
            <div className="bg-white/80 p-12 text-center">
              <p className="text-gray-400 text-lg font-montserrat">
                로딩 중입니다...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
