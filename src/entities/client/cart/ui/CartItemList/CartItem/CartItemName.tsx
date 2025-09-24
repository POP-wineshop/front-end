const CartItemName = ({ wineName }: { wineName: string }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-left ">
        <span className="cart-item-name-eng text-lg font-montserrat text-gray-600">
          {wineName}
        </span>
        <span className="cart-item-name-kor text-xl font-bold text-[#A83E3E] font-montserrat">
          {wineName}
        </span>
      </div>
    </>
  );
};

export default CartItemName;
