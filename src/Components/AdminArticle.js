import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/AdminArticle.css";

function AdminArticle({ server, articleType, data }) {
  const update = `${server}/api/articles/update`;
  const deleteUrl = `${server}/api/articles/delete`;
  const add = `${server}/api/articles/add`;
  const navigate = useNavigate();
  const [type, setType] = useState(articleType);
  const [title, setTitle] = useState(data.title);
  const [deleteArticle, setDeleteArticle] = useState(false);
  const [updateSubmitted, setUpdateSubmitted] = useState(false);
  const [description, setDescription] = useState(data.description);
  useEffect(() => {
    const main = async () => {
      if (data.title !== title || data.description !== description) {
        let response;
        if (type === "update") {
          response = await fetch(update, {
            method: "PUT",
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id: data._id, title, description }),
          })
            .then((res) => res.json())
            .then((data) => data);
          if (response.article) {
            alert("Changes commited successfully!");
          } else {
            alert("Please reload your page and try again!");
          }
        } else if (type === "add") {
          response = await fetch(add, {
            method: "POST",
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, description }),
          })
            .then((res) => res.json())
            .then((data) => data);
          if (response.Success) {
            setType("update");
            alert("Changes commited successfully!");
            navigate("/blog");
          } else {
            alert("Please reload your page and try again!");
          }
        }
      }
      setUpdateSubmitted(false);
    };
    if (updateSubmitted === true) {
      main();
    }
  }, [update, navigate, add, updateSubmitted, title, description]);

  useEffect(() => {
    const main = async () => {
      if (deleteArticle === true) {
        let finalChoice = window.confirm(
          "Are you sure you want to delete this item?"
        );
        if (finalChoice === true) {
          const response = await fetch(deleteUrl, {
            method: "DELETE",
            headers: { Accept: "*/*", "Content-Type": "application/json" },
            body: JSON.stringify({ _id: data._id }),
          })
            .then((res) => res.json())
            .then((data) => data);
          setDeleteArticle(false);
          navigate("/blog");
        } else {
          setDeleteArticle(false);
        }
      }
    };
    main();
  }, [navigate, deleteArticle, deleteUrl, data]);
  return (
    <div className="admin-article">
      {type !== "add" ? (
        <div className="delete-container">
          <span
            className="material-icons delete-article"
            onClick={() => setDeleteArticle(true)}
          >
            delete
          </span>
        </div>
      ) : (
        ""
      )}

      <textarea
        className="admin-title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="admin-desc"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        className="admin-article-submit"
        onClick={() => setUpdateSubmitted(true)}
      >
        Commit Changes
      </button>
    </div>
  );
}

export default AdminArticle;
