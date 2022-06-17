import React from "react";
import Articles from "./Articles";
import "../Styles/Blog.css";

function Blog({ server }) {
  document.title = "Nano Book Keepers | Blog";
  return (
    <div className="articles-container">
      <Articles server={server} />
    </div>
  );
}

export default Blog;
