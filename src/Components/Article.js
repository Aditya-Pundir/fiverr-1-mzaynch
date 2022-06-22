import React from "react";
import { NavLink } from "react-router-dom";
import "../Styles/Article.css";

function Article({ data }) {
  return (
    <NavLink className="article" to={`/blog/${data._id}`}>
      <h4 className="title">{data.title}</h4>
      <h5 className="subtitle">{data.subtitle}</h5>
    </NavLink>
  );
}

export default Article;
