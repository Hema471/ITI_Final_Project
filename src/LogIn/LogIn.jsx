import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../rtk/MyFav/userSlice";
import "./MyLogIn.css";
import myImage from "./LoginImg.gif";

function LogIn({ users }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = () => {
    const user = users.find(
      (user) => user.Username === username && user.Password === password
    );

    if (user) {
      // Successful login
      setLoginSuccess(true);
      setLoginError("");

      dispatch(loginUser(user));
    } else {
      // Invalid login
      setLoginError("Invalid username or password");
      setLoginSuccess(false);
    }
  };

  return (
    <body
      style={{
        background: "white",
        backgroundImage: "url(Abstract20072.gif)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        display: "block",
      }}
      className="MyLogIn"
    >
      <section className="form my-4 mx-5" style={{ opacity: 0.9 }}>
        <div className="container">
          <div className="row no-gutters">
            <div className="col-lg-5">
              <img
                src={myImage}
                style={{ height: "650px" }}
                className="img-fluid"
                alt=""
              />
            </div>
            <div className="col-lg-7 px-5 pt-5">
              <h1>
                <b>MovieVerse</b>
              </h1>
              <h4 style={{ color: "black" }}>Sign in</h4>
              <form>
                <div className="form-row">
                  <div className="col-lg-7">
                    <input
                      type="text"
                      placeholder="Username"
                      className="form-control my-3 p-2"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-lg-7">
                    <input
                      type="password"
                      placeholder="*********"
                      className="form-control my-3 p-2 UserPass"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-lg-7">
                    <button
                      type="button"
                      className="btn1 mt-3 mb-5"
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                  </div>
                </div>
                <Link to="ForgetPass">Forgot password?</Link>
                {loginError && <p style={{ color: "red" }}>{loginError}</p>}
                {loginSuccess && (
                  <p style={{ color: "green" }}>Login successful</p>
                )}
                <p style={{ color: "black" }}>
                  Don't have an account? <Link to="SignUp">Register here</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </body>
  );
}

export default LogIn;
