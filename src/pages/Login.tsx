import { FormEvent, useState } from "react";
import authApi from "../shared/api/auth";
import { useActionCreators } from "../shared/hooks/store";
import { userActions } from "../store/slices/userSlice";

import "./Login.scss";

export default function Login() {
  const actions = useActionCreators(authApi);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handelSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    actions.login({ username, password });
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
