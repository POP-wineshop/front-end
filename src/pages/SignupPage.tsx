import { SignupForm } from 'entities/client/user/ui';

const SignupPage = () => {
  return (
    <>
      <div
        className="m-auto w-full py-32"
        // 스크린 높이 - 헤더 높이 (120px)
        // style={{ minHeight: 'calc(100vh - 120px)' }}
      >
        <SignupForm />
      </div>
    </>
  );
};

export default SignupPage;
