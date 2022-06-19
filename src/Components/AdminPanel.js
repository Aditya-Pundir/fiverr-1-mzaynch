import React, { useState } from "react";
import "../Styles/AdminPanel.css";
import { NavLink } from "react-router-dom";
import AdminArticles from "./AdminArticles";
import AdminContacts from "./AdminContacts";
import Admins from "./Admins";

function AdminPanel({ server }) {
  const [content, setContent] = useState("articles");

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
      </div>
      <div className="content">
        {content === "articles" ? (
          <AdminArticles server={server} />
        ) : content === "contacts" ? (
          <AdminContacts server={server} />
        ) : content === "admins" ? (
          <Admins server={server} />
        ) : (
          <AdminArticles server={server} />
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
