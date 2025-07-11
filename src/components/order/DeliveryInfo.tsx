import { useState } from 'react';

const DeliveryInfo = () => {
  const [receiverName, setReceiverName] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [receiverAddress, setReceiverAddress] = useState<string>('');
  const [receiverPhoneNumber, setReceiverPhoneNumber] = useState<string>('');
  const [deliveryMessage, setDeliveryMessage] = useState<string>('');

  const messageOptions = [
    `배송 전에 미리 연락바랍니다.`,
    `부재 시 경비실에 맡겨주세요.`,
    `부재 시 문 앞에 놓아주세요.`,
    `빠른 배송 부탁드립니다.`,
    `택배함에 보관해 주세요.`,
    `직접 입력`,
  ];

  return (
    <>
      <div className="delivery-info flex flex-col gap-3">
        <div className="delivery-info-header">
          <p className="text-2xl font-bold">배송 정보</p>
        </div>
        <hr />
        <div className="flex flex-col gap-3">
          <div className="delivery-info-select">
            <span className="mr-4 underline cursor-pointer">최근 배송지</span>
            <span className="underline cursor-pointer">직접 입력</span>
          </div>
          <div className="delivery-info-default">
            <div className="flex flex-col gap-3">
              <div className="w-full flex">
                <div className="w-1/2 text-left">
                  <span>&#91;기본&#93; </span>
                  {/* <span>{receiverName}</span> */}
                  <span>김와인</span>
                </div>
                <div className="w-1/2 text-right underline cursor-pointer">
                  <span>배송지 목록</span>
                </div>
              </div>
              <p>
                <span>&#91;01111&#93; </span>
                <span>서울 종로구 XXX길 12-3</span>
                {/* <span>&#91;{zipCode}&#93; </span>
              <span>{receiverAddress}</span> */}
              </p>
              <p>
                {/* <span>{receiverPhoneNumber}</span> */}
                <span>010-XXXX-XXXX</span>
              </p>
              <div className="delivery-message">
                <p className="mb-1 font-semibold">배송 메시지</p>
                <select
                  className="border w-full  "
                  value={deliveryMessage}
                  onChange={(e) => setDeliveryMessage(e.target.value)}
                >
                  <option value="">
                    메시지를 선택해주세요 &#40;선택사항&#41;
                  </option>
                  {messageOptions.map((message, index) => (
                    <option value={message} key={index}>
                      {message}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeliveryInfo;
