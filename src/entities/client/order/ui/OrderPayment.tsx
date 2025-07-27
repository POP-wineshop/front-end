import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderResData, selectOrder } from '../model';
import { useSelector } from 'react-redux';

const OrderPayment = () => {
  const navigate = useNavigate();

  const orderInfo = useSelector(selectOrder) as OrderResData;

  const totalProductPrice = orderInfo.totalPrice;
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  //   const [discount, setDiscount] = useState<number>(0);
  //   const [additionalPayment, setAdditionalPayment] = useState<number>(0);
  const totalPaymentPrice = totalProductPrice + deliveryFee;

  const orderPaymentList = [
    { key: '주문상품', value: totalProductPrice },
    { key: '배송비', value: deliveryFee },
    { key: '할인/부가결제', value: 0 },
    { key: '최종 결제 금액', value: totalPaymentPrice },
  ];

  // 숫자를 회계단위로 변환
  // => toLocaleString()으로 해결 가능
  // function toCurrencyFormat(value: number): string {
  //   return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  // }

  return (
    <div className="bg-white/80 rounded-2xl shadow-md p-8 w-full flex flex-col space-y-6">
      <div className="order-payment-info-header">
        <p className="text-2xl font-bold text-[#A83E3E] font-montserrat">
          결제 금액
        </p>
      </div>
      <hr className="border-[#E4E7EC]" />
      <div className="order-payment-contents">
        <table className="w-full border-separate border-spacing-y-3">
          <tbody>
            {orderPaymentList.map(({ key, value }) => (
              <tr key={key}>
                <td className="p-0 text-left w-1/2">
                  <span className="font-montserrat text-gray-700">{key}</span>
                </td>
                <td className="p-0 text-right w-1/2">
                  <span
                    className={`font-semibold font-montserrat ${
                      key === '주문상품' || key === '최종 결제 금액'
                        ? 'text-[#A83E3E] text-lg'
                        : 'text-gray-700'
                    }`}
                  >
                    {!(key === '주문상품' || key === '최종 결제 금액') &&
                      (value > 0 ? '+' : value < 0 ? '-' : '')}{' '}
                    {value.toLocaleString()}원
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="order-payment-submit w-full">
        <button
          onClick={() => {
            navigate('/tosspayments', {
              // 현재 주문 정보에서 userId를 받아오지 않으므로 하드코딩
              state: {
                orderId: orderInfo.orderId,
                // 로그인에서 userId를 받아오지 않으므로 하드코딩
                userId: 4,
                totalPrice: totalPaymentPrice,
              },
            });
          }}
          className="bg-[#A83E3E] text-white p-4 w-full rounded-lg font-bold hover:bg-[#7a2229] transition font-montserrat text-sm"
        >
          <span className="font-bold">
            ₩{totalPaymentPrice.toLocaleString()}
          </span>
          원 결제하기
        </button>
      </div>
    </div>
  );
};

export default OrderPayment;
