import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../api/signupUser';

export function useSignup() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [pwForConfirming, setPwForConfirming] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== pwForConfirming) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      await signupUser({
        name,
        username,
        password,
        // email,
        // phoneNumber,
      }).then((res) => {
        console.log(res);
      });
      alert('회원가입 성공!');
      navigate('/login');
    } catch (error) {
      alert('회원가입에 실패했습니다');
    }
  };

  return {
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
  };
}
