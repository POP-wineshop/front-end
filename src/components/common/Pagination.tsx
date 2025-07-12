import ToFirstPage from '@/assets/pagination/WineListPage_Pagination_ToFirstPage.svg';
import ToPreviousPage from '@/assets/pagination/WineListPage_Pagination_ToPreviousPage.svg';
import ToNextPage from '@/assets/pagination/WineListPage_Pagination_ToNextPage.svg';
import ToLastPage from '@/assets/pagination/WineListPage_Pagination_ToLastPage.svg';
import { useState } from 'react';
import { setCurrentPage } from '@/stores/wineList/useWineListStore';
import { ChevronFirst } from 'lucide-react';

const pagination = (list: []) => {
  const listToShow = list;
  const itemsPerPage = 9;
  const totalPages = Math.ceil(listToShow.length / itemsPerPage);
  const [currentPage, setCurrnetPage] = useState<number>(1);

  const handleMoveToFirstPage = () => {
    setCurrnetPage(1);
  };

  const handleMoveToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleMoveToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handleMoveToLastPage = () => {
    setCurrentPage(totalPages);
  };

  return (
    <div className="flex items-center justify-center gap-4 my-8">
      {currentPage > 1 ? (
        <div className="flex items-center justify-center gap-2">
          <img src={ToFirstPage} alt="첫 페이지" />
          <img src={ToPreviousPage} alt="이전 페이지" />
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2 opacity-50 cursor-not-allowed">
          <img
            src={ToFirstPage}
            alt="첫 페이지"
            title="첫 번째 페이지 입니다"
          />
          <img
            src={ToPreviousPage}
            alt="이전 페이지"
            title="첫 번째 페이지 입니다"
          />
        </div>
      )}
      {[1, 2, 3, 4, 5].map((page) => (
        <span key={page}>
          <a href="">{page}</a>
        </span>
      ))}
      {currentPage !== totalPages ? (
        <div className="flex items-center justify-center gap-2">
          <img src={ToNextPage} alt="다음 페이지" />
          <img src={ToLastPage} alt="마지막 페이지" />
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2 opacity-30 cursor-not-allowed">
          <img
            src={ToNextPage}
            alt="다음 페이지"
            title="마지막 페이지입니다."
          />
          <img
            src={ToLastPage}
            alt="마지막 페이지"
            title="마지막 페이지입니다."
          />
        </div>
      )}
    </div>
  );
};

export default pagination;
