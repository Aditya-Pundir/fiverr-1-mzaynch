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
            Your destination for outsourced accurate bookkeeping
          </h2>
        </div>
        <p className="footer-description">
          Nano Bookkeepers provides finance, accounting, bookkeeping services
          for startups and growing businesses.
        </p>
        <NavLink className="footer-contact-btn" exact="true" to="/contact">
          Talk to an expert
        </NavLink>
        <div className="copyright-container">
          <span className="copyright">
            Copyright &copy; 2022 Nano Bookkeepers
          </span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
