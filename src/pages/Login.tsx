import "./Login.scss";

export default function Login() {
  return (
    <div className="pageWrapper">
      <div className="container">
        <form className="loginForm">
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <div className="loginControls">
            <button>Login</button>
            <button>G</button>
          </div>
        </form>
      </div>
    </div>
  );
}
