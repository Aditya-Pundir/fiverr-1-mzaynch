import React from "react";
import { NavLink } from "react-router-dom";
import "../Styles/Footer.css";

function Footer() {
  return (
    <div className="footer-outer-container">
      <div className="footer-inner-container">
        <div className="footer-heading-container">
          <img
            src="logo-2.jpg"
            alt="Nano Bookkeepers"
            className="footer-logo"
          />
          <h2 className="footer-heading">
            Your Destination for Accurate Bookkeeping
          </h2>
        </div>
        <p className="footer-description">
          Nano Bookkeepers provides finance, accounting, bookkeeping services
          for startups and growing businesses.
        </p>
        <NavLink className="footer-contact-btn" exact="true" to="/contact">
          Talk to an expert
        </NavLink>
      </div>
    </div>
  );
}

export default Footer;
