import { Heart, HeartPlus } from 'lucide-react';

interface LikeToggleButtonProps {
  isLiked: boolean;
  onToggle: () => void;
}

const LikeToggleButton = ({ isLiked, onToggle }: LikeToggleButtonProps) => (
  <button
    className="p-2"
    onClick={onToggle}
    title={isLiked ? '클릭 시 좋아요 취소' : '클릭 시 좋아요 추가'}
  >
    {isLiked ? (
      <Heart className="w-6 h-6 stroke-red-500 fill-red-500 transition-colors" />
    ) : (
      <HeartPlus className="w-6 h-6 stroke-black fill-transparent" />
    )}
  </button>
);

export default LikeToggleButton;
