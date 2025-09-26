// TODO: type => interface로 변경 필요 여부 추후에 다시 알아보기

export type WineState = {
  wineList: WineData[];
  filter: WineListQuery;
  loading: boolean;
  error: string | null;
  likes: { [key: number]: boolean };
};

export type WineListQuery = {
  country?: string;
  region?: string;
  wineType?: string;
  keyword?: string;
};

export type WineData = {
  id: number;
  price: number;
  vintage: number;
  country: string;
  grapeVariety: string;
  region: string;
  alcoholContent: number;
  imageUrl: string;
  tasteProfile: {
    sweetness: number;
    acidity: number;
    body: number;
  };
  wineType: string;
  stock: number;
  korName: string;
  engName: string;
};

export type InstantOrderData = {
  wineId: number;
  quantity: number;
};
