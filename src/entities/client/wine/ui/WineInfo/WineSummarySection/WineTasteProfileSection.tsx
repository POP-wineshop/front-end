import { getTasteProfileDetails, WineData } from '../../../model';

const WineTasteProfileSection = ({
  wineInfoData,
}: {
  wineInfoData: WineData;
}) => {
  return (
    <div className="wine-description-taste-profile border-t border-b py-4 mb-6">
      {getTasteProfileDetails().map(({ labelEng, labelKor, low, high }) => (
        <div key={labelEng} className="flex items-center my-3">
          <strong className="w-36 text-sm text-gray-700">{labelKor}</strong>
          <span className="w-12 text-xs text-right text-gray-400">{low}</span>
          <div className="flex gap-4 mx-3">
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                className={`w-5 h-5 p-3 rounded-full flex items-center justify-center ${
                  n ===
                  wineInfoData.tasteProfile[
                    labelEng as keyof typeof wineInfoData.tasteProfile
                  ]
                    ? 'bg-[#6A1B1A] text-white'
                    : 'bg-[#e8e5eb] text-[#c1acbf]'
                }`}
              >
                <li className="list-none">{n}</li>
              </div>
            ))}
          </div>
          <span className="w-12 text-xs text-gray-400">{high}</span>
        </div>
      ))}
    </div>
  );
};

export default WineTasteProfileSection;
