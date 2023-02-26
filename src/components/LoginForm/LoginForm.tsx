import { useForm } from 'react-hook-form';

import { useTranslation } from 'react-i18next';

import type { UserData } from '../../shared/types/user';
import { ReactComponent as Eye } from '../../assets/images/icons/eye.svg';
import { ReactComponent as GoogleIcon } from '../../assets/images/icons/google.svg';

import './LoginForm.scss';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';

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
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<IFormInputs>();
  const beamRef = useRef<HTMLDivElement>(null);
  const eyeRef = useRef<HTMLButtonElement>(null);

  const [passwordType, setPasswordType] = useState<string>('password');

  const handleLogin = (data: IFormInputs) => {
    onLogin(data);
  };
  const handleGoogleLogin = () => {
    onGoogleLogin();
  };
  const handleRegister = (data: IFormInputs) => {
    onRegister(data);
  };
  const { t } = useTranslation();

  const handleEyeClick: MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();
    document.body.classList.toggle('show-password');
    if (beamRef.current) {
      beamRef.current.classList.toggle('active');
    }
    setPasswordType(prevState =>
      prevState === 'password' ? 'text' : 'password'
    );
    setFocus('password');
  };

  const mouseMoveHandler = (e: MouseEvent) => {
    const rect = beamRef.current?.getBoundingClientRect();
    if (rect) {
      const angle = Math.atan2(e.clientY - rect.y, e.clientX - rect.x);
      if (beamRef.current) {
        beamRef.current.style.transform = `rotate(${angle / 7}rad)`;
      }
    }
  };

  useEffect(() => {
    document.documentElement.addEventListener('mousemove', mouseMoveHandler);
    return () => {
      document.documentElement.removeEventListener(
        'mousemove',
        mouseMoveHandler
      );
    };
  }, []);

  return (
    <form className="loginForm">
      {isError && <p className="error">{t('loginPage.serverError')}</p>}
      <div className="formGroup">
        <div className="inputWrapper">
          <input
            className="input"
            type="text"
            {...register('username', {
              required: `${t('loginPage.fillTheField')}`,
              minLength: {
                value: 3,
                message: t('loginPage.usernameError'),
              },
            })}
            placeholder={t('loginPage.username') || 'Username'}
          />
        </div>
        {errors?.username && <p className="error">{errors.username.message}</p>}
      </div>
      <div className="formGroup">
        <div className="inputWrapper">
          <input
            className="input password"
            type={passwordType}
            {...register('password', {
              required: `${t('loginPage.fillTheField')}`,
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/,
                message: t('loginPage.passwordError'),
              },
            })}
            placeholder={t('loginPage.password') || 'Password'}
          />
          <button
            className="eye"
            type="button"
            ref={eyeRef}
            onClick={handleEyeClick}
          >
            <Eye className="eyeIcon" />
          </button>
          <div className="beamWrapper">
            <div className="beam" ref={beamRef}></div>
          </div>
        </div>
        {errors?.password && <p className="error">{errors.password.message}</p>}
      </div>
      <div className="loginControls">
        <button
          className="btn"
          disabled={isSubmitting}
          onClick={handleSubmit(handleLogin)}
        >
          {t('loginPage.signIn')}
        </button>
        <button
          className="btn"
          disabled={isSubmitting}
          onClick={handleSubmit(handleRegister)}
        >
          {t('loginPage.signUp')}
        </button>
        <button
          className="btn soc"
          type="button"
          disabled={isSubmitting}
          onClick={handleGoogleLogin}
          title={t('loginPage.google') || ''}
        >
          <GoogleIcon className="googleIcon" />
          <span className="socText">{t('loginPage.google')}</span>
        </button>
      </div>
    </form>
  );
}
