import { use, useEffect, useState } from 'react';

type CartWineItem = {
  cartItemId: number;
  wineName: string;
  quantity: number;
  totalPrice: number;
  wineId: number;
  thumbnail: string;
  winePrice: number;
};

type CartPaymentProps = {
  cartItemList: CartWineItem[];
  selectedCartItemList: CartWineItem[];
  onOrderSelected: () => void;
  onOrderAll: () => void;
  onPatchCartQuantities: () => Promise<Response[]>;
};

type CartPaymentItem = {
  key: string;
  value: number;
};

const CartPayment = ({
  cartItemList,
  selectedCartItemList,
  onOrderSelected,
  onOrderAll,
  onPatchCartQuantities,
}: CartPaymentProps) => {
  const [selectedProductsPrice, setSelectedProductsPrice] = useState<number>(0);
  const [allProductsPrice, setAllProductsPrice] = useState<number>(0);
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  //   const [discount, setDiscount] = useState<number>(0);
  //   const [additionalPayment, setAdditionalPayment] = useState<number>(0);
  const [selectedPaymentPrice, setSelectedPaymentPrice] = useState<number>(
    selectedProductsPrice + deliveryFee
  );
  const [allPaymentPrice, setAllPaymentPrice] = useState<number>(
    selectedProductsPrice + deliveryFee
  );

  const [cartPaymentList, setCartPaymentList] = useState<CartPaymentItem[]>([
    { key: '총 상품 금액', value: 0 },
    { key: '배송비', value: 0 },
    { key: '할인/부가결제', value: 0 },
    { key: '총 결제 예정 금액', value: 0 },
  ]);

  // 선택된 장바구니 아이템 목록이 변경될 때마다 로그 출력
  // useEffect(() => {
  //   console.log('selectedCartItemList:', selectedCartItemList);
  // }, [selectedCartItemList]);

  // function toCurrencyFormat(value: number): string {
  //   return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  // }

  useEffect(() => {
    // let cartItemPrice = 0;
    // selectedCartItemList.forEach((item: CartWineItem) => {
    //   cartItemPrice += item.winePrice * item.quantity;
    // });
    // setSelectedProductsPrice(cartItemPrice);

    const total = selectedCartItemList.reduce(
      (acc, item) => acc + item.winePrice * item.quantity,
      0
    );
    setSelectedProductsPrice(total);
    setSelectedPaymentPrice(total + deliveryFee);
  }, [selectedCartItemList, deliveryFee]);

  useEffect(() => {
    const total = cartItemList.reduce(
      (acc, item) => acc + item.winePrice * item.quantity,
      0
    );
    setAllProductsPrice(total);
    setAllPaymentPrice(total + deliveryFee);
  }, [cartItemList, deliveryFee]);

  useEffect(() => {
    setCartPaymentList([
      { key: '총 상품 금액', value: selectedProductsPrice },
      { key: '배송비', value: deliveryFee },
      { key: '할인/부가결제', value: 0 },
      { key: '총 결제 예정 금액', value: selectedPaymentPrice },
    ]);
  }, [selectedProductsPrice]);

  return (
    <>
      <div className="flex flex-col gap-3 w-full mx-auto">
        <div className="cart-payment-header">
          <p className="text-2xl font-bold">결제 예정 금액</p>
        </div>
        <hr />
        <div className="cart-payment-contents">
          <table className="w-full border-separate border-spacing-y-3">
            <tbody>
              {cartPaymentList.map(({ key, value }) => (
                <tr key={key}>
                  <td className="p-0 text-left w-1/2">
                    <span>{key}</span>
                  </td>
                  <td className="p-0 text-right w-1/2">
                    <span className="font-semibold">
                      {!(
                        key === '총 상품 금액' || key === '총 결제 예정 금액'
                      ) && (value > 0 ? '+' : value < 0 ? '-' : '')}{' '}
                      {value.toLocaleString()}원
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="cart-payment-submit flex gap-2 w-full">
          <button
            className="bg-[#e8e5eb] p-2 w-1/2 rounded-xl font-bold"
            onClick={async () => {
              await onPatchCartQuantities();
              onOrderSelected();
              console.log('selectedCartItemList:', selectedCartItemList);
            }}
          >
            선택 상품 <span>{selectedPaymentPrice.toLocaleString()}</span>원
            결제하러 가기
          </button>
          <button
            className="bg-[#e8e5eb] p-2 w-1/2 rounded-xl font-bold"
            onClick={async () => {
              await onPatchCartQuantities();
              onOrderAll();
            }}
          >
            전체 상품 <span>{allPaymentPrice.toLocaleString()}</span>원 결제하러
            가기
          </button>
        </div>
      </div>
    </>
  );
};

export default CartPayment;
