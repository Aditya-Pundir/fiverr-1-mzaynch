import React, { useState, useEffect } from "react";
import "../Styles/Admins.css";
import AdminsAdmin from "./AdminsAdmin";

function Admins({ server }) {
  const getAdminsUrl = `${server}/api/admin/getall`;
  const [addAdmin, setAddAdmin] = useState(false);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const main = async () => {
      const response = await fetch(getAdminsUrl, {
        headers: { Accept: "*/*" },
      })
        .then((res) => res.json())
        .then((data) => data);
      if (response.length > 0) {
        setAdmins(response);
      }
    };
    main();
  }, [getAdminsUrl, admins]);

  return (
    <div className="admins-container">
      <button className="add-admin" onClick={() => setAddAdmin(true)}>
        +
      </button>
      {addAdmin === true ? (
        <AdminsAdmin server={server} data={{ email: "" }} type="add" />
      ) : (
        ""
      )}
      {admins.length !== 0 ? (
        admins.map((admin) => (
          <AdminsAdmin
            server={server}
            data={admin}
            key={admin._id}
            type="update"
          />
        ))
      ) : (
        <div className="admin-loaderContainer">
          <img className="admin-loader" src="assets/loader.gif" alt="Loading" />
        </div>
      )}
    </div>
  );
}

export default Admins;
