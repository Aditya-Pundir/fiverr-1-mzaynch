import React, { useState, useEffect } from "react";
import "../Styles/Articles.css";
import Article from "./Article";

function Articles({ server }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function getArticles() {
      const response = await fetch(`${server}/api/articles/getall`, {
        headers: { Accept: "*/*" },
      });
      const data = await response.json();
      setArticles(data);
    }
    getArticles();
  }, [server]);

  return (
    <>
      {/* <div className="headingContainer">
        <div className="line"></div>
        <h1 className="heading">Articles</h1>
        <div className="line"></div>
      </div> */}
      <div className="container">
        {articles.map((article) => (
          <Article data={article} key={article._id} />
        ))}
      </div>
    </>
  );
}

export default Articles;
