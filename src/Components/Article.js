import React from "react";
import "../Styles/Article.css";

function Article({ data }) {
  return (
    <div className="article">
      <h4 className="title">{data.title}</h4>
      <p className="desc">{data.description}</p>
    </div>
  );
}

export default Article;
