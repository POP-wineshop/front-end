import { useState, useEffect } from 'react';
import { LikesWineItemExample } from './likesInfoTypes';

interface UseLikesItemOptions {
  initialItem: LikesWineItemExample;
  isInCart?: boolean;
  isRestockAlarmRegistered?: boolean;
}

export function useLikesItem({
  initialItem,
  isInCart = false,
  isRestockAlarmRegistered = false,
}: UseLikesItemOptions) {
  const [wineId, setWineId] = useState<number>(initialItem.id);
  const [wineNameKor, setWineNameKor] = useState<string>(initialItem.korName);
  const [wineNameEng, setWineNameEng] = useState<string>(initialItem.engName);
  const [likesItemPrice, setLikesItemPrice] = useState<number>(
    initialItem.price
  );
  const [isLiked, setIsLiked] = useState<boolean>(true);
  const [inCart, setInCart] = useState<boolean>(isInCart);
  const [restockAlarm, setRestockAlarm] = useState<boolean>(
    isRestockAlarmRegistered
  );

  useEffect(() => {
    setWineId(initialItem.id);
    setWineNameKor(initialItem.korName);
    setWineNameEng(initialItem.engName);
    setLikesItemPrice(initialItem.price);
  }, [initialItem]);

  const handleCancelLike = () => {
    if (
      isLiked &&
      confirm(`해당 와인을 좋아요 목록에서 제외하시겠습니까? : ${wineNameKor}`)
    ) {
      setIsLiked(false);
      // TODO: fetch 좋아요 삭제 및 목록 갱신
    } else {
      setIsLiked(true);
    }
  };

  const handleAddToCart = () => {
    setInCart(true);
    // TODO: 장바구니 추가 API 호출
  };

  const handleToggleRestockAlarm = () => {
    if (!restockAlarm) {
      alert(`${wineNameKor} 상품 재입고 알림을 신청하였습니다.`);
      setRestockAlarm(true);
      // TODO: 재입고 알림 신청 API 호출
    } else {
      alert(`${wineNameKor} 상품 재입고 알림을 해제하였습니다.`);
      setRestockAlarm(false);
      // TODO: 재입고 알림 해제 API 호출
    }
  };

  return {
    wineId,
    wineNameKor,
    wineNameEng,
    likesItemPrice,
    isLiked,
    inCart,
    restockAlarm,
    handleCancelLike,
    handleAddToCart,
    handleToggleRestockAlarm,
  };
}
