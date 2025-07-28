import { useState } from 'react';

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState({
    id: 'testuser01',
    name: '김예시',
    email: 'testuseremail@example.com',
    phoneNumber: '010-XXXX-XXXX',
  });
  const [isEmailOnUpdate, setIsEmailOnUpdate] = useState<boolean>(false);

  return (
    <div className="bg-white/80 rounded-2xl shadow-md p-8 w-full flex flex-col space-y-8">
      {/* 아이디 */}
      <div>
        <label className="block text-lg font-bold text-[#A83E3E] mb-2">
          아이디 <span className="text-red-500">*</span>
        </label>
        <input
          readOnly
          className="w-1/3 px-4 py-2 rounded-lg border border-[#E4E7EC] bg-gray-50 text-gray-400 font-montserrat focus:outline-none focus:ring-2 focus:ring-[#A83E3E] transition"
          value={userInfo.id}
        />
        <p className="text-xs text-gray-400 mt-2 font-montserrat">
          (영문 소문자 / 숫자 / 특수문자 포함 4~16자)
        </p>
      </div>

      {/* 이름 */}
      <div>
        <label className="block text-lg font-bold text-[#A83E3E] mb-2">
          이름 <span className="text-red-500">*</span>
        </label>
        <input
          readOnly
          className="w-1/3 px-4 py-2 rounded-lg border border-[#E4E7EC] bg-gray-50 text-gray-400 font-montserrat focus:outline-none focus:ring-2 focus:ring-[#A83E3E] transition"
          value={userInfo.name}
        />
      </div>

      {/* 이메일 */}
      <div>
        <label className="block text-lg font-bold text-[#A83E3E] mb-2">
          이메일 <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          {!isEmailOnUpdate ? (
            <>
              <input
                readOnly
                className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-[#E4E7EC] bg-gray-50 text-gray-400 font-montserrat focus:outline-none focus:ring-2 focus:ring-[#A83E3E] transition"
                value={userInfo.email}
              />
              <button
                className="mt-2 md:mt-0 px-4 py-2 bg-[#A83E3E] text-white font-bold rounded-lg hover:bg-[#7a2229] transition font-montserrat text-sm"
                onClick={() => setIsEmailOnUpdate(true)}
              >
                이메일 변경
              </button>
            </>
          ) : (
            <div className="flex w-full md:w-2/3 gap-2">
              <input
                className="flex-1 px-4 py-2 rounded-lg border border-[#E4E7EC] bg-gray-50 font-montserrat focus:outline-none focus:ring-2 focus:ring-[#A83E3E] transition"
                placeholder="변경하실 이메일을 적어주세요"
              />
              <button
                className="px-4 py-2 bg-[#A83E3E] text-white font-bold rounded-lg hover:bg-[#7a2229] transition font-montserrat text-sm"
                // 이메일 변경 실제 적용 로직
              >
                변경
              </button>
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition font-montserrat text-sm"
                onClick={() => setIsEmailOnUpdate(false)}
              >
                취소
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 전화번호 */}
      <div>
        <label className="block text-lg font-bold text-[#A83E3E] mb-2">
          전화번호 <span className="text-red-500">*</span>
        </label>
        <div className="flex justify-between gap-2">
          <div className="w-1/2 flex items-center gap-2">
            <input
              readOnly
              className="w-[90px] px-3 py-2 rounded-lg border border-[#E4E7EC] bg-gray-50 text-gray-400 font-montserrat text-center focus:outline-none focus:ring-2 focus:ring-[#A83E3E]"
              value={userInfo.phoneNumber.split('-')[0]}
            />
            <span className="text-gray-300">-</span>
            <input
              readOnly
              className="w-[90px] px-3 py-2 rounded-lg border border-[#E4E7EC] bg-gray-50 text-gray-400 font-montserrat text-center focus:outline-none focus:ring-2 focus:ring-[#A83E3E]"
              value={userInfo.phoneNumber.split('-')[1]}
            />
            <span className="text-gray-300">-</span>
            <input
              readOnly
              className="w-[90px] px-3 py-2 rounded-lg border border-[#E4E7EC] bg-gray-50 text-gray-400 font-montserrat text-center focus:outline-none focus:ring-2 focus:ring-[#A83E3E]"
              value={userInfo.phoneNumber.split('-')[2]}
            />
          </div>
          <button className="px-4 py-2 bg-[#A83E3E] text-white font-bold rounded-lg hover:bg-[#7a2229] transition font-montserrat text-sm">
            본인인증으로 정보 수정하기
          </button>
        </div>
      </div>

      {/* 버튼그룹 */}
      <div className="flex justify-between gap-4">
        <button className="w-1/3 px-4 py-2 bg-gray-700 text-white font-bold rounded-lg hover:bg-[#7a2229] transition font-montserrat">
          회원 정보 수정
        </button>
        <button className="w-1/3 px-4 py-2 bg-gray-700 text-white font-bold rounded-lg hover:bg-[#7a2229] transition font-montserrat">
          비밀번호 변경
        </button>
        <button className="w-1/3 px-4 py-2 bg-red-400 text-white font-bold rounded-lg hover:bg-red-600 transition font-montserrat">
          회원 탈퇴
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
