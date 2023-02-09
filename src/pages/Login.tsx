import { FormEvent, useState } from "react";
import authApi from "../api/auth";

import "./Login.scss";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handelSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const res = await authApi.login({ username, password });
    console.log(res);
  };

  return (
    <div className="pageWrapper">
      <div className="container">
        <form className="loginForm" onSubmit={handelSubmit}>
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
            <button type="submit">Login</button>
            <button>G</button>
          </div>
        </form>
      </div>
    </div>
  );
}
