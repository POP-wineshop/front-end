import DuckhornMerlot from '@/assets/wineItem/Duckhorn_Napa Valley_Merlot.png';

const WineImageSection = () => {
  return (
    <div className="wine-description-top-left flex justify-start items-center w-[400px] h-[600px]">
      <img
        className="object-contain max-h-full"
        src={DuckhornMerlot}
        alt="와인 상세 이미지"
      />
    </div>
  );
};

export default WineImageSection;
