import React, { useState, useEffect } from "react";
import AdminContact from "./AdminContact";
import "../Styles/AdminContacts.css";

function AdminContacts({ server }) {
  const getContacts = `${server}/api/contacts/getall`;
  const [fetched, setFetched] = useState(false);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const main = async () => {
      const response = await fetch(getContacts, {
        headers: { Accept: "*/*" },
      })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err));
      setContacts(response.reverse());
      setFetched(true);
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
      ) : contacts.length === 0 && fetched === true ? (
        <div className="admin-no-articles-container">
          <h3>No contact form submissions available!</h3>
        </div>
      ) : contacts.length === 0 && fetched === false ? (
        <div className="admin-loaderContainer">
          <img className="admin-loader" src="assets/loader.gif" alt="Loading" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default AdminContacts;
