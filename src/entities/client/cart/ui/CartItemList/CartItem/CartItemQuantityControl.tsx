const CartItemQuantityControl = ({
  quantity,
  onAddQuantity,
  onSubtractQuantity,
  wineId,
}: {
  quantity: number;
  onAddQuantity: (wineId: number) => void;
  onSubtractQuantity: (wineId: number) => void;
  wineId: number;
}) => {
  return (
    <div className="cart-item-quantity-control flex items-center border rounded-md overflow-hidden">
      <button
        onClick={() => onSubtractQuantity(wineId)}
        className="px-2 py-1 bg-gray-200 hover:bg-gray-300"
      >
        -
      </button>
      <span className="px-4">{quantity}</span>
      <button
        onClick={() => onAddQuantity(wineId)}
        className="px-2 py-1 bg-gray-200 hover:bg-gray-300"
      >
        +
      </button>
    </div>
  );
};

export default CartItemQuantityControl;
