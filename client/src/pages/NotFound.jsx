import React from "react";
import "./Layout.css";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1 className="title">404 - Page Not Found</h1>
      <p className="message">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
    </div>
  );
};

export default NotFound;
