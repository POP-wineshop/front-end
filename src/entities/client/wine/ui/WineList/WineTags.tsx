const WineTag = ({ tag }: { tag: string }) => (
  <span className="rounded-full bg-gray-100 text-gray-700 px-3 py-1 text-xs font-semibold">
    {tag}
  </span>
);

const WineTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-wrap gap-2 mb-6">
    {tags.map((tag, idx) => (
      <WineTag key={idx} tag={tag} />
    ))}
  </div>
);

export default WineTags;
