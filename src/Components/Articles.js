import React, { useState, useEffect } from "react";
import "../Styles/Articles.css";
import Article from "./Article";

function Articles({ server }) {
  const [articles, setArticles] = useState([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    async function getArticles() {
      const response = await fetch(`${server}/api/articles/getall`, {
        headers: { Accept: "*/*" },
      });
      const data = await response.json();
      setFetched(true);
      setArticles(data.reverse());
    }
    getArticles();
  }, [server, fetched]);

  return (
    <div className="outer-articles">
      <div className="container">
        {articles.length !== 0 ? (
          articles.map((article) => (
            <Article data={article} key={article._id} />
          ))
        ) : articles.length === 0 && fetched === true ? (
          <div className="no-articles-container">
            <h3>No articles available!</h3>
          </div>
        ) : articles.length === 0 && fetched === false ? (
          <div className="admin-loaderContainer">
            <img
              className="admin-loader"
              src="assets/loader.gif"
              alt="Loading"
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Articles;
