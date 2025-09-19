interface WineNameProps {
  korName: string;
  engName: string;
}

const WineNameInItem = ({ korName, engName }: WineNameProps) => (
  <div className="w-full flex flex-col items-center gap-1 mb-4">
    <span
      className={`
        font-pretendard tracking-tight font-extrabold text-gray-900 text-center line-clamp-2
        ${korName.length > 15 ? 'text-lg' : 'text-xl'}
      `}
    >
      {korName}
    </span>
    <span
      className={`
        font-montserrat tracking-tight italic text-gray-400 text-center line-clamp-2
        ${engName.length > 20 ? 'text-sm' : 'text-base'}
      `}
    >
      {engName}
    </span>
  </div>
);

export default WineNameInItem;
