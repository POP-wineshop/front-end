import { useState } from 'react';
import AddressItem from './AddressItem';
import { Link } from 'react-router-dom';
import AddressRegister from './AddressRegister';

const AddressInfo = () => {
  const pathName = window.location.pathname;
  return (
    <div className="w-[600px] m-auto flex flex-col space-y-6">
      {/* 설정된 기본 배송지를 맨 위로 올린다 */}
      {/* 배송지는 세 곳까지 등록 가능 */}

      {pathName !== '/mypage/address/register' ? (
        <>
          <Link
            to="/mypage/address/register"
            className="font-semibold px-3 py-1 border rounded hover:bg-gray-200 transition"
          >
            + 배송지 추가
          </Link>
          <AddressItem />
          <AddressItem />
          <AddressItem />
        </>
      ) : (
        <AddressRegister />
      )}
    </div>
  );
};

export default AddressInfo;
