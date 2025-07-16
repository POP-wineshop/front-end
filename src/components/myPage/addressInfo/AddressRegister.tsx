import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AddressReq, AddressRes } from '@/types/userPage/myPage/Address';

const AddressRegister = () => {
  const navigate = useNavigate();
  const [recipientName, setRecipientName] = useState<string>('김예시');
  const [address, setAddress] =
    useState<string>('서울특별시 강남구 테헤란로 123');
  const [detailAddress, setDetailAddress] =
    useState<string>('동원빌딩 3층 312호');
  const [phoneNumber, setPhoneNumber] = useState<string>('010-1234-5678');
  const [isDefault, setIsDefault] = useState<boolean>(false);
  const [deliveryMessage, setDeliveryMessage] =
    useState<string>('배송 메시지 예시입니다.');

  const userIdStr = localStorage.getItem('User Name');
  const userId = userIdStr ? Number(userIdStr) : 0; // fallback to 0 or handle as needed

  const addressReq: AddressReq[] = [
    {
      zipcode: 
      address: address,
      detailAddress: detailAddress,
      recipientName: recipientName,
      recipientPhoneNumber: phoneNumber,
      deliveryMessage: deliveryMessage,
      default: isDefault,
    },
  ];

  const registerAddress = () => {
    fetch(`http://localhost:8080/api/delivery/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('Access Token')}`,
      },
      body: JSON.stringify(addressReq),
    })
      .then((res) => res.json())
      .then((jsonRes) => {
        console.log(jsonRes.data);
        alert(`배송지 등록 성공! 배송지 목록으로 이동합니다.`);
        navigate('/mypage/address');
      })
      .catch((error) => {
        alert(`배송지 등록 실패: ${error}`);
      });
  };

  return (
    <div className="w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          registerAddress();
          alert('배송지 추가 완료');
        }}
        className="mx-auto my-16 flex flex-col gap-4 w-full max-w-md min-w-[400px] p-8 bg-white rounded-xl shadow-md"
      >
        <p className="text-xl font-bold text-center mb-4">배송지 등록</p>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            이름
          </label>
          <input
            type="text"
            placeholder="받으실 분의 이름을 입력해주세요"
            className="w-full p-2 border border-[#D4D4D4] rounded-md focus:outline-none focus:ring focus:ring-1 focus:ring-[#6A1B1A]"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            주소
          </label>
          <div className="flex gap-2 justify-between items-center">
            <input
              type="text"
              placeholder="우편번호"
              value={detailAddress}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border border-[#D4D4D4] rounded-md focus:outline-none focus:ring focus:ring-1 focus:ring-[#6A1B1A]"
            />
            <button
              type="button"
              className="w-1/4 px-4 py-2 border border-[#6A1B1A] bg-[#6A1B1A] text-white rounded-md hover:bg-[#8B2E2E] hover:border-[#8B2E2E] transition-colors duration-150"
            >
              검색
            </button>
          </div>
          <input
            type="text"
            placeholder="기본주소 (시, 구, 동 등)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-2 w-full p-2 border border-[#D4D4D4] rounded-md focus:outline-none focus:ring focus:ring-1 focus:ring-[#6A1B1A]"
          />
          <input
            type="text"
            placeholder="상세주소 (아파트, 빌라, 동호수 등)"
            value={detailAddress}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-2 w-full p-2 border border-[#D4D4D4] rounded-md focus:outline-none focus:ring focus:ring-1 focus:ring-[#6A1B1A]"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            전화번호
          </label>
          <input
            type="tel"
            placeholder="010-1234-5678"
            value={phoneNumber}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border border-[#D4D4D4] rounded-md focus:outline-none focus:ring focus:ring-1 focus:ring-[#6A1B1A]"
          />
        </div>

        <button
          type="submit"
          className="mt-4 py-2 bg-[#6A1B1A] text-white font-semibold rounded-md hover:bg-[#4E1212] transition"
        >
          추가하기
        </button>

        <Link
          to="/mypage/address"
          className="text-sm text-center text-[#6A1B1A] hover:underline font-medium"
        >
          배송지 목록으로 돌아가기
        </Link>
      </form>
    </div>
  );
};

export default AddressRegister;
