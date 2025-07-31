import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AddressCreateReq } from '@/entities/client/myPage/model/addressInfo/addressInfoTypes';
import { addAddress } from '../../model/addressInfo/addressInfoSlice';
import { DELIVERY_MESSAGE_OPTIONS } from '@/constants/address/deliveryMessages';
import { AppDispatch } from '@/shared/store';

const AddressRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [userId, setUserId] = useState<number>(2);
  const [zipcode, setZipcode] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [detailAddress, setDetailAddress] = useState<string>('');
  const [recipientName, setRecipientName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isDefault, setIsDefault] = useState<boolean>(false);
  const [deliveryMessage, setDeliveryMessage] = useState<string>('');

  const registerAddress = () => {
    const addressData: AddressCreateReq = {
      userId,
      address,
      detailAddress,
      recipientName,
      recipientPhoneNumber: phoneNumber,
      deliveryMessage,
      default: isDefault,
    };

    dispatch(addAddress(addressData));
    navigate('/mypage/address');
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          registerAddress();
          alert('배송지 추가 완료');
        }}
        className="flex flex-col space-y-6"
      >
        <h2 className="text-2xl font-bold text-[#A83E3E] text-center mb-4 font-montserrat">
          배송지 등록
        </h2>

        <div>
          <label className="block text-lg font-bold text-[#A83E3E] mb-2 font-montserrat">
            이름 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="받으실 분의 이름을 입력해주세요"
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
          <div className="flex gap-2 justify-between items-center mb-2">
            <input
              type="text"
              placeholder="우편번호"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[#E4E7EC] bg-gray-50 font-montserrat focus:outline-none focus:ring-2 focus:ring-[#A83E3E] transition"
              required
            />
            <button
              type="button"
              className="w-[72px] px-4 py-2 bg-[#A83E3E] text-white whitespace-nowrap font-bold rounded-lg hover:bg-[#7a2229] transition font-montserrat text-sm"
            >
              검색
            </button>
          </div>
          <input
            type="text"
            placeholder="기본주소 (시, 구, 동 등)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-[#E4E7EC] bg-gray-50 font-montserrat focus:outline-none focus:ring-2 focus:ring-[#A83E3E] transition mb-2"
            required
          />
          <input
            type="text"
            placeholder="상세주소 (아파트, 빌라, 동호수 등)"
            value={detailAddress}
            onChange={(e) => setDetailAddress(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-[#E4E7EC] bg-gray-50 font-montserrat focus:outline-none focus:ring-2 focus:ring-[#A83E3E] transition"
          />
        </div>

        <div>
          <label className="block text-lg font-bold text-[#A83E3E] mb-2 font-montserrat">
            전화번호 <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            placeholder="010-1234-5678"
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

          {deliveryMessage !== '직접 입력' ? (
            <select
              value={deliveryMessage}
              onChange={(e) => setDeliveryMessage(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[#E4E7EC] bg-gray-50 font-montserrat focus:outline-none focus:ring-2 focus:ring-[#A83E3E] transition"
            >
              {DELIVERY_MESSAGE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              placeholder="배송 메시지를 입력해주세요"
              value={deliveryMessage}
              onChange={(e) => setDeliveryMessage(e.target.value)}
              onBlur={() => {
                if (!deliveryMessage) setDeliveryMessage('');
              }}
              className="w-full px-4 py-2 rounded-lg border border-[#E4E7EC] bg-gray-50 font-montserrat focus:outline-none focus:ring-2 focus:ring-[#A83E3E] transition"
            />
          )}
        </div>

        <div className="flex justify-start items-center gap-2">
          <input
            type="checkbox"
            className="w-5 h-5"
            value={isDefault.toString()}
            onChange={() => setIsDefault(!isDefault)}
          />
          <label className="block font-bold font-montserrat">
            기본 배송지로 설정
          </label>
        </div>

        <div className="flex justify-between gap-4 pt-4">
          <button
            type="submit"
            className="w-1/2 px-4 py-2 bg-[#A83E3E] text-white font-bold rounded-lg hover:bg-[#7a2229] transition font-montserrat"
            onClick={registerAddress}
          >
            추가하기
          </button>

          <Link
            to="/mypage/address"
            className="w-1/2 px-4 py-2 bg-gray-700 text-white font-bold rounded-lg hover:bg-[#7a2229] transition font-montserrat text-center"
          >
            목록으로 돌아가기
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddressRegister;
