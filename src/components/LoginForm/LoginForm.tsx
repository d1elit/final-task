import { MouseEventHandler, useState } from "react";

import { UserData } from "../../shared/types/User";

import "./LoginForm.scss";

interface Props {
  onLogin(userData: UserData): void;
  onGoogleLogin(): void;
  onRegister(userData: UserData): void;
}

export default function LoginForm({
  onLogin,
  onGoogleLogin,
  onRegister,
}: Props) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    onLogin({ username, password });
  };
  const handleGoogleLogin: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    onGoogleLogin();
  };
  const handleRegister: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    onRegister({ username, password });
  };

  return (
    <form className="loginForm">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <div className="loginControls">
        <button onClick={handleLogin}>Sign in</button>
        <button onClick={handleRegister}>Sign up</button>
        <button onClick={handleGoogleLogin}>G</button>
      </div>
    </form>
  );
}
