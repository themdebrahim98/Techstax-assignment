// SignUp.js
import React, { useState } from "react";
import "./SignUp.css";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      await dispatch(signUp({ email, password }));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-header">Sign Up</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            className="signup-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="signup-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="signup-button" type="submit">
            Sign Up
          </button>
          <p style={{ textAlign: "center", marginTop: "10px" }}>
            Already have an account?{" "}
            <Link to="/signin" style={{ color: "blue" }}>
              Sign in here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
