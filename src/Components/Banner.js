import React from "react";
import "../Styles/Banner.css";

function Banner() {
  return (
    <div className="banner">
      <div className="banner-text-container">
        <h1 className="slogan">
          Your destination for outsourced accurate bookkeeping
        </h1>
        <p className="banner-slogan-desc">
          Nano Bookkeepers provides finance, accounting, bookkeeping services
          for startups and growing businesses.
        </p>
      </div>
      <div className="imgContainer">
        <img src="assets/banner.png" alt="Pic unavailable" className="image" />
      </div>
    </div>
  );
}

export default Banner;
