import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import "../Styles/Navbar.css";

function Navbar() {
  const responsiveNav = useRef(null);

  function collapseNav() {
    responsiveNav.current.classList.toggle("responsive-collapsed");
    if (responsiveNav.current.classList.length === 2) {
      document.body.style.overflowY = "scroll";
    } else {
      document.body.style.overflowY = "hidden";
    }
  }
  return (
    <>
      <div className="navbar">
        <div className="inner-container inner-1">
          <NavLink exact="true" className="link logo-link" to="/">
            <img className="logo" src="logo192.png" alt="" />
          </NavLink>

          <button className="menu" onClick={() => collapseNav()}>
            <div className="menu-item"></div>
            <div className="menu-item"></div>
            <div className="menu-item"></div>
          </button>
        </div>

        <div className="inner-container inner-2">
          <NavLink
            activeclassname="active"
            exact="true"
            className="link"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            activeclassname="active"
            exact="true"
            className="link"
            to="/blog"
          >
            Blog
          </NavLink>
          <NavLink
            activeclassname="active"
            exact="true"
            className="link contact"
            to="/contact"
          >
            Talk to an expert
          </NavLink>
        </div>
      </div>
      <div className="responsive responsive-collapsed" ref={responsiveNav}>
        <div className="responsive-container">
          <NavLink
            activeclassname="active"
            exact="true"
            className="link link-responsive"
            to="/"
            onClick={() => {
              collapseNav();
            }}
          >
            Home
          </NavLink>
          <NavLink
            activeclassname="active"
            exact="true"
            className="link link-responsive"
            to="/blog"
            onClick={() => {
              collapseNav();
            }}
          >
            Blog
          </NavLink>
          <NavLink
            activeclassname="active"
            exact="true"
            className="link contact link-responsive"
            to="/contact"
            onClick={() => {
              collapseNav();
            }}
          >
            Talk to an expert
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Navbar;
