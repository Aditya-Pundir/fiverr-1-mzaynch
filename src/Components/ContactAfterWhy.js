import React from "react";
import { NavLink } from "react-router-dom";
import "../Styles/ContactAfterWhy.css";

function ContactAfterWhy() {
  return (
    <div className="contact-after-why-container">
      <NavLink className="contact-btn" exact="true" to="/contact">
        Talk to an expert
      </NavLink>
    </div>
  );
}

export default ContactAfterWhy;
