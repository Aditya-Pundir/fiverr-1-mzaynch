import React, { useState, useEffect } from "react";
import "../Styles/ArticlePage.css";
import { useParams } from "react-router-dom";

function ArticlePage({ server }) {
  // const { id } = useParams();
  const { title } = useParams();
  const getArticleUrl = `${server}/api/articles/get`;
  const [fetched, setFetched] = useState(false);
  const [article, setArticle] = useState({});

  useEffect(() => {
    const main = async () => {
      const response = await fetch(getArticleUrl, {
        method: "POST",
        headers: { Accept: "*/*", "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.replaceAll("_", " ") }),
      })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err));
      if (response.article) {
        console.log(response.article);
        setFetched(true);
        return setArticle(response.article);
      }
      console.log(response.Error);
    };
    if (!fetched) {
      main();
    }
  }, [article, title, getArticleUrl, fetched]);

  return (
    <div className="article-page-container">
      <h2 className="article-page-heading">{article.title}</h2>
      <p className="article-page-description">{article.description}</p>
      {article.headings
        ? article.headings.map((heading, i) => {
            return (
              <div className="articles-para-container" key={i}>
                <h3 className="article-heading">{heading}</h3>
                <p className="article-para">{article.paragraphs[i]}</p>
              </div>
            );
          })
        : ""}
    </div>
  );
}

export default ArticlePage;
