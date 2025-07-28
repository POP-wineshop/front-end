// React 라이브러리 전체를 불러옴. JSX 문법, 컴포넌트, 훅, forwardRef 등 모든 기능 사용 가능
import * as React from 'react';

// 클래스 이름을 조건에 따라 병합하는 유틸 함수 (tailwind-merge나 clsx 기반일 가능성 높음)
import { cn } from '@/lib/utils';

// Card 컴포넌트 정의. forwardRef를 통해 부모가 ref로 이 div DOM에 직접 접근할 수 있도록 함
const Card = React.forwardRef<
  HTMLDivElement, // ref가 연결될 실제 DOM 요소의 타입. 여기선 div임
  React.HTMLAttributes<HTMLDivElement> // 이 컴포넌트에서 허용할 HTML 속성들의 타입. (예: onClick, className 등)
>(
  // props는 구조 분해로 받음. className은 따로 꺼내고 나머지는 모두 ...props로 받음
  ({ className, ...props }, ref) => (
    <div
      ref={ref} // 이 div 요소에 ref를 연결. 외부에서 DOM 제어 가능
      className={cn(
        'rounded-xl border bg-card text-card-foreground shadow', // 기본 Tailwind 스타일
        className // 외부에서 전달한 className이 있으면 병합
      )}
      {...props} // 나머지 props도 모두 전달 (예: onClick, id, style 등)
    />
  )
);

// displayName은 디버깅 도구(React DevTools)에서 컴포넌트 이름을 보기 좋게 설정하는 용도
Card.displayName = 'Card';

// CardHeader 컴포넌트 정의. Card와 동일한 구조지만 header에 특화된 스타일
const CardHeader = React.forwardRef<
  HTMLDivElement, // div 요소에 ref 연결
  React.HTMLAttributes<HTMLDivElement> // div에 들어갈 수 있는 속성 전부 허용
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)} // 세로 정렬(flex-col), 요소 사이 간격 1.5, padding 6
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

// CardTitle: 카드 상단에 제목 표시하는 용도
const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'font-semibold leading-none tracking-tight', // 두꺼운 글씨, 줄 간격 없음, 자간 좁게
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

// CardDescription: 카드 제목 아래 설명 텍스트용
const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)} // 작은 글씨, 희미한 색상 (보통 회색 계열)
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

// CardContent: 카드의 본문 내용 표시 영역
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('p-6 pt-0', className)} // 전체 padding은 6, 상단은 0 (pt는 padding-top)
    {...props}
  />
));
CardContent.displayName = 'CardContent';

// CardFooter: 카드 하단 버튼이나 상태 표시용 footer
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)} // flex 가로 정렬, 수직 중앙정렬, padding 6, 상단 0
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

// Card 관련 하위 컴포넌트들을 모두 export
// 다른 파일에서 import해서 재사용 가능하게 함
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
