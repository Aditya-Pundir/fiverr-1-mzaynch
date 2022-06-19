import React, { useState, useEffect } from "react";
import AdminContact from "./AdminContact";
import "../Styles/AdminContacts.css";

function AdminContacts({ server }) {
  const getContacts = `${server}/api/contacts/getall`;
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const main = async () => {
      const response = await fetch(getContacts, {
        headers: { Accept: "*/*" },
      })
        .then((res) => res.json())
        .then((data) => data);
      setContacts(response);
    };
    main();
  }, [getContacts]);

  return (
    <div className="admin-contacts-container">
      {contacts.length !== 0 ? (
        contacts.map((contact) => {
          return (
            <AdminContact server={server} data={contact} key={contact._id} />
          );
        })
      ) : (
        <div className="admin-loaderContainer">
          <img className="admin-loader" src="assets/loader.gif" alt="Loading" />
        </div>
      )}
    </div>
  );
}

export default AdminContacts;
