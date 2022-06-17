import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import "../Styles/Contact.css";

function Contact({ server }) {
  const add = `http://localhost:5000/api/contacts/add`;
  const navigate = useNavigate();
  document.title = "Nano Book Keepers | Contact";
  const [changed, setChanged] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [phone, setPhone] = useState(0);

  useEffect(() => {
    const submit = async () => {
      if (submitted === true) {
        const response = await fetch(add, {
          method: "POST",
          headers: { Accept: "*/*", "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name,
            email: email,
            body: body,
            phone: String(phone),
          }),
        })
          .then((res) => res.json())
          .then((data) => data)
          .catch((err) => console.log(err));
        if (response.Success === true) {
          navigate("/");
        }
      }
    };
    submit();
    setSubmitted(false);
  }, [submitted, add, changed, name, email, body, phone]);

  return (
    <>
      <div className="outer">
        <div className="inner">
          <div className="form">
            <div className="textContainer">
              <h2 className="heading-connect">Let's connect!</h2>
              <NavLink className="cross" exact="true" to="/">
                <span className="material-symbols-outlined">close</span>
              </NavLink>
            </div>
            <input
              type="text"
              name="name"
              className="input name"
              placeholder="Name"
              required
              onChange={(e) => {
                setChanged(true);
                setName(e.target.value);
              }}
              value={name}
              minLength={4}
              maxLength={30}
              autoComplete="false"
            />
            <input
              type="email"
              name="email"
              className="input email"
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
            <div className="phoneNum">
              <p className="plus">+</p>
              <input
                type="number"
                name="phone"
                className="input phone"
                placeholder="Phone number"
                required
                onChange={(e) => {
                  setPhone(Number(e.target.value));
                }}
                value={changed ? phone : ""}
                // value={phone}
                // min="10000000000001"
                max="99999999999999"
              />
            </div>
            <textarea
              name="body"
              cols="50"
              rows="10"
              className="input body"
              placeholder="Body"
              required
              onChange={(e) => {
                setChanged(true);
                setBody(e.target.value);
              }}
              value={body}
              minLength={50}
              maxLength={300}
              autoComplete="false"
            />
            <button className="submit" onClick={() => setSubmitted(true)}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
