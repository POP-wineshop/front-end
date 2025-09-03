export interface LikesWineItemExample {
  id: number;
  korName: string;
  engName: string;
  grapeVariety: string;
  country: string;
  region: string;
  vintage: number;
  wineType: string;
  price: number;
  stock: number;
  imageUrl: string | null;
  alcoholContent: number;
  tasteProfile: {
    sweetness: number;
    acidity: number;
    body: number;
  };
}
