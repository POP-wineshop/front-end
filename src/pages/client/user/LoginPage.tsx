import { useLogin } from '@/entities/client/user/model/useLogin';
import LoginForm from '@/entities/client/user/ui/LoginForm';

const LoginPage = () => {
  const { username, setUsername, password, setPassword, handleLogin } =
    useLogin();

  return (
    <div className="w-full">
      <LoginForm
        username={username}
        password={password}
        onUsernameChange={(e) => setUsername(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      />
    </div>
  );
};

export default LoginPage;
