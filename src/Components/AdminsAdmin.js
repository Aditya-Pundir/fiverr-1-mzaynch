import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/AdminsAdmin.css";

function AdminsAdmin({ server, data, type, num }) {
  const resetPassUrl = `${server}/api/admin/resetpassword`;
  const deleteAdminUrl = `${server}/api/admin/delete`;
  const addAdminUrl = `${server}/api/admin/create`;
  const navigate = useNavigate();
  const [adminEmail, setAdminEmail] = useState("");
  const [addAdmin, setAddAdmin] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [newAdminPass, setNewAdminPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [toDelete, setToDelete] = useState(false);
  const pwdRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const main = async () => {
      if (confirmPass === newAdminPass && newAdminPass !== "") {
        const response = await fetch(resetPassUrl, {
          method: "PUT",
          headers: { Accept: "*/*", "Content-Type": "application/json" },
          body: JSON.stringify({
            _id: data._id,
            password: adminPass,
            newPassword: newAdminPass,
          }),
        })
          .then((res) => res.json())
          .then((data) => data);

        if (response.Success) {
          setAdminPass("");
          setNewAdminPass("");
          setConfirmPass("");
          alert("Password updated successfully!");
        } else {
          alert(response.Error);
        }
        setSubmitted(false);
      }
    };
    if (submitted === true) {
      main();
      setSubmitted(false);
    }
  }, [submitted, confirmPass, adminPass, newAdminPass, resetPassUrl, data]);

  useEffect(() => {
    if (confirmPass !== newAdminPass) {
      if (pwdRef.current.classList.length === 2) {
        pwdRef.current.classList.remove("pwdMatchHidden");
      }
    } else {
      pwdRef.current.classList.add("pwdMatchHidden");
    }
  }, [pwdRef, adminPass, newAdminPass, confirmPass]);

  useEffect(() => {
    const main = async () => {
      const response = await fetch(addAdminUrl, {
        method: "POST",
        headers: { Accept: "*/*", "Content-Type": "application/json" },
        body: JSON.stringify({ email: adminEmail, password: newAdminPass }),
      })
        .then((res) => res.json())
        .then((data) => data);

      if (response.Success) {
        alert("Admin created successfully!");
        setAdminEmail("");
        setNewAdminPass("");
        setConfirmPass("");
        navigate("/");
      } else if (response.Error) {
        alert(response.Error);
      }
    };
    if (addAdmin === true) {
      main();
      setAddAdmin(false);
    }
  }, [
    addAdminUrl,
    newAdminPass,
    navigate,
    addAdmin,
    adminPass,
    confirmPass,
    adminEmail,
  ]);

  useEffect(() => {
    const main = async () => {
      if (toDelete === true) {
        if (adminPass === "") {
          setToDelete(false);
          return alert("Please provide a valid password");
        }
        let finalChoice = window.confirm(
          "Are you sure you want to delete this admin?"
        );
        if (finalChoice === true) {
          const response = await fetch(deleteAdminUrl, {
            method: "DELETE",
            headers: { Accept: "*/*", "Content-Type": "application/json" },
            body: JSON.stringify({ _id: data._id, password: adminPass }),
          })
            .then((res) => res.json())
            .then((data) => data);
          if (response.Success) {
            alert("Admin deleted successfully!");
          } else if (response.Error) {
            alert(response.Error);
          }
        }
      }
    };
    main();
    setToDelete(false);
  }, [navigate, adminPass, data, toDelete, deleteAdminUrl]);

  return (
    <div className="admins-admin-container">
      <div className="admins-admin-heading">
        <h4 className="admins-admin-email">{data.email}</h4>
        {type === "update" ? (
          num > 1 ? (
            <span
              className="material-icons delete"
              onClick={() => setToDelete(true)}
            >
              delete
            </span>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>
      {type === "update" ? (
        <input
          type="password"
          className="admins-admin-input admins-admin-password"
          value={adminPass}
          placeholder="Current Password"
          onChange={(e) => setAdminPass(e.target.value)}
        />
      ) : (
        <input
          type="email"
          className="admins-admin-input admins-admin-email"
          value={adminEmail}
          placeholder="Email"
          onChange={(e) => setAdminEmail(e.target.value)}
        />
      )}

      <input
        type="password"
        className="admins-admin-input admins-admin-password"
        value={newAdminPass}
        placeholder={type === "update" ? "New Password" : "Password"}
        onChange={(e) => setNewAdminPass(e.target.value)}
      />
      <input
        type="password"
        className="admins-admin-input admins-admin-password"
        value={confirmPass}
        placeholder="Confirm Password"
        onChange={(e) => setConfirmPass(e.target.value)}
      />
      <p className="pwdMatch pwdMatchHidden" ref={pwdRef}>
        Passwords do not match!
      </p>
      <button
        className="admins-admin-submit"
        onClick={() =>
          type === "update" ? setSubmitted(true) : setAddAdmin(true)
        }
      >
        Commit Changes
      </button>
    </div>
  );
}

export default AdminsAdmin;
