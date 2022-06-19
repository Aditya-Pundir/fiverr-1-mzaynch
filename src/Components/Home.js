import React from "react";
import Banner from "./Banner";
import Aim from "./Aim";
import ContactAfterWhy from "./ContactAfterWhy";
import Why from "./Why";
import ServicePackages from "./ServicePackages";
import CEO from "./CEO";
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
      <CEO />
    </>
  );
}

export default Home;
