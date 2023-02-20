import { useForm } from 'react-hook-form';

import { UserData } from '../../shared/types/user';

import './LoginForm.scss';

interface Props {
  onLogin(userData: UserData): void;
  onGoogleLogin(): void;
  onRegister(userData: UserData): void;
  isError?: boolean;
  error?: string | null;
}

interface IFormInputs {
  username: string;
  password: string;
}

export default function LoginForm({
  onLogin,
  onGoogleLogin,
  onRegister,
  isError,
  error,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInputs>();

  const handleLogin = (data: IFormInputs) => {
    onLogin(data);
  };
  const handleGoogleLogin = () => {
    onGoogleLogin();
  };
  const handleRegister = (data: IFormInputs) => {
    onRegister(data);
  };

  return (
    <form className="loginForm">
      {isError && <p>{error}</p>}
      <input
        type="text"
        {...register('username', {
          required: 'Fill the field',
          minLength: {
            value: 3,
            message: 'Min length 3 characters',
          },
        })}
        placeholder="Username"
      />
      {errors?.username && <p>{errors.username.message}</p>}
      <input
        type="password"
        {...register('password', {
          required: 'Fill the field',
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/,
            message:
              'Invalid password. At least 6 digit characters, spec. characters, \
              Latin, the presence of lowercase and uppercase characters',
          },
        })}
        placeholder="Password"
      />
      {errors?.password && <p>{errors.password.message}</p>}
      <div className="loginControls">
        <button disabled={isSubmitting} onClick={handleSubmit(handleLogin)}>
          Sign in
        </button>
        <button disabled={isSubmitting} onClick={handleSubmit(handleRegister)}>
          Sign up
        </button>
        <button
          type="button"
          disabled={isSubmitting}
          onClick={handleGoogleLogin}
        >
          G
        </button>
      </div>
    </form>
  );
}
