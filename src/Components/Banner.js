import React from "react";
import "../Styles/Banner.css";

function Banner() {
  return (
    <div className="banner">
      <h1 className="slogan">Your Destination for Accurate Bookkeeping</h1>
      <div className="imgContainer">
        <img src="assets/banner.png" alt="Pic unavailable" className="image" />
      </div>
    </div>
  );
}

export default Banner;
