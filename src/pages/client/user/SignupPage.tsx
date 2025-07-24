import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignupForm from '@/entities/client/user/ui/SignupForm';
import { signupUser } from '@/entities/client/user/api/signupUser';

const SignupPage = () => {
  const navigate = useNavigate();

  return (
    <div className="m-auto w-full py-32">
      <SignupForm />
      <div className="text-center mt-4">
        <span className="text-sm text-gray-600">이미 계정이 있으신가요? </span>
        <Link
          to="/login"
          className="text-sm text-[#6A1B1A] hover:underline font-medium"
        >
          로그인
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
