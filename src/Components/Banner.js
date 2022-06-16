import React from "react";
import "../Styles/Banner.css";
import { NavLink } from "react-router-dom";

function Banner() {
  return (
    <div className="banner">
      <h1 className="slogan">Your Destination for Accurate Bookkeeping</h1>
      <div className="imgContainer">
        <NavLink className="contact" exact to="/contact">
          Contact
        </NavLink>
        <img src="BannerImg.png" alt="Pic unavailable" className="image" />
      </div>
    </div>
  );
}

export default Banner;
