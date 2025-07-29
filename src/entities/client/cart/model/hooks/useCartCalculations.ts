import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartSelectedItems } from '../selector';
import { CartItemData } from '../cartTypes';

export const useCartCalculations = () => {
  const cartItems = useSelector(selectCartItems);
  const selectedCartItems = useSelector(selectCartSelectedItems);

  // 할인 금액 (추후 확장 가능)
  const discountAmount = 0;

  // 전체 상품 기준
  const all = useMemo(() => {
    const productsPrice = cartItems.reduce(
      (total, item) => total + item.winePrice * item.quantity,
      0
    );
    const deliveryFee = productsPrice >= 50000 ? 0 : 3000;
    const totalPaymentPrice = productsPrice + deliveryFee - discountAmount;
    return { productsPrice, deliveryFee, totalPaymentPrice };
  }, [cartItems]);

  // 선택 상품 기준
  const selected = useMemo(() => {
    const productsPrice = selectedCartItems.reduce(
      (total, item) => total + item.winePrice * item.quantity,
      0
    );
    const deliveryFee = productsPrice >= 50000 ? 0 : 3000;
    const totalPaymentPrice = productsPrice + deliveryFee - discountAmount;
    return { productsPrice, deliveryFee, totalPaymentPrice };
  }, [selectedCartItems]);

  // 결제 요약 정보 (전체 기준)
  const cartPaymentSummary = useMemo(
    () => [
      { key: '총 상품 금액', value: selected.productsPrice },
      { key: '배송비', value: selected.deliveryFee },
      { key: '할인 / 부가결제', value: discountAmount },
      { key: '총 결제 예정 금액', value: selected.totalPaymentPrice },
    ],
    [selected.productsPrice, selected.deliveryFee, selected.totalPaymentPrice]
  );

  return {
    // 전체 상품 기준
    allProductsPrice: all.productsPrice,
    allDeliveryFee: all.deliveryFee,
    allTotalPaymentPrice: all.totalPaymentPrice,
    // 선택 상품 기준
    selectedProductsPrice: selected.productsPrice,
    selectedDeliveryFee: selected.deliveryFee,
    selectedTotalPaymentPrice: selected.totalPaymentPrice,
    // 요약
    cartPaymentSummary,
    discountAmount,
  };
};
