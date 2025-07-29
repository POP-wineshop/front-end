import { useSelector } from 'react-redux';
import { selectCartItems, selectCartSelectedItems } from '../selector';
import { useCartItems } from './useCartItems';
import { useCartSelection } from './useCartSelection';
import { useCartQuantity } from './useCartQuantity';
import { useCartOrder } from './useCartOrder';
import { useCartCalculations } from './useCartCalculations';

export const useCart = () => {
  const cartItems = useSelector(selectCartItems);
  const selectedCartItems = useSelector(selectCartSelectedItems);

  // 각 기능별 훅들
  const cartItemsHook = useCartItems();
  const cartSelectionHook = useCartSelection();
  const cartQuantityHook = useCartQuantity();
  const cartOrderHook = useCartOrder();
  const cartCalculationsHook = useCartCalculations();

  return {
    // 계산된 값들
    ...cartCalculationsHook,

    // 액션들
    ...cartItemsHook,
    ...cartSelectionHook,
    ...cartQuantityHook,
    ...cartOrderHook,
  };
};
