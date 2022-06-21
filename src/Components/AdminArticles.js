import React, { useEffect, useState } from "react";
import AdminArticle from "./AdminArticle";
import "../Styles/AdminArticles.css";

function AdminArticles({ server }) {
  const getArticles = `${server}/api/articles/getall`;
  const [fetched, setFetched] = useState(false);
  const [articles, setArticles] = useState([]);
  const [add, setAdd] = useState(false);

  useEffect(() => {
    const getAll = async () => {
      const response = await fetch(getArticles, {
        headers: { Accept: "*/*" },
      })
        .then((response) => response.json())
        .then((data) => data);
      setArticles(response.reverse());
      setFetched(true);
    };
    getAll();
  }, [getArticles, fetched]);

  return (
    <>
      <div className="admin-outer-articles">
        <button className="admin-add-article" onClick={() => setAdd(true)}>
          +
        </button>
        <div className="admin-container">
          {add === true ? (
            <AdminArticle
              server={server}
              data={{ title: "", description: "" }}
              articleType="add"
            />
          ) : (
            ""
          )}
          {articles.length !== 0 ? (
            articles.map((article) => (
              <AdminArticle
                server={server}
                data={article}
                key={article._id}
                articleType="update"
              />
            ))
          ) : articles.length === 0 && fetched === true ? (
            <div className="admin-no-articles-container">
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
    </>
  );
}

export default AdminArticles;
