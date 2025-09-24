const CartItemCostInfo = ({
  winePrice,
  quantity,
}: {
  winePrice: number;
  quantity: number;
}) => {
  const totalCost = winePrice * quantity;
  return (
    <div className="flex flex-col items-end gap-1">
      <p className="text-sm text-gray-600 font-montserrat">
        기본 배송 : [무료] / 개별배송
      </p>
      <span className="text-right text-2xl font-bold text-[#A83E3E] font-montserrat">
        ₩{totalCost.toLocaleString()}
      </span>
    </div>
  );
};

export default CartItemCostInfo;
