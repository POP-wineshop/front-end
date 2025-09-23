import { getWineBasicDetails, WineData } from '../../../model';

const WineBasicInfoSection = ({ wineInfoData }: { wineInfoData: WineData }) => {
  return (
    <>
      <div className="wine-description-name mb-6">
        <p
          className="italic text-lg text-gray-500 mb-1 line-clamp-1"
          title={wineInfoData.engName}
        >
          {wineInfoData.engName}
        </p>
        <p
          className="text-3xl font-bold text-[#111] line-clamp-1"
          title={wineInfoData.korName}
        >
          {wineInfoData.korName}
        </p>
      </div>
      <table className="text-sm mb-6 w-full">
        <tbody>
          {getWineBasicDetails(wineInfoData).map(({ key, value }) => (
            <tr
              key={key}
              className="border-b border-dashed border-gray-300 h-10"
            >
              <th className="text-left w-40 text-gray-600 font-medium">
                {key}
              </th>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default WineBasicInfoSection;
