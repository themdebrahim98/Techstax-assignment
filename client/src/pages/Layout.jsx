import React, { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  );
}
