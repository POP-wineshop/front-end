import { useEffect, useState } from 'react';

const DeliveryInfo = () => {
  const [receiverName, setReceiverName] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [receiverAddress, setReceiverAddress] = useState<string>('');
  const [receiverPhoneNumber, setReceiverPhoneNumber] = useState<string>('');
  const [deliveryMessage, setDeliveryMessage] = useState<string>('');
  const [addresses, setAddresses] = useState<AddressRes[] | null>(null);
  const [defaultAddress, setDefaultAddress] = useState<AddressRes | null>(null);
  const [showAddressModal, setShowAddressModal] = useState<boolean>(false);
  const [customDeliveryMessage, setCustomDeliveryMessage] =
    useState<string>('');

  const messageOptions = [
    `배송 전에 미리 연락바랍니다.`,
    `부재 시 경비실에 맡겨주세요.`,
    `부재 시 문 앞에 놓아주세요.`,
    `빠른 배송 부탁드립니다.`,
    `택배함에 보관해 주세요.`,
    `직접 입력`,
  ];

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

  const getDefaultAddress = () => {
    fetch(`http://localhost:8080/api/delivery/default`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('Access Token')}`,
      },
    })
      .then((res) => res.json())
      .then((jsonRes) => {
        console.log(jsonRes.data);
        alert(`기본 배송지 조회 성공`);
        setDefaultAddress(jsonRes.data);
        setReceiverName(jsonRes.data.recipientName);
        // setZipCode(jsonRes.data.zipCode);
        setReceiverAddress(jsonRes.data.address);
        setReceiverPhoneNumber(jsonRes.data.recipientPhoneNumber);
        setDeliveryMessage(jsonRes.data.deliveryMessage);
      })
      .catch((error) => {
        alert(`기본 배송지 조회 실패: ${error}`);
      });
  };

  useEffect(() => {
    getAddresses();
    getDefaultAddress();
  }, []);

  return (
    <div className="bg-white/80 rounded-2xl shadow-md p-8 w-full flex flex-col space-y-6">
      <div className="delivery-info-header">
        <p className="text-2xl font-bold text-[#A83E3E] font-montserrat">
          배송 정보
        </p>
      </div>
      <hr className="border-[#E4E7EC]" />
      <div className="flex flex-col gap-6">
        <div className="delivery-info-select">
          {/* 
            배송지 목록 버튼을 눌렀을 때 Modal을 띄워서 기존 배송지 목록을 보여주는 방식이 UX적으로 가장 직관적입니다.
            아래는 Modal을 띄우는 예시 코드입니다.
          */}
          <button
            type="button"
            className="mr-4 px-4 py-2 rounded-lg border border-[#A83E3E] bg-white text-[#A83E3E] font-montserrat font-semibold shadow-sm hover:bg-[#A83E3E] hover:text-white transition"
            onClick={() => setShowAddressModal(true)}
          >
            배송지 목록
          </button>
          {/* 
            아래 Modal의 바깥 div에 사용된 
            "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
            클래스는 다음과 같은 역할을 합니다:

            - fixed: 화면 전체에 고정 위치로 Modal을 띄웁니다.
            - inset-0: top, right, bottom, left를 모두 0으로 설정해 화면 전체를 덮습니다.
            - z-50: z-index를 50으로 설정해 다른 요소들 위에 Modal이 보이도록 합니다.
            - flex items-center justify-center: Modal 내용을 화면 중앙에 정렬합니다.
            - bg-black bg-opacity-30: 배경을 검은색 30% 투명도로 덮어 Modal 바깥 영역을 어둡게 만듭니다.

            즉, Modal이 화면 중앙에 뜨고, 바깥 영역은 어둡게 처리되어 사용자가 Modal에 집중할 수 있게 해줍니다.
          */}
          {showAddressModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
              <div className="bg-white rounded-xl shadow-lg p-8 w-[400px]">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-[#A83E3E]">
                    배송지 목록
                  </h2>
                  <button
                    className="text-gray-400 hover:text-[#A83E3E] text-2xl"
                    onClick={() => setShowAddressModal(false)}
                  >
                    &times;
                  </button>
                </div>
                {/* 여기에 배송지 목록을 map으로 렌더링 */}
                <ul className="divide-y divide-gray-200 mb-4">
                  {/* 예시 데이터 */}
                  {addresses?.map((address) => (
                    <li
                      className="py-2 cursor-pointer hover:bg-gray-100 rounded px-2"
                      key={address.id}
                      onClick={() => {
                        setReceiverName(address.recipientName);
                        // setZipCode(address.zipCode);
                        setReceiverAddress(address.address);
                        setReceiverPhoneNumber(address.recipientPhoneNumber);
                        setDeliveryMessage(address.deliveryMessage);
                      }}
                    >
                      <div className="font-bold py-2">
                        {address.recipientName}
                      </div>
                      <div className="text-sm text-gray-600">
                        [{address.zipCode}] {address.address}
                      </div>
                      <div className="text-sm text-gray-600">
                        {address.recipientPhoneNumber}
                      </div>
                      <div className="text-sm text-gray-600">
                        {address.deliveryMessage}
                      </div>
                    </li>
                  ))}
                </ul>
                <button
                  className="w-full bg-[#A83E3E] text-white py-2 rounded-lg font-bold hover:bg-[#7a2229] transition"
                  onClick={() => setShowAddressModal(false)}
                >
                  닫기
                </button>
              </div>
            </div>
          )}
          <button
            type="button"
            className="mr-4 px-4 py-2 rounded-lg border border-[#A83E3E] bg-white text-[#A83E3E] font-montserrat font-semibold shadow-sm hover:bg-[#A83E3E] hover:text-white transition"
          >
            최근 배송지
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-lg border border-[#A83E3E] bg-white text-[#A83E3E] font-montserrat font-semibold shadow-sm hover:bg-[#A83E3E] hover:text-white transition"
          >
            직접 입력
          </button>
        </div>
        <div className="delivery-info-default">
          <div className="flex flex-col gap-4">
            <div className="w-full flex">
              <div className="w-1/2 text-left flex items-center">
                <span className="inline-block px-2 py-1 rounded-full bg-[#A83E3E] text-white text-xs font-montserrat font-bold align-middle mr-2 shadow-sm">
                  <span className="font-bold">기본</span>
                </span>
                {/* <span>{receiverName}</span> */}
                <span className="font-montserrat font-bold text-lg">
                  {receiverName}
                </span>
              </div>
              <div className="w-1/2 text-right"></div>
            </div>
            <p className="font-montserrat text-gray-700">
              <span className="text-[#A83E3E] font-bold">&#91;01111&#93; </span>
              <span className="font-semibold">{receiverAddress}</span>
              {/* <span>&#91;{zipCode}&#93; </span>
            <span>{receiverAddress}</span> */}
            </p>
            <p className="font-montserrat text-gray-700">
              {/* <span>{receiverPhoneNumber}</span> */}
              <span className="font-semibold">{receiverPhoneNumber}</span>
            </p>
            <div className="delivery-message">
              <p className="mb-2 font-bold text-[#A83E3E] font-montserrat text-base">
                배송 메시지
              </p>

              {/* "직접 입력"이 선택되면 input으로 변경 */}
              {deliveryMessage === '직접 입력' ? (
                <input
                  type="text"
                  className="border border-[#E4E7EC] w-full px-4 py-2 rounded-lg bg-gray-50 font-montserrat focus:outline-none focus:ring-2 focus:ring-[#A83E3E] transition"
                  placeholder="배송 메시지를 입력해주세요"
                  value={customDeliveryMessage || ''}
                  onChange={(e) => {
                    setCustomDeliveryMessage(e.target.value);
                    setDeliveryMessage('직접 입력');
                  }}
                  onBlur={() => {
                    // input에서 포커스가 빠질 때 customDeliveryMessage가 비어있으면 deliveryMessage도 초기화
                    if (!customDeliveryMessage) setDeliveryMessage('');
                  }}
                />
              ) : (
                <select
                  className="border border-[#E4E7EC] w-full px-4 py-2 rounded-lg bg-gray-50 font-montserrat focus:outline-none focus:ring-2 focus:ring-[#A83E3E] transition"
                  value={deliveryMessage}
                  onChange={(e) => {
                    setDeliveryMessage(e.target.value);
                    if (e.target.value !== '직접 입력')
                      setCustomDeliveryMessage('');
                  }}
                >
                  <option value="" className="font-normal">
                    메시지를 선택해주세요 &#40;선택사항&#41;
                  </option>
                  {messageOptions.map((message, index) => (
                    <option value={message} key={index} className="font-normal">
                      {message}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;
