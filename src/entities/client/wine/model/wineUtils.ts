import { WineData } from './wineTypes';

// 와인 기본 정보 가져오기
export function getWineBasicDetails(wineData: WineData) {
  return [
    { key: '타입', value: wineData.wineType },
    {
      key: '생산국 / 생산지',
      value: `${wineData.country} > ${wineData.region}`,
    },
    { key: '와이너리', value: '와이너리' },
    { key: '포도품종', value: wineData.grapeVariety },
  ];
}

// 와인 맛 정보 지표 목록 가져오기
export function getTasteProfileDetails() {
  return [
    { labelEng: 'sweetness', labelKor: '당도', low: '드라이', high: '스위트' },
    { labelEng: 'acidity', labelKor: '산도', low: '낮음', high: '높음' },
    { labelEng: 'body', labelKor: '바디', low: '가벼움', high: '무거움' },
  ];
}

// 와인 상세 정보 가져오기
export function getWineDescriptionFields() {
  return [
    { key: '테이스팅 노트', value: `테이스팅 노트` },
    { key: '양조 방법', value: `양조 방법` },
    { key: '와인 스토리', value: `와인 스토리` },
    { key: '와이너리 설명', value: `와이너리 설명` },
  ];
}

// 장바구니 추가 데이터 생성
export function createCartItemData(wineData: WineData, quantity: number) {
  return { wineId: wineData.id, quantity };
}

// 즉시 주문 데이터 생성
export function createInstantOrderData(wineData: WineData, quantity: number) {
  return { wineId: wineData.id, quantity };
}
