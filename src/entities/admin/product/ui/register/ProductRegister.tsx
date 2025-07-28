import FormRow from '@/components/backOffice/product/register/FormRow';
import { sampleProductReqList } from '@/constants/backOffice/product/sampleProductReqList';
import { useEffect } from 'react';

const countryOptions = [
  { value: '프랑스', label: '프랑스' },
  { value: '이탈리아', label: '이탈리아' },
  { value: '스페인', label: '스페인' },
  { value: '독일', label: '독일' },
  { value: '미국', label: '미국' },
  { value: '호주', label: '호주' },
  { value: '뉴질랜드', label: '뉴질랜드' },
  { value: '칠레', label: '칠레' },
  { value: '아르헨티나', label: '아르헨티나' },
];
const wineTypeOptions = [
  { value: 'RED', label: '레드와인' },
  { value: 'WHITE', label: '화이트와인' },
  { value: 'ROSE', label: '로제와인' },
  { value: 'SPARKLING', label: '스파클링' },
  { value: 'DESSERT', label: '디저트' },
];

const ProductRegister = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload = {
      imageUrl: String(formData.get('imageUrl')).trim(),
      korName: String(formData.get('korName')).trim(),
      engName: String(formData.get('engName')).trim(),
      price: Number(formData.get('price')),
      vintage: Number(formData.get('vintage')),
      country: String(formData.get('country')).trim(),
      region: String(formData.get('region')).trim(),
      grapeVariety: String(formData.get('grapeVariety')).trim(),
      winery: String(formData.get('winery')).trim(),
      wineType: String(formData.get('wineType')).trim(),
      alcoholContent: Number(formData.get('alcoholContent')),
      stock: Number(formData.get('stock')),
      tasteProfile: {
        sweetness: Number(formData.get('sweetness')),
        acidity: Number(formData.get('acidity')),
        body: Number(formData.get('body')),
      },
      tastingNote: String(formData.get('tastingNote')).trim(),
      foodPairing: String(formData.get('foodPairing')).trim(),
      description: String(formData.get('description')).trim(),
    };

    fetch(`http://localhost:8080/api/admin/wines`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        alert(`상품 등록 성공!`);
      })
      .catch((error) => {
        alert(`상품 등록 실패: ${error}`);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full w-[1000px] mx-auto bg-white shadow-xl rounded-2xl px-8 py-10 flex flex-col gap-8"
    >
      <div className="flex flex-col md:flex-row gap-8">
        {/* 왼쪽 */}
        <div className="flex-1 flex flex-col gap-4">
          <FormRow
            label="와인 이미지 URL"
            id="imageUrl"
            name="imageUrl"
            placeholder="https://..."
            required
          />
          <FormRow
            label="한글 이름"
            id="korName"
            name="korName"
            placeholder="예: 샤또 마고"
            required
          />
          <FormRow
            label="영문 이름"
            id="engName"
            name="engName"
            placeholder="예: Chateau Margaux"
            required
          />
          <FormRow
            label="빈티지"
            id="vintage"
            name="vintage"
            type="number"
            placeholder="예: 2018"
            required
          />
          <FormRow
            label="국가"
            id="country"
            name="country"
            as="select"
            options={countryOptions}
            placeholder="국가 선택"
            required
          />
          <FormRow
            label="지역"
            id="region"
            name="region"
            placeholder="예: Bordeaux"
            required
          />
          <FormRow
            label="품종"
            id="grapeVariety"
            name="grapeVariety"
            placeholder="예: Cabernet Sauvignon"
            required
          />
          <FormRow
            label="와이너리"
            id="winery"
            name="winery"
            placeholder="예: Chateau Margaux"
            required
          />
          <FormRow
            label="와인 타입"
            id="wineType"
            name="wineType"
            as="select"
            options={wineTypeOptions}
            placeholder="타입 선택"
            required
          />
          <FormRow
            label="가격(원)"
            id="price"
            name="price"
            type="number"
            placeholder="예: 100000"
            required
          />
          <FormRow
            label="재고 수량"
            id="stock"
            name="stock"
            type="number"
            placeholder="예: 10"
            required
          />
        </div>
        {/* 오른쪽 */}
        <div className="flex-1 flex flex-col gap-4">
          {/* 맛 프로필 */}
          <div className="border border-gray-200 rounded-xl bg-gray-50 p-4 flex flex-col gap-2 shadow-inner">
            <div className="text-sm font-semibold text-gray-600 mb-2">
              맛 프로필
            </div>
            <FormRow
              label="당도"
              id="sweetness"
              name="sweetness"
              type="number"
              min={1}
              max={5}
              placeholder="1~5"
              required
            />
            <FormRow
              label="산도"
              id="acidity"
              name="acidity"
              type="number"
              min={1}
              max={5}
              placeholder="1~5"
              required
            />
            <FormRow
              label="바디"
              id="body"
              name="body"
              type="number"
              min={1}
              max={5}
              placeholder="1~5"
              required
            />
          </div>
          <FormRow
            label="알콜 도수(%)"
            id="alcoholContent"
            name="alcoholContent"
            type="number"
            step={0.1}
            placeholder="예: 13.5"
            required
          />
          <FormRow
            label="간략한 설명"
            id="description"
            name="description"
            placeholder="한 줄 요약"
            required
          />
          <FormRow
            label="음식 페어링"
            id="foodPairing"
            name="foodPairing"
            placeholder="예: 스테이크, 치즈"
            required
          />
          <FormRow
            label="테이스팅 노트"
            id="tastingNote"
            name="tastingNote"
            as="textarea"
            placeholder="자세한 맛/향 설명"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-3 mt-4 rounded-xl bg-gray-800 text-white text-lg font-bold shadow hover:bg-gray-600 transition"
      >
        와인 등록
      </button>
    </form>
  );
};

export default ProductRegister;
