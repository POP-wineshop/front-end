import { useEffect, useState } from 'react';
import { AddressRes } from '@/entities/client/myPage/model/addressInfo/addressInfoTypes';
import AddressEditModal from './AddressEditModal';

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

  const handleShowEditModal = () => {
    setIsEditing(true);
  };

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
    <div className="flex flex-col gap-2 bg-white/80 p-6 relative border-t border-b border-[#E4E7EC]">
      <div className="font-montserrat flex items-center">
        <span className="font-bold text-[#A83E3E] text-lg">
          {recipientName}
        </span>

        {isDefault && (
          <span className="inline-block px-2 py-1 rounded-full bg-[#A83E3E] text-white text-xs font-montserrat font-bold align-middle ml-2 shadow-sm">
            <span className="font-bold">기본</span>
          </span>
        )}

        {isRecent && (
          <span className="inline-block px-2 py-1 rounded-full bg-gray-200 text-gray-700 text-xs font-montserrat font-bold align-middle ml-2 shadow-sm">
            <span className="font-bold">최근</span>
          </span>
        )}
      </div>
      <div className="font-montserrat text-gray-700">
        {address} {detailAddress}
      </div>
      <div className="font-montserrat text-gray-700">{phoneNumber}</div>
      {deliveryMessage && (
        <div className="font-montserrat text-gray-600 italic">
          "{deliveryMessage}"
        </div>
      )}

      <div className="flex gap-3 absolute top-6 right-6">
        <button
          className="font-montserrat font-bold px-4 py-2 rounded-lg bg-gray-300 text-[#171717] hover:bg-gray-400 transition"
          onClick={() => setIsEditing(true)}
        >
          수정
        </button>
        {isEditing && (
          <AddressEditModal
            addr={addressItem}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
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
