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
  const [headers, setHeaders] = useState([...data.headings]);
  const [paragraphs, setParagraphs] = useState([...data.paragraphs]);
  const [visible, setVisible] = useState(articleType === "add" ? true : false);

  useEffect(() => {
    const main = async () => {
      var filteredHeaders = headers.filter((element) => {
        return element !== "";
      });
      var filteredParagraphs = paragraphs.filter((element) => {
        return element !== "";
      });
      if (
        data.title !== title ||
        data.description !== description ||
        data.headings !== filteredHeaders ||
        data.paragraphs !== filteredParagraphs
      ) {
        let response;
        if (articleType === "update") {
          // if (filteredParagraphs.length !== filteredHeaders.length) {
          //   return alert("Please fill the content in pairs!");
          // }

          response = await fetch(update, {
            method: "PUT",
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              _id: data._id,
              title,
              description,
              headings: filteredHeaders,
              paragraphs: filteredParagraphs,
            }),
          })
            .then((res) => res.json())
            .then((data) => data)
            .catch((err) => console.log(err));
          if (response.article) {
            alert("Changes commited successfully!");
          } else if (response.Error) {
            alert(response.Error);
          } else {
            alert("Please reload your page and try again!");
          }
        } else if (articleType === "add") {
          response = await fetch(add, {
            method: "POST",
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title,
              description,
              headings: filteredHeaders,
              paragraphs: filteredParagraphs,
            }),
          })
            .then((res) => res.json())
            .then((data) => data)
            .catch((err) => console.log(err));
          if (response.Success) {
            setType("update");
            alert("Changes commited successfully!");
            navigate("/blog");
          } else if (response.Error) {
            alert(response.Error);
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
  }, [
    update,
    navigate,
    add,
    updateSubmitted,
    title,
    description,
    data,
    type,
    articleType,
    headers,
    paragraphs,
  ]);

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
          if (response.Success) {
            navigate("/blog");
          } else {
            alert("Something went wrong!");
          }
          setDeleteArticle(false);
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
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="admin-desc"
        value={description}
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />

      {visible ? (
        <span
          className="material-icons expand"
          onClick={() => setVisible(false)}
        >
          expand_less
        </span>
      ) : (
        <span
          className="material-icons expand"
          onClick={() => setVisible(true)}
        >
          expand_more
        </span>
      )}

      {visible ? (
        <div className="admin-article-content-container">
          {headers.length > 0
            ? headers.map((header, i) => {
                return (
                  <div className="admin-section-container" key={i}>
                    <textarea
                      className="admin-section-content admin-header"
                      value={header}
                      placeholder="Heading"
                      onChange={(e) => {
                        let data = [...headers];
                        data[i] = e.target.value;
                        setHeaders(data);
                      }}
                    />
                    <textarea
                      className="admin-section-content admin-para"
                      value={paragraphs[i]}
                      placeholder="Paragraph"
                      onChange={(e) => {
                        let data = [...paragraphs];
                        data[i] = e.target.value;
                        setParagraphs(data);
                      }}
                    />
                  </div>
                );
              })
            : ""}
          <div
            className="add-content-container"
            onClick={() => {
              setHeaders([...headers, ""]);
              setParagraphs([...paragraphs, ""]);
            }}
          >
            <button className="admin-add-article-content">+</button>
          </div>
        </div>
      ) : (
        ""
      )}

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
