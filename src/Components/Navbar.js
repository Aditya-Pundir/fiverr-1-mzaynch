import React from "react";
import { NavLink } from "react-router-dom";
import "../Styles/Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <div className="inner-container inner-1">
        <NavLink activeClassName="active" exact className="link" to="/">
          Home
        </NavLink>
        <NavLink activeClassName="active" exact className="link" to="/blog">
          Blog
        </NavLink>
      </div>
      <div className="inner-container inner-2">
        <NavLink exact className="link" to="/">
          <img className="logo" src="logo192.png" alt="" />
        </NavLink>
      </div>
      <div className="inner-container inner-3">
        <NavLink
          activeClassName="active"
          exact
          className="link contact"
          to="/contact"
        >
          Contact
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
