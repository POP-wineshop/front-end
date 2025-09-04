import { RootState } from '@/shared/store';
import { LikesWineItemExample } from './likesInfoTypes';

// 좋아요 아이템 리스트 전체 선택자
export const selectLikesItemList = (state: RootState): LikesWineItemExample[] =>
  state.likesInfo.likesItems;

// 특정 좋아요 아이템 id로 선택
export const selectLikesWineItemById = (
  state: RootState,
  id: number
): LikesWineItemExample | undefined =>
  state.likesInfo.likesItems.find(
    (item: LikesWineItemExample) => item.id === id
  );
