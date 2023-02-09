import LoginForm from "../components/LoginForm/LoginForm";

import authApi from "../shared/api/auth";
import { useActionCreators } from "../shared/hooks/store";

import type { UserData } from "../shared/types/User";

function Login() {
  const actions = useActionCreators(authApi);

  const handleLogin = (userData: UserData) => actions.login(userData);
  const handleRegister = (userData: UserData) => actions.register(userData);
  const handleGoogleLogin = () => actions.googleLogin();

  return (
    <div className="pageWrapper">
      <div className="container">
        <div>
          <LoginForm
            onLogin={handleLogin}
            onRegister={handleRegister}
            onGoogleLogin={handleGoogleLogin}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
