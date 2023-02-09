import { FormEvent, useState } from "react";

import authApi from "../shared/api/auth";
import { useActionCreators } from "../shared/hooks/store";

import "./Login.scss";

export default function Login() {
  const actions = useActionCreators(authApi);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handelLogin = () => actions.login({ username, password });
  const handleRegister = () => actions.register({ username, password });
  const handleGoogleAuth = () => actions.googleLogin();

  return (
    <div className="pageWrapper">
      <div className="container">
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
            <button onClick={handelLogin}>Sign in</button>
            <button onClick={handleRegister}>Sign up</button>
            <button onClick={handleGoogleAuth}>G</button>
          </div>
        </form>
      </div>
    </div>
  );
}
