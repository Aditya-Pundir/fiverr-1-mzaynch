import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/AdminContact.css";

function AdminContact({ server, data }) {
  const deleteContactUrl = `${server}/api/contacts/delete`;
  const navigate = useNavigate();
  const [deleteContact, setDeleteContact] = useState(false);

  useEffect(() => {
    const main = async () => {
      let finalChoice = window.confirm(
        "Are you sure you want to delete this item?"
      );
      if (finalChoice === true) {
        const response = await fetch(deleteContactUrl, {
          method: "DELETE",
          headers: { Accept: "*/*", "Content-Type": "application/json" },
          body: JSON.stringify({ _id: data._id }),
        })
          .then((res) => res.json())
          .then((data) => data);
        if (response.Success) {
          navigate("/");
        } else {
          alert("Please reload your browser and try again!");
        }
      }
      setDeleteContact(false);
    };
    if (deleteContact === true) {
      main();
    }
  }, [navigate, deleteContactUrl, deleteContact, data]);

  return (
    <div className="admin-contact-outer-container">
      <div className="delete-container">
        <span
          className="material-icons delete-article"
          onClick={() => setDeleteContact(true)}
        >
          delete
        </span>
      </div>
      <div className="admin-contact-inner-container">
        <h4 className="admin-contact-name">{data.name}</h4>
        <span className="material-icons arrow">east</span>
        <h4 className="admin-contact-email">{data.email}</h4>
      </div>
      <p className="admin-contact-body">{data.body}</p>
    </div>
  );
}

export default AdminContact;
