import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="navlink">
      <Link to="/">Home </Link>
      <Link to="/login">User Login </Link>
      <Link to="/Register">User Signup </Link>
      <Link to="/feedback">Feedback </Link>
    </div>
  );
};

export default Navigation;
