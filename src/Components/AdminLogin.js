import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/AdminLogin.css";

function AdminLogin({ server }) {
  const login = `${server}/api/admin/login`;
  const navigate = useNavigate();
  document.title = "Nano Bookkeepers | Admin";
  const [changed, setChanged] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const main = async () => {
      if (submitted === true) {
        const response = await fetch(login, {
          method: "POST",
          headers: { Accept: "*/*", "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
          }),
        })
          .then((res) => res.json())
          .then((data) => data)
          .catch((err) => console.log(err));

        console.log(response);
        if (response.Error) {
          alert(response.Error);
        } else if (response.Success) {
          localStorage.setItem("_id", response._id);
          window.location.reload(false);
        }
      }
    };
    main();
    setSubmitted(false);
  }, [submitted, navigate, login, changed, email, password]);
  return (
    <>
      <div className="admin-outer">
        <div className="admin-form">
          <input
            type="email"
            name="email"
            className="admin-input admin-email"
            placeholder="Email"
            required
            onChange={(e) => {
              setChanged(true);
              setEmail(e.target.value);
            }}
            value={email}
            minLength={6}
            maxLength={30}
            autoComplete="false"
          />
          <input
            type="password"
            name="password"
            className="admin-input admin-password"
            placeholder="Password"
            required
            onChange={(e) => {
              setChanged(true);
              setPassword(e.target.value);
            }}
            value={password}
            minLength={6}
            maxLength={30}
            autoComplete="false"
          />
          <button className="admin-submit" onClick={() => setSubmitted(true)}>
            Login
          </button>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
