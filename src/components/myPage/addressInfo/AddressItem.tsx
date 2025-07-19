import { useEffect, useState } from 'react';
import { AddressRes } from '@/types/userPage/myPage/Address';

interface AddressItemProps {
  addr: AddressRes;
}

const AddressItem = ({ addr }: AddressItemProps) => {
  const [addressItem, setAddressItem] = useState<AddressRes | null>(null);

  const [recipientName, setRecipientName] = useState<string>('김예시');
  const [address, setAddress] =
    useState<string>('서울특별시 강남구 테헤란로 123');
  const [detailAddress, setDetailAddress] =
    useState<string>('동원빌딩 3층 317호');
  const [phoneNumber, setPhoneNumber] = useState<string>('010-1234-5678');
  const [deliveryMessage, setDeliveryMessage] =
    useState<string>('배송 메시지 예시입니다.');
  const [isDefault, setIsDefault] = useState<boolean>(false);
  const [isRecent, setIsRecent] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleDelete = () => {
    fetch(`http://localhost:8080/api/delivery/${addr.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('Access Token')}`,
      },
    })
      .then((res) => res.json())
      .then((jsonRes) => {
        alert('배송지가 삭제되었습니다.');
        window.location.reload();
      })
      .catch((error) => {
        alert('배송지 삭제 실패: ' + error);
      });
  };

  useEffect(() => {
    setAddressItem(addr);
    setAddress(addr.address);
    setDetailAddress(addr.detailAddress);
    setRecipientName(addr.recipientName);
    setPhoneNumber(addr.recipientPhoneNumber);
    setDeliveryMessage(addr.deliveryMessage);
    console.log('AddressItem 컴포넌트에 전달된 address data:', addr);
  }, [addressItem]);

  return (
    <div className="bg-white/80 p-6  relative border-t border-b border-[#E4E7EC]">
      <div className="font-montserrat">
        <span className="font-bold text-[#A83E3E] text-lg">
          {recipientName}
        </span>

        {isDefault && (
          <div className="bg-[#A83E3E] inline-block px-3 py-1 rounded-lg ml-3">
            <span className="text-white text-sm font-montserrat">
              기본 배송지
            </span>
          </div>
        )}

        {isRecent && (
          <div className="bg-gray-200 inline-block px-3 py-1 rounded-lg ml-3">
            <span className="text-gray-700 text-sm font-montserrat">
              최근 배송지
            </span>
          </div>
        )}
      </div>
      <div className="font-montserrat text-gray-700">{address}</div>
      <div className="font-montserrat text-gray-700">{phoneNumber}</div>
      <div className="font-montserrat text-gray-600 italic">
        "{deliveryMessage}"
      </div>

      <div className="flex gap-3 absolute top-6 right-6">
        <button
          className="font-montserrat font-bold px-4 py-2 rounded-lg bg-gray-300 text-[#171717] hover:bg-gray-400 transition"
          onClick={() => setIsEditing(true)}
        >
          수정
        </button>
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-xl shadow-lg p-8 w-[400px] relative">
              <button
                className="absolute top-2 right-4 text-gray-400 hover:text-[#A83E3E] text-2xl"
                onClick={() => setIsEditing(false)}
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold text-[#A83E3E] text-center mb-4 font-montserrat">
                배송지 수정
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEdit(); // handleEdit 함수는 수정 API 호출 및 상태 업데이트 담당
                }}
                className="flex flex-col space-y-6"
              >
                <div>
                  <label className="block text-lg font-bold text-[#A83E3E] mb-2 font-montserrat">
                    이름 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-[#E4E7EC] bg-gray-50 font-montserrat focus:outline-none focus:ring-2 focus:ring-[#A83E3E] transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-lg font-bold text-[#A83E3E] mb-2 font-montserrat">
                    주소 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-[#E4E7EC] bg-gray-50 font-montserrat focus:outline-none focus:ring-2 focus:ring-[#A83E3E] transition mb-2"
                    required
                  />
                  <input
                    type="text"
                    value={detailAddress}
                    onChange={(e) => setDetailAddress(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-[#E4E7EC] bg-gray-50 font-montserrat focus:outline-none focus:ring-2 focus:ring-[#A83E3E] transition"
                    placeholder="상세주소 (아파트, 빌라, 동호수 등)"
                  />
                </div>
                <div>
                  <label className="block text-lg font-bold text-[#A83E3E] mb-2 font-montserrat">
                    전화번호 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-[#E4E7EC] bg-gray-50 font-montserrat focus:outline-none focus:ring-2 focus:ring-[#A83E3E] transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-lg font-bold text-[#A83E3E] mb-2 font-montserrat">
                    배송 메시지
                  </label>
                  <input
                    type="text"
                    value={deliveryMessage}
                    onChange={(e) => setDeliveryMessage(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-[#E4E7EC] bg-gray-50 font-montserrat focus:outline-none focus:ring-2 focus:ring-[#A83E3E] transition"
                  />
                </div>
                <div className="flex justify-between gap-4 pt-4">
                  <button
                    type="submit"
                    className="w-1/2 px-4 py-2 bg-[#A83E3E] text-white font-bold rounded-lg hover:bg-[#7a2229] transition font-montserrat"
                  >
                    저장
                  </button>
                  <button
                    type="button"
                    className="w-1/2 px-4 py-2 bg-gray-700 text-white font-bold rounded-lg hover:bg-[#7a2229] transition font-montserrat"
                    onClick={() => setIsEditing(false)}
                  >
                    취소
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {!isDefault && (
          <button
            className="font-montserrat font-bold px-4 py-2 rounded-lg bg-red-400 text-white hover:bg-red-600 transition"
            onClick={() => {
              if (confirm('해당 배송지를 삭제하시겠습니까?')) {
                handleDelete();
              }
            }}
          >
            삭제
          </button>
        )}
      </div>
    </div>
  );
};

export default AddressItem;
