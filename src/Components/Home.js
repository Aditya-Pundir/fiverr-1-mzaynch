import React from "react";
import Banner from "./Banner";
// import Articles from "./Articles";
// import Contact from "./Contact";
import "../Styles/Home.css";

function Home({ server }) {
  return (
    <>
      <Banner server={server} />
    </>
  );
}

export default Home;
