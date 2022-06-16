import React from "react";
import Articles from "./Articles";
import "../Styles/Blog.css";

function Blog({ server }) {
  return (
    <>
      <Articles server={server} />
    </>
  );
}

export default Blog;
