import React from "react";
import { Link } from "react-router-dom";
import "../SignUp/SignUpStyle.css";

function ForgetPass() {
  const RequestPass = () => {
    
  };

  return (
    <div className="mySign">
      <div
        className="container"
        style={{ opacity: 0.9, marginTop: "72.5px", marginBottom: "182.5px" }}
      >
        <form className="form-signup" onSubmit={(e) => e.preventDefault()}>
          <h2>Register Form</h2>
          <p>Create your account here</p>
          <div className="form-group">
            <div className="row">
              <div className="col-md-5">
                <label htmlFor="Username">Username:</label>
              </div>
              <div className="col-md-7">
                <input
                  type="text"
                  name="Username"
                  className="form-control"
                  id="Username"
                  placeholder="Username"
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-md-5">
                <label htmlFor="email">Email:</label>
              </div>
              <div className="col-md-7">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  placeholder="E-mail"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <button
              id="myButton"
              className="btn btn-block"
              onClick={RequestPass}
            >
              Request Password
            </button>
          </div>

          <div className="center">
            Remembered your password? <b>Log in </b>
            <Link to="LogIn">Here</Link>
          </div>
          <div className="center">
            Don't have an <b>account?</b> <Link to="SignUp">Register here</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgetPass;
