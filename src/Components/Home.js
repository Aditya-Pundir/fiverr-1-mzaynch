import React from "react";
import Banner from "./Banner";
import Aim from "./Aim";
import ContactAfterWhy from "./ContactAfterWhy";
import Why from "./Why";
import ServicePackages from "./ServicePackages";
import "../Styles/Home.css";

function Home({ server }) {
  document.title = "Nano Book Keepers | Home";
  return (
    <>
      <Banner server={server} />
      <Aim />
      <ContactAfterWhy />
      <Why />
      <ServicePackages />
      {/* <div className="headingContainer">
        <div className="line"></div>
        <h3 className="heading">Here we pay attention to nano detail</h3>
        <div className="line"></div>
      </div> */}
      {/* <div className="team-members">
        <div className="team-member">
          <img className="member" src="assets/ceo.webp" alt="CEO" />
          <h4>Mzaynch, CEO</h4>
        </div>
      </div> */}
    </>
  );
}

export default Home;
