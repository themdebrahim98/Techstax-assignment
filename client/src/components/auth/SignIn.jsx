// SignIn.js
import React, { useState } from "react";
import "./SignIn.css";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      await dispatch(signIn({ email, password }));
      navigate("/");
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const message = error.response.message;
        if (status === 401) {
          alert(message);
        }
      }
      alert("Something went wrong!");
      console.log(error);
    }
  };

  const isProcessing = authState.signInLoading !== "idle";

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2 className="signin-header">Sign In</h2>
        <form className="signin-form" onSubmit={handleSubmit}>
          <input
            className="signin-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            name="email"
          />
          <input
            className="signin-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            required
          />
          <button
            className="signin-button"
            type="submit"
            disabled={isProcessing}
          >
            {isProcessing ? "Signing..." : "Sign in"}
          </button>
          <p style={{ textAlign: "center", marginTop: "10px" }}>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "blue" }}>
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
