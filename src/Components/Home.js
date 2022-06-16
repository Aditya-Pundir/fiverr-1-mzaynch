import React from "react";
import Articles from "./Articles";
import Banner from "./Banner";
// import Contact from "./Contact";
import "../Styles/Home.css";

function Home({ server }) {
  return (
    <>
      <Banner server={server} />
      <Articles server={server} />
    </>
  );
}

export default Home;
