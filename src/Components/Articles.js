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
      setArticles(data.reverse());
    }
    getArticles();
  }, [server]);

  return (
    <div className="outer-articles">
      <div className="container">
        {articles.length !== 0 ? (
          articles.map((article) => (
            <Article data={article} key={article._id} />
          ))
        ) : (
          <div className="loaderContainer">
            <img className="loader" src="assets/loader.gif" alt="Loading" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Articles;
