import WineListItem from '@/entities/client/wine/ui/WineList/WineListItem';
import Pagination from '@/entities/client/common/ui/Pagination';
import { useWineList } from '@/entities/client/wine/model/useWineList';

const WineListPage = () => {
  const { wineList, currentPage, setCurrentPage, itemsPerPage, currentItems } =
    useWineList();

  return (
    <div className="m-auto w-[1600px] flex flex-col items-center min-h-screen ">
      {wineList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 w-full px-8 py-12">
          {currentItems.map((wine) => (
            <WineListItem key={wine.id} {...wine} />
          ))}
        </div>
      ) : (
        <div className="w-full px-8 m-auto text-center">
          <p className="font-['Noto_Sans_KR'] text-3xl font-bold">
            조건에 만족하는 와인이 없습니다!
          </p>
        </div>
      )}

      <Pagination
        list={wineList}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default WineListPage;
