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

const OrderCheckPage = () => {
  const location = useLocation();
  const orderId = location.state.orderId;
  const tossOrderId = location.state.tossOrderId;

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
    <>
      <div className="w-full flex flex-col items-center">
        <div className="w-[800px]">
          <div className="items-left py-16 w-full">
            <span className="order-page-title text-[48px] font-bold italic">
              결제 완료 안내
            </span>
          </div>
          <div className="order-items-container w-full py-8">
            <div className="order-items-header my-3">
              <p className="text-2xl font-bold">주문 상품</p>
            </div>
            {/* 주문 진행 중인 상품 목록의 데이터 형태에 따라 달라짐 */}
            {orderInfo?.orderItems ? (
              orderInfo.orderItems.map((orderingWineItem: OrderingWineItem) => (
                <OrderItem
                  key={orderingWineItem.wineId}
                  orderingWineItem={orderingWineItem}
                />
              ))
            ) : (
              <div>로딩 중입니다...</div>
            )}
          </div>
          <div className="delivery-info-payment-method-container w-full py-8 flex justify-between gap-8">
            <DeliveryInfo />
            <PaymentMethod />
          </div>
          <div className="order-payment-container w-full py-8">
            {orderInfo ? (
              <OrderPayment orderInfo={orderInfo} />
            ) : (
              <div>로딩 중입니다...</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderCheckPage;
