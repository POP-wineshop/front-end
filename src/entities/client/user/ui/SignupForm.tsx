import SignupInput from './SignupInput';
import { useSignup } from '../model';

const SignupForm = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    pwForConfirming,
    setPwForConfirming,
    name,
    setName,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    handleSignup,
  } = useSignup();

  return (
    <form
      onSubmit={handleSignup}
      className="mx-auto flex flex-col gap-4 w-full max-w-md min-w-[400px] p-8 bg-white rounded-xl shadow-md"
    >
      <p className="font-mapodacapo italic text-3xl font-bold text-center mb-4">
        Sign Up
      </p>

      <SignupInput
        id="username"
        label="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="아이디를 입력해주세요"
      >
        <button
          type="button"
          className="w-1/4 px-4 py-2 border border-[#6A1B1A] rounded-md bg-[#6A1B1A] text-white whitespace-nowrap hover:bg-[#8B2E2E] hover:border-[#8B2E2E] transition-colors duration-150"
        >
          <span>중복 확인</span>
        </button>
      </SignupInput>

      <SignupInput
        id="password"
        label="비밀번호"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호를 입력해주세요"
      />

      <SignupInput
        id="pwForConfirming"
        label="비밀번호 확인"
        type="password"
        value={pwForConfirming}
        onChange={(e) => setPwForConfirming(e.target.value)}
        placeholder="비밀번호를 다시 입력해주세요"
      />

      <SignupInput
        id="name"
        label="사용자 이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름을 입력해주세요"
      />

      <SignupInput
        id="email"
        label="이메일 주소"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="메일 주소를 입력해주세요"
      >
        <button
          type="button"
          className="w-1/4 px-4 py-2 border border-[#6A1B1A] rounded-md bg-[#6A1B1A] text-white whitespace-nowrap hover:bg-[#8B2E2E] hover:border-[#8B2E2E] transition-colors duration-150"
        >
          <span>중복 확인</span>
        </button>
      </SignupInput>

      <SignupInput
        id="phone"
        label="전화번호"
        type="tel"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="전화번호를 입력해주세요"
      >
        <button
          type="button"
          className="w-1/4 px-4 py-2 border border-[#6A1B1A] rounded-md bg-[#6A1B1A] text-white whitespace-nowrap hover:bg-[#8B2E2E] hover:border-[#8B2E2E] transition-colors duration-150"
        >
          <span>중복 확인</span>
        </button>
      </SignupInput>

      <button
        type="submit"
        className="mt-4 py-2 bg-[#6A1B1A] text-white font-semibold rounded-md hover:bg-[#4E1212] transition"
      >
        회원 가입
      </button>
    </form>
  );
};

export default SignupForm;
