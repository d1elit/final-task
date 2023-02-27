import LoginForm from '../components/LoginForm/LoginForm';

import withoutAuth from '../shared/hoc/withoutAuth';
import { useActionCreators, useAppSelector } from '../shared/hooks/store';
import authApi from '../shared/api/auth';

import type { UserData } from '../shared/types/user';

function Login() {
  const actions = useActionCreators(authApi);

  const status = useAppSelector(state => state.user.status);
  const error = useAppSelector(state => state.user.error);

  const handleLogin = (userData: UserData) => {
    void actions.login(userData);
  };

  const handleRegister = (userData: UserData) => {
    void actions.register(userData);
  };

  const handleGoogleLogin = () => {
    void actions.googleLogin();
  };

  return (
    <div className="pageWrapper">
      <div className="container">
        <div>
          <LoginForm
            isError={status === 'error' && error !== 'Unauthorized'}
            error={error}
            onLogin={handleLogin}
            onRegister={handleRegister}
            onGoogleLogin={handleGoogleLogin}
          />
        </div>
      </div>
    </div>
  );
}

export default withoutAuth(Login);
