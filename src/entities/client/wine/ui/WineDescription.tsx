import { getWineDescriptionFields, WineData } from '../model';

const WineDescription = ({ wineData }: { wineData: WineData }) => {
  return (
    <div className="wine-description-bottom py-12 px-6 bg-white flex flex-col gap-10">
      {getWineDescriptionFields().map(({ key, value }) => (
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

export default WineDescription;
