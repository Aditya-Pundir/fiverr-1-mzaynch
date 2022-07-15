import React from "react";
import { NavLink } from "react-router-dom";
import "../Styles/Article.css";

function Article({ data }) {
  console.log(data.title.replaceAll(" ", "-"));
  return (
    <NavLink
      className="article"
      to={`/blog/${data.title.replaceAll(" ", "_")}`}
    >
      <h4 className="title">{data.title}</h4>
      {/* <h5 className="subtitle">{data.description}</h5> */}
    </NavLink>
  );
}

export default Article;
