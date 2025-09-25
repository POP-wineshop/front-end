import { useSelector } from 'react-redux';
import { selectCartItems, selectCartSelectedItems } from '../selector';

export const useCartCalculations = () => {
  const cartItems = useSelector(selectCartItems);
  const selectedCartItems = useSelector(selectCartSelectedItems);

  // 할인 금액 (추후 확장 가능)
  const discountAmount = 0;

  // 전체 상품 기준
  const allProductsPrice = cartItems.reduce(
    (total, item) => total + item.winePrice * item.quantity,
    0
  );
  const allDeliveryFee = allProductsPrice >= 50000 ? 0 : 3000;
  const allTotalPaymentPrice =
    allProductsPrice + allDeliveryFee - discountAmount;

  // 선택 상품 기준
  const selectedProductsPrice = selectedCartItems.reduce(
    (total, item) => total + item.winePrice * item.quantity,
    0
  );
  const selectedDeliveryFee = selectedProductsPrice >= 50000 ? 0 : 3000;
  const selectedTotalPaymentPrice =
    selectedProductsPrice + selectedDeliveryFee - discountAmount;

  // 결제 요약 정보 (전체 기준)
  const cartPaymentSummary = [
    { key: '총 상품 금액', value: selectedProductsPrice },
    { key: '배송비', value: selectedDeliveryFee },
    { key: '할인 / 부가결제', value: discountAmount },
    { key: '총 결제 예정 금액', value: selectedTotalPaymentPrice },
  ];

  return {
    // 전체 상품 기준
    allProductsPrice,
    allDeliveryFee,
    allTotalPaymentPrice,
    // 선택 상품 기준
    selectedProductsPrice,
    selectedDeliveryFee,
    selectedTotalPaymentPrice,
    // 요약
    cartPaymentSummary,
    discountAmount,
  };
};
