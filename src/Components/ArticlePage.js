import React, { useState, useEffect } from "react";
import "../Styles/ArticlePage.css";
import { useParams } from "react-router-dom";

function ArticlePage({ server }) {
  const { id } = useParams();
  const getArticleUrl = `${server}/api/articles/get`;
  const [article, setArticle] = useState({});

  useEffect(() => {
    const main = async () => {
      const response = await fetch(getArticleUrl, {
        method: "POST",
        headers: { Accept: "*/*", "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id }),
      })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err));
      if (response.article) {
        return setArticle(response.article);
      }
      console.log(response.Error);
    };
    main();
  }, [article, id, getArticleUrl]);

  return (
    <div className="article-page-container">
      <h2 className="article-page-heading">{article.title}</h2>
      <h4 className="article-page-subheading">{article.subtitle}</h4>
      <p className="article-page-description">{article.description}</p>
    </div>
  );
}

export default ArticlePage;
