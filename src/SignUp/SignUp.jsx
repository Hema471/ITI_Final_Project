import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUpStyle.css";

function SignUp({ addUser }) {
  const [formData, setFormData] = useState({
    Username: "",
    email: "",
    Password: "",
    Repassword: "",
    receiveEmails: false,
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const isValidEmail = (email) => {
    // Regular expression
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.Username.trim()) {
      newErrors.Username = "Username is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.Password.trim()) {
      newErrors.Password = "Password is required";
    }

    if (formData.Password !== formData.Repassword) {
      newErrors.Repassword = "Passwords do not match";
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms";
    }

    if (Object.keys(newErrors).length === 0) {
      addUser(formData);
      setFormData({
        Username: "",
        email: "",
        Password: "",
        Repassword: "",
        receiveEmails: false,
        termsAccepted: false,
      });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="mySign">
      <div style={{ opacity: 0.9, margin: "72.5px" }}>
        <form className="form-signup" onSubmit={handleSubmit}>
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
                  value={formData.Username}
                  onChange={handleChange}
                />
                {errors.Username && <p className="error">{errors.Username}</p>}
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
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-md-5">
                <label htmlFor="Password">Password:</label>
              </div>
              <div className="col-md-7">
                <input
                  type="password"
                  name="Password"
                  className="form-control"
                  id="Password"
                  placeholder="Password"
                  value={formData.Password}
                  onChange={handleChange}
                />
                {errors.Password && <p className="error">{errors.Password}</p>}
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-md-5">
                <label htmlFor="Repassword">Confirm Password:</label>
              </div>
              <div className="col-md-7">
                <input
                  type="password"
                  name="Repassword"
                  className="form-control"
                  id="Repassword"
                  placeholder="Confirm Password"
                  value={formData.Repassword}
                  onChange={handleChange}
                />
                {errors.Repassword && (
                  <p className="error">{errors.Repassword}</p>
                )}
              </div>
            </div>
          </div>
          <div className="form-group">
            <p>
              <input
                className="mx-1"
                type="checkbox"
                id="terms"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
              />
              I accept the <Link to="/terms">Terms of use</Link> and{" "}
              <Link to="/privacy">Privacy Policy</Link>
              {errors.termsAccepted && (
                <p className="error">{errors.termsAccepted}</p>
              )}
            </p>
          </div>
          <div className="row">
            <button className="btn btn-block" type="submit">
              Sign-Up
            </button>
          </div>
          <div className="center">
            Already have an account? <b>Log in</b> <Link to="/Login">Here</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
