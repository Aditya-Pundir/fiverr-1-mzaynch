import React from "react";
import Articles from "./Articles";
import "../Styles/Blog.css";

function Blog({ server }) {
  document.title = "Nano Book Keepers | Blog";
  return (
    <>
      <Articles server={server} />
    </>
  );
}

export default Blog;
