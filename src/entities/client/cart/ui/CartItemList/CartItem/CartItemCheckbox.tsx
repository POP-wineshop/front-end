const CartItemCheckbox = ({
  selected,
  onSelect,
}: {
  selected: boolean;
  onSelect: () => void;
}) => {
  return (
    <input
      type="checkbox"
      checked={selected}
      onChange={() => onSelect()}
      className="w-4 h-4 accent-[#A83E3E] border-gray-300 rounded focus:ring-[#A83E3E] focus:ring-2"
    />
  );
};

export default CartItemCheckbox;
