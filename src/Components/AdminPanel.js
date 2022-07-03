import React, { useState } from "react";
import "../Styles/AdminPanel.css";
import { useNavigate } from "react-router-dom";
import AdminArticles from "./AdminArticles";
import AdminContacts from "./AdminContacts";
import AdminChat from "./AdminChat";
import Admins from "./Admins";

function AdminPanel({ server }) {
  const [content, setContent] = useState("articles");
  const navigate = useNavigate();

  return (
    <div>
      <div className="admin-nav">
        <button className="nav-item" onClick={() => setContent("articles")}>
          Articles
        </button>
        <button className="nav-item" onClick={() => setContent("contacts")}>
          Contacts
        </button>
        <button className="nav-item" onClick={() => setContent("admins")}>
          Admins
        </button>
        <button className="nav-item" onClick={() => setContent("chat")}>
          Chat
        </button>
        <button
          className="nav-item logout"
          onClick={() => {
            localStorage.removeItem("_id");
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
      <div className="content">
        {content === "articles" ? (
          <AdminArticles server={server} />
        ) : content === "contacts" ? (
          <AdminContacts server={server} />
        ) : content === "admins" ? (
          <Admins server={server} />
        ) : content === "chat" ? (
          <AdminChat server={server} />
        ) : (
          <AdminArticles server={server} />
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
