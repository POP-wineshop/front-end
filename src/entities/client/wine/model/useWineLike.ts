import { useDispatch, useSelector } from 'react-redux';
import { selectWineLikeStatus } from './selectors';
import { toggleLike } from './wineSlice';

export default function useWineLike(wineId: number) {
  const dispatch = useDispatch();
  const isLiked = useSelector(selectWineLikeStatus(wineId));

  const handleToggleLike = () => {
    dispatch(toggleLike(wineId));
  };

  return { isLiked, toggleLike: handleToggleLike };
}
