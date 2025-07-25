import WineItem from '@/entities/client/wine/ui/WineItem';
import Pagination from '@/entities/client/common/ui/Pagination';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import getWineList from '@/entities/client/wine/api/getWineList';
// 전역 상태 관리(Redux)에서 wineList를 가져오기 위한 훅 import
import { useDispatch, useSelector } from 'react-redux';
// wineList 상태를 변경하는 액션 import
import { setWineList } from '@/entities/client/wine/model';
// wineList를 전역 상태에서 선택하는 selector import
import {
  selectWineFilter,
  selectWineList,
} from '@/entities/client/wine/model/selectors';

const WineListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Redux dispatch 함수. 전역 상태 변경에 사용
  const dispatch = useDispatch();

  // useSelector로 전역 상태의 wineList를 구독. useState로 관리하지 않음
  const wineList = useSelector(selectWineList);
  const wineFilter = useSelector(selectWineFilter);

  // 페이지네이션 관련 상태는 컴포넌트 로컬 상태로 관리
  const [currentPage, setCurrentPage] = useState<number>(1);
  // 추후 렌더링 초기화되어도 이전에 보던 페이지 유지를 위해 현재 페이지 상태 관리 필요
  const itemsPerPage = 12;
  const startItemIndex = (currentPage - 1) * itemsPerPage;
  const endItemIndex = startItemIndex + itemsPerPage;
  // wineList는 전역 상태에서 가져온 값이므로 바로 slice 사용 가능
  const currentItems = wineList.slice(startItemIndex, endItemIndex);

  useEffect(() => {
    getWineList(wineFilter || {})
      .then((res) => {
        dispatch(setWineList(res));
      })
      .catch((error) => {
        console.error('와인 목록 조회 실패', error);
      });
  }, [wineFilter, dispatch]); // dispatch도 의존성에 추가

  return (
    <>
      <div className="m-auto w-[1600px] flex flex-col items-center min-h-screen ">
        {wineList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 w-full px-8 py-12">
            {currentItems.map((wine) => (
              <WineItem key={wine.id} {...wine} />
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
    </>
  );
};

export default WineListPage;
