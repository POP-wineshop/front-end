import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * cn = "class names"의 약자
 * 여러 TailwindCSS 클래스명을 조건부로 합치고, 중복/충돌되는 클래스를 자동으로 정리합니다.
 *
 * 예시:
 *   cn("px-4", isActive && "bg-blue-500", "px-2")
 *   // 결과: "bg-blue-500 px-2" (중복 px-4 제거)
 */
