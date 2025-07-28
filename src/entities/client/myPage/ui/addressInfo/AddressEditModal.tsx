import { useState, useEffect } from 'react';
import { AddressRes } from '@/types/userPage/myPage/Address';

interface AddressEditModalProps {
  addr: AddressRes | null;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

const messageOptions = [
  `배송 전에 미리 연락바랍니다.`,
  `부재 시 경비실에 맡겨주세요.`,
  `부재 시 문 앞에 놓아주세요.`,
  `빠른 배송 부탁드립니다.`,
  `택배함에 보관해 주세요.`,
  `직접 입력`,
];

const AddressEditModal = ({
  addr,
  isEditing,
  setIsEditing,
}: AddressEditModalProps) => {
  const [recipientName, setRecipientName] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [detailAddress, setDetailAddress] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [deliveryMessage, setDeliveryMessage] = useState<string>('');
  const [customDeliveryMessage, setCustomDeliveryMessage] =
    useState<string>('');

  const handleEdit = () => {
    fetch(`http://localhost:8080/api/delivery/${addr?.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('Access Token')}`,
      },
    })
      .then((res) => res.json())
      .then((jsonRes) => {
        console.log('배송지 수정 성공: ', jsonRes.data);
        alert('배송지가 수정되었습니다.');
        window.location.reload();
      })
      .catch((error) => {
        alert('배송지 수정 실패: ' + error);
      });
  };

  useEffect(() => {
    if (addr) {
      setAddress(addr.address);
      setDetailAddress(addr.detailAddress);
      setRecipientName(addr.recipientName);
      setPhoneNumber(addr.recipientPhoneNumber);
      setDeliveryMessage(addr.deliveryMessage);
    }
  }, [addr]);

  if (!isEditing) return null;

  return (
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
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="우편번호"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-[#E4E7EC] bg-gray-50 font-montserrat focus:outline-none focus:ring-2 focus:ring-[#A83E3E] transition mb-2"
                required
              />
              <button className="w-1/4 px-4 py-2 bg-[#A83E3E] text-white font-bold rounded-lg hover:bg-[#7a2229] transition font-montserrat mb-2">
                <span>검색</span>
              </button>
            </div>
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
            {deliveryMessage === '직접 입력' ? (
              <input
                type="text"
                placeholder="배송 메시지를 입력해주세요"
                value={customDeliveryMessage || ''}
                onChange={(e) => {
                  setCustomDeliveryMessage(e.target.value);
                  setDeliveryMessage('직접 입력');
                }}
                onBlur={() => {
                  if (!customDeliveryMessage) setDeliveryMessage('');
                }}
                className="w-full px-4 py-2 rounded-lg border border-[#E4E7EC] bg-gray-50 font-montserrat focus:outline-none focus:ring-2 focus:ring-[#A83E3E] transition"
              />
            ) : (
              <select
                value={deliveryMessage}
                onChange={(e) => {
                  setDeliveryMessage(e.target.value);
                  if (e.target.value !== '직접 입력')
                    setCustomDeliveryMessage('');
                }}
                className="w-full px-4 py-2 rounded-lg border border-[#E4E7EC] bg-gray-50 font-montserrat focus:outline-none focus:ring-2 focus:ring-[#A83E3E] transition"
              >
                <option value="" className="font-normal">
                  메시지를 선택해주세요 &#40;선택사항&#41;
                </option>
                {messageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
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
  );
};

export default AddressEditModal;
