import { useState } from 'react';

const AddressItem = () => {
  const [recipientName, setRecipientName] = useState<string>('김예시');
  const [address, setAddress] =
    useState<string>('서울특별시 강남구 테헤란로 123');
  const [phoneNumber, setPhoneNumber] = useState<string>('010-1234-5678');
  const [isDefault, setIsDefault] = useState<boolean>(false);
  const [isRecent, setIsRecent] = useState<boolean>(true);

  const deliveryMessage = '배송 메시지 예시입니다.';
  const handleEdit = () => {
    alert('수정 기능은 아직 구현되지 않았습니다.');
  };

  const handleDelete = () => {
    alert('삭제 기능은 아직 구현되지 않았습니다.');
  };

  return (
    <div className="flex flex-col space-y-2 border rounded p-4 relative">
      <div className="font-pretendard">
        <span className="font-bold">{recipientName}</span>

        {isDefault && (
          <div className="bg-[#222] inline-block px-2 py-1 rounded ml-2">
            <span className="text-white">기본 배송지</span>
          </div>
        )}

        {isRecent && (
          <div className="bg-gray-200 inline-block px-2 py-1 rounded ml-2">
            <span className="text-gray-700">최근 배송지</span>
          </div>
        )}
      </div>
      <div className="font-pretendard">{address}</div>
      <div className="font-pretendard">{phoneNumber}</div>
      <div className="font-pretendard">"{deliveryMessage}"</div>

      <div className="flex gap-2 absolute top-4 right-8">
        <button
          className="font-pretendard font-semibold px-3 py-1 rounded bg-gray-300 text-[#171717] hover:bg-gray-400 transition"
          onClick={handleEdit}
        >
          수정
        </button>
        {!isDefault && (
          <button
            className="font-pretendard font-semibold px-3 py-1 rounded bg-[#6A1B1A] text-white hover:bg-[#4E1212] transition"
            onClick={handleDelete}
          >
            삭제
          </button>
        )}
      </div>
    </div>
  );
};

export default AddressItem;
