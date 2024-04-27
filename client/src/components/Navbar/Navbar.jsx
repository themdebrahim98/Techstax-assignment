import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/userSlice";

const Navbar = () => {
  const state = useSelector((state) => state.auth);
  const isAuthenticated = state.isAuthenticated;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await dispatch(signOut());
    navigate("/signin");
  };

  return (
    <nav className="navbar">
      <div className="container">
        <h1 className="logo">
          <Link to={"/"}>Logo</Link>
        </h1>
        <ul className="nav-links">
          {isAuthenticated && (
            <>
              <li>{state.user.email}</li>
              <li onClick={handleLogout}>Logout</li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
