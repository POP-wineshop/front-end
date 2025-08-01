import { useEffect, useState } from 'react';
import AddressItem from './AddressItem';
import { Link } from 'react-router-dom';
import AddressRegister from './AddressRegister';
import { AddressRes } from '@/entities/client/myPage/model/addressInfo/addressInfoTypes';

const AddressInfo = () => {
  const pathName = window.location.pathname;
  const [addresses, setAddresses] = useState<AddressRes[] | null>(null);

  const getAddresses = () => {
    fetch(`http://localhost:8080/api/delivery`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('Access Token')}`,
      },
    })
      .then((res) => res.json())
      .then((jsonRes) => {
        console.log(jsonRes.data);
        alert(`배송지 조회 성공`);
        setAddresses(jsonRes.data);
      })
      .catch((error) => {
        alert(`배송지 조회 실패: ${error}`);
      });
  };

  useEffect(() => {
    getAddresses();
  }, []);

  return (
    <div className="bg-white/80 rounded-2xl shadow-md p-8 w-full flex flex-col space-y-6">
      {/* 설정된 기본 배송지를 맨 위로 올린다 */}
      {/* 배송지는 세 곳까지 등록 가능 */}

      {pathName !== '/mypage/address/register' ? (
        <>
          <Link
            to="/mypage/address/register"
            className="w-fit px-4 py-2 bg-[#A83E3E] text-white font-bold rounded-lg hover:bg-[#7a2229] transition font-montserrat text-sm"
          >
            + 배송지 추가
          </Link>
          {addresses?.map((addr) => (
            <AddressItem key={addr.id} addr={addr} />
          ))}
        </>
      ) : (
        <AddressRegister />
      )}
    </div>
  );
};

export default AddressInfo;
