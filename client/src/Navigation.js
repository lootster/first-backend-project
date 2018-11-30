import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="navlink">
      <NavLink to="/">Home </NavLink>
      <NavLink to="/login">User Login </NavLink>
      <NavLink to="/register">User Signup </NavLink>
      <NavLink to="/feedback">Feedback </NavLink>
    </div>
  );
};

export default Navigation;
