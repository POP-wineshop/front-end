import { useSelector } from 'react-redux';
import { OrderDataRes, OrderWineItem, selectOrder } from '../model';
import { OrderItem } from './orderItemList/OrderItem';

const OrderItemList = () => {
  const orderInfo = useSelector(selectOrder) as OrderDataRes;
  // 얘도 굳이 전역변수화 안해도 될 거 같은데?

  return (
    <div className="order-items-container w-full">
      {/* 주문 진행 중인 상품 목록의 데이터 형태에 따라 달라짐 */}
      <div className="cart-items-container border-t border-b border-[#E4E7EC] divide-y divide-[#E4E7EC]">
        {orderInfo?.orderItems ? (
          orderInfo.orderItems.map((item: OrderWineItem) => (
            <OrderItem key={item.wineId} {...item} />
          ))
        ) : (
          <div className="bg-white/80 p-12 text-center">
            <p className="text-gray-400 text-lg font-montserrat">
              로딩 중입니다...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderItemList;
