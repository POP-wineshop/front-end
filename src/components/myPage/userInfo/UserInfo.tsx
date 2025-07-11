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
    <div className="flex flex-col space-y-6 p-6">
      {/* 아이디 */}
      <div>
        <label
          htmlFor="userId"
          className="block text-lg font-semibold text-gray-800 mb-2"
        >
          아이디 <span className="text-red-500">*</span>
        </label>
        <input
          id="userId"
          type="text"
          placeholder={userInfo.id}
          defaultValue={userInfo.id}
          className="w-1/3 px-4 py-2 border border-gray-300 text-gray-300 rounded-md focus:outline-none focus:ring-2"
          readOnly
        />
        <p className="text-xs text-gray-500 mt-2">
          (영문 소문자 / 숫자 / 특수문자 포함 4~16자)
        </p>
      </div>

      {/* 이름 */}
      <div>
        <label
          htmlFor="userName"
          className="block text-lg font-semibold text-gray-800 mb-2"
        >
          이름 <span className="text-red-500">*</span>
        </label>
        <input
          id="userName"
          type="text"
          placeholder={userInfo.name}
          defaultValue={userInfo.name}
          className="w-1/3 px-4 py-2 border border-gray-300 text-gray-300 rounded-md focus:outline-none focus:ring-2"
          readOnly
        />
      </div>

      {/* 이메일 */}
      <div>
        <label
          htmlFor="eamil"
          className="block text-lg font-semibold text-gray-800 mb-2"
        >
          이메일 <span className="text-red-500">*</span>
        </label>
        <div className="flex justify-between">
          {!isEmailOnUpdate ? (
            <>
              <input
                id="email"
                type="text"
                placeholder={userInfo.email}
                defaultValue={userInfo.email}
                className="w-1/2 px-4 py-2 border border-gray-300 text-gray-300 rounded-md focus:outline-none focus:ring-2"
                readOnly
              />
              <button
                type="button"
                className="px-4 py-2 bg-gray-500 text-white text-sm rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2"
                onClick={() => setIsEmailOnUpdate(true)}
              >
                이메일 변경
              </button>
            </>
          ) : (
            <>
              <div className="w-1/2 flex gap-2">
                <input
                  id="email"
                  type="text"
                  placeholder="변경하실 이메일을 적어주세요"
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white text-sm rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={() => setIsEmailOnUpdate(false)}
                >
                  변경
                </button>
              </div>
              <button
                type="button"
                className="px-4 py-2 bg-gray-500 text-white text-sm rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                onClick={() => setIsEmailOnUpdate(false)}
              >
                이메일 변경 취소
              </button>
            </>
          )}
        </div>
      </div>

      {/* 전화번호 */}
      <div>
        <label
          htmlFor="mobile1"
          className="block text-lg font-semibold text-gray-800 mb-2"
        >
          전화번호 <span className="text-red-500">*</span>
        </label>
        <div className="flex justify-between">
          <div className="w-1/2 flex justify-between items-center gap-2">
            <input
              id="mobile1"
              name="mobile1"
              className="w-[120px] px-4 py-2 border border-gray-300 text-gray-300 text-center rounded-md focus:outline-none focus:ring-2"
              value={userInfo.phoneNumber.split('-')[0]}
              readOnly
            ></input>
            {/* <select
                  id="mobile1"
                  name="mobile1"
                  className="w-[120px] px-4 py-2 border border-gray-300 text-gray-300 text-center rounded-md focus:outline-none focus:ring-2"
                  value={userInfo.phoneNumber.split('-')[0]}
                >
                  <option value="010">010</option>
                  <option value="011">011</option>
                  <option value="016">016</option>
                  <option value="017">017</option>
                  <option value="018">018</option>
                  <option value="019">019</option>
                </select>*/}
            <span>-</span>

            <input
              type="text"
              id="mobile2"
              name="mobile2"
              maxLength={4}
              placeholder="XXXX"
              className="w-[120px] px-4 py-2 border border-gray-300 text-gray-300 text-center rounded-md focus:outline-none focus:ring-2"
              defaultValue={userInfo.phoneNumber.split('-')[1]}
              readOnly
              // onChange={handleChange}
            />

            <span>-</span>

            <input
              type="text"
              id="mobile3"
              name="mobile3"
              maxLength={4}
              placeholder="XXXX"
              className="w-[120px] px-4 py-2 border border-gray-300 text-gray-300 text-center rounded-md focus:outline-none focus:ring-2"
              defaultValue={userInfo.phoneNumber.split('-')[2]}
              readOnly
              // onChange={handleChange}
            />
          </div>

          <button
            type="button"
            className="px-4 py-2 bg-gray-500 text-white text-sm rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            // onClick={handleSendVerification}
          >
            본인인증으로 정보 수정하기
          </button>
        </div>
        {/* 성공/실패 메시지는 조건부 렌더링
            {sendFail && (
              <p className="text-sm text-red-500 mt-1">
                인증번호 발송에 실패했습니다.
              </p>
            )}
            {sendSuccess && (
              <ul className="text-sm text-green-600 mt-1">
                <li>인증번호가 발송되었습니다.</li>
                <li>받지 못했다면 번호를 다시 확인하세요.</li>
              </ul>
            )} */}
      </div>

      <div className="flex justify-between gap-4">
        <button className="w-1/3 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
          회원 정보 수정
        </button>
        <button className="w-1/3 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300">
          비밀번호 변경
        </button>
        <button className="w-1/3 px-4 py-2 bg-red-400 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300">
          회원 탈퇴
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
