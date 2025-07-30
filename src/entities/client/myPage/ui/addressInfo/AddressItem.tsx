import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AddressRes } from '@/types/userPage/myPage/Address';
import AddressEditModal from './AddressEditModal';
import { deleteAddress } from '../../api/addressInfo/addressInfoApi';
import { AppDispatch } from '@/shared/store';

const AddressItem = ({ addr }: { addr: AddressRes }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleDelete = () => {
    if (confirm('해당 배송지를 삭제하시겠습니까?')) {
      // 전역 변수화 시킬지는 추후 결정
      deleteAddress(addr.id);
    }
  };

  return (
    <div className="flex flex-col gap-2 bg-white/80 p-6 relative border-t border-b border-[#E4E7EC]">
      <div className="font-montserrat flex items-center">
        <span className="font-bold text-[#A83E3E] text-lg">
          {addr.recipientName}
        </span>

        {addr.default && (
          <span className="inline-block px-2 py-1 rounded-full bg-[#A83E3E] text-white text-xs font-montserrat font-bold align-middle ml-2 shadow-sm">
            <span className="font-bold">기본</span>
          </span>
        )}

        {/* 최근 등록된 배송지 표시 (선택사항) */}
        {addr.id > 0 && (
          <span className="inline-block px-2 py-1 rounded-full bg-gray-200 text-gray-700 text-xs font-montserrat font-bold align-middle ml-2 shadow-sm">
            <span className="font-bold">최근</span>
          </span>
        )}
      </div>
      <div className="font-montserrat text-gray-700">
        {addr.address} {addr.detailAddress}
      </div>
      <div className="font-montserrat text-gray-700">
        {addr.recipientPhoneNumber}
      </div>
      {addr.deliveryMessage && (
        <div className="font-montserrat text-gray-600 italic">
          "{addr.deliveryMessage}"
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
            addr={addr}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        )}
        {!addr.default && (
          <button
            className="font-montserrat font-bold px-4 py-2 rounded-lg bg-red-400 text-white hover:bg-red-600 transition"
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
