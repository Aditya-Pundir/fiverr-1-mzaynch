import React, { useState, useEffect } from "react";
import "../Styles/Admin.css";
import AdminPanel from "./AdminPanel";
import AdminLogin from "./AdminLogin";

function Admin({ server }) {
  const _id = localStorage.getItem("_id");
  const getAdmin = `${server}/api/admin/get`;
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const main = async () => {
      const response = await fetch(getAdmin, {
        method: "POST",
        headers: { Accept: "*/*", "Content-Type": "application/json" },
        body: JSON.stringify({
          _id,
        }),
      })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err));

      response.email ? setIsAdmin(true) : setIsAdmin(false);
    };
    main();
  }, [getAdmin, _id, isAdmin]);

  return (
    <div className="admin-comp-container">
      {isAdmin === true ? (
        <AdminPanel server={server} />
      ) : (
        <AdminLogin server={server} />
      )}
    </div>
  );
}

export default Admin;
