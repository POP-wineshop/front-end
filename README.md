# *Wine-Halle*

### GitHub: [🎨 Front-End](https://github.com/POP-wineshop/front-end)

> **와인 판매 온라인 쇼핑 플랫폼 웹 서비스**
> 
- **참여 인원: Front-end 1명, Back-end 1명**
- **2025. 04. - 2025. 07.**

## 🛠 기술 스택

- **Language:** **`JavaScript`**, **`TypeScript`**
- **Framework:** **`Next.js`**
- **Library:** **`React`**, **`Redux-Toolkit`**, **`Tanstack-Query`**, **`TailwindCSS`**, **`Shadcn/UI`**, **`TossPayments`**
- **Infra:** **`AWS EC2`**, **`AWS S3`**
- **CI / CD:** **`Docker`**, **`GitHub Actions`**
- **협업:** **`Git`**, **`GitHub`**, **`Postman`**, **`Figma`**, **`Notion`**, **`Slack`**, **`Jira`**

## 📌 주요 구현 기능

- 클라이언트·어드민을 FSD 계층으로 분리
- 다중 조건 필터 UI를 URL 쿼리스트링과 동기화
- 와인 목록/상세 화면 구성(리스트 아이템/상세 요약 등)
- 장바구니 화면 및 장바구니 상태/조회 흐름 구성
- 주문 생성 흐름과 주문 상태 관리 구성

## 🔧 구현 상세

- 필터·정렬·페이지네이션 UI 공통화로 중복 제거 및 변경 영향 최소화
- URL 쿼리스트링 기반 상태 일원화로 화면 상태 불일치 방지 및 새로고침/공유 시 상태 유지
- 쿼리 파라미터 기반 목록 데이터 조회 흐름으로 조건-요청을 단순화, 예외 케이스 감소
- 필터 조건 URL 유지로 재방문·공유 시 동일 조건 재현성 확보 및 탐색 UX 개선

## 🐞 프로젝트 이슈 & 해결 과정

- FSD 리팩토링 이후 상대경로 깨짐에 따른 빌드 실패 및 WineList 페이지의 useEffect 의존성 누락에 따른 무한 렌더링 발생
- 레이어 간 의존 규칙 준수를 위한 import의 @/… 경로 재정비 및 라우터 쿼리 기반 필터 상태 단일화(상태 초기화)
- 백오피스 모듈 추가 시 클라이언트 빌드 영향 제거 및 필터 조작 후 재호출 루프 방지(조건 즉시 반영)
