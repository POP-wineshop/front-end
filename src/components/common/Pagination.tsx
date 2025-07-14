import ToFirstPage from '@/assets/pagination/WineListPage_Pagination_ToFirstPage.svg';
import ToPreviousPage from '@/assets/pagination/WineListPage_Pagination_ToPreviousPage.svg';
import ToNextPage from '@/assets/pagination/WineListPage_Pagination_ToNextPage.svg';
import ToLastPage from '@/assets/pagination/WineListPage_Pagination_ToLastPage.svg';
import { useState } from 'react';
import { setCurrentPage } from '@/stores/wineList/useWineListStore';

const pagination = ({
  // list의 초기값을 빈 배열로 설정
  list = [],
  itemsPerPage,
  currentPage,
  setCurrentPage,
}: {
  list: any[];
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}) => {
  // list가 비어있거나 undefined인 경우 빈 배열로 초기화
  if (!list || list.length === 0) {
    return [];
  }

  const listToShow = list;
  // itemsPerPage보다 적은 경우 페이지네이션을 보여주지 않음
  if (listToShow.length < itemsPerPage) {
    return null;
  }

  // 페이지네이션 관련 변수 설정
  const maxVisiblePages = 5;
  const totalPages = Math.ceil(listToShow.length / itemsPerPage);
  // const [currentPage, setCurrentPage] = useState<number>(1);

  // 페이지네이션의 현재 페이지 그룹 계산
  const startPageIndex =
    (Math.ceil(currentPage / maxVisiblePages) - 1) * maxVisiblePages + 1;

  // 현재 페이지 그룹의 페이지 번호 배열 생성
  const currentPageGroup = () => {
    if (startPageIndex + maxVisiblePages - 1 >= totalPages) {
      return Array.from(
        { length: totalPages - startPageIndex + 1 },
        (_, i) => startPageIndex + i
      );
    } else {
      console.log('5개 페이지 그룹');
      return Array.from(
        { length: maxVisiblePages },
        (_, i) => startPageIndex + i
      );
    }
  };

  const handleMoveToFirstPage = () => {
    setCurrentPage(1);
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
    <div className="flex items-center justify-center gap-2 my-8">
      {currentPage === 1 ? (
        <>
          <button
            disabled={true}
            className="flex items-center justify-center gap-2 opacity-50"
          >
            <img
              src={ToFirstPage}
              alt="첫 페이지"
              title="현재 첫 번째 페이지 입니다"
            />
          </button>
          <button
            disabled={true}
            className="flex items-center justify-center gap-2 opacity-50"
          >
            <img
              src={ToPreviousPage}
              alt="이전 페이지"
              title="현재 첫 번째 페이지 입니다"
            />
          </button>
        </>
      ) : (
        <>
          <button className="flex items-center justify-center gap-2">
            <img
              src={ToFirstPage}
              alt="첫 페이지"
              onClick={handleMoveToFirstPage}
            />
          </button>
          <button className="flex items-center justify-center gap-2">
            <img
              src={ToPreviousPage}
              alt="이전 페이지"
              onClick={handleMoveToPreviousPage}
            />
          </button>
        </>
      )}
      {currentPageGroup().map((page) => (
        <button
          key={page}
          onClick={() => {
            setCurrentPage(page);
          }}
          className={`p-1 ${
            currentPage === page
              ? 'text-white font-bold border border-gray-700 bg-gray-700 rounded'
              : ''
          }`}
          disabled={currentPage === page}
        >
          {page}
        </button>
      ))}
      {currentPage !== totalPages ? (
        <>
          <button className="flex items-center justify-center gap-2">
            <img
              src={ToNextPage}
              alt="다음 페이지"
              onClick={handleMoveToNextPage}
            />
          </button>
          <button className="flex items-center justify-center gap-2">
            <img
              src={ToLastPage}
              alt="마지막 페이지"
              onClick={handleMoveToLastPage}
            />
          </button>
        </>
      ) : (
        <>
          <button
            disabled={true}
            className="flex items-center justify-center gap-2 opacity-30"
          >
            <img
              src={ToNextPage}
              alt="다음 페이지"
              title="마지막 페이지입니다."
            />
          </button>
          <button
            disabled={true}
            className="flex items-center justify-center gap-2 opacity-30"
          >
            <img
              src={ToLastPage}
              alt="마지막 페이지"
              title="마지막 페이지입니다."
            />
          </button>
        </>
      )}
    </div>
  );
};

export default pagination;
