const CartItemImage = ({
  imageUrl,
  wineName,
}: {
  imageUrl: string;
  wineName: string;
}) => {
  return (
    <div className="w-[180px] h-60 border border-[#E4E7EC] rounded-lg m-3 flex-shrink-0 bg-gray-50">
      <img
        src={imageUrl}
        alt={wineName}
        // TODO: 추후 와인 이름 받아오는 걸로 바꾸기
        className="object-cover w-full h-full rounded-lg"
      />
    </div>
  );
};

export default CartItemImage;
