// 수량을 1 감소시키는 함수
// quantity: 현재 수량
// setQuantity: 수량 상태를 변경하는 함수 (arg0는 새로운 수량 값)
export const substractQuantity = (
  quantity: number,
  setQuantity: (arg0: number) => void
) => {
  if (quantity >= 2) {
    return setQuantity(quantity - 1);
  } else {
    alert('1 이하로는 수량을 줄일 수 없습니다.');
    return null;
  }
};

// 수량을 1 증가시키는 함수
// quantity: 현재 수량
// setQuantity: 수량 상태를 변경하는 함수 (arg0는 새로운 수량 값)
export const addQuantity = (
  quantity: number,
  setQuantity: (arg0: number) => void
) => {
  return setQuantity(quantity + 1);
};
