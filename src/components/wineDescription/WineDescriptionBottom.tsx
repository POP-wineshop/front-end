type Wine = {
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

type WineDescriptionProps = { wineData: Wine };

const WineDescriptionBottom: React.FC<WineDescriptionProps> = ({
  wineData,
}) => {
  const wineDescriptionText = [
    { key: '테이스팅 노트', value: `테이스팅 노트` },
    { key: '양조 방법', value: `양조 방법` },
    { key: '와인 스토리', value: `와인 스토리` },
    { key: '와이너리 설명', value: `와이너리 설명` },
  ];

  return (
    <div className="wine-description-bottom py-12 px-6 bg-white flex flex-col gap-10">
      {wineDescriptionText.map(({ key, value }) => (
        <div
          key={key}
          className="w-full max-w-3xl mx-auto flex flex-col items-start gap-4"
        >
          <h3 className="text-lg font-semibold text-[#6A1B1A]">{key}</h3>
          <hr className="w-full border-t border-gray-300" />
          <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
            {value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default WineDescriptionBottom;
