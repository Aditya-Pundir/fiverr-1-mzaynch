import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "../Styles/Contact.css";

function Contact({ server }) {
  const add = `${server}/api/contacts/add`;
  document.title = "Nano Book Keepers | Contact";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [phone, setPhone] = useState(0);

  return (
    <>
      <div className="outer">
        <div className="inner">
          <form className="form">
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
              onChange={(e) => setName(e.target.value)}
              value={name}
              minLength={4}
              maxLength={30}
            />
            <input
              type="email"
              name="email"
              className="input email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              minLength={6}
              maxLength={30}
            />
            {/* <input
              type="text"
              pattern="[0-9]*"
              name="phone"
              className="input phone"
              placeholder="+1 1234567899"
              required
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              value={phone}
              minLength={14}
              maxLength={14}
            /> */}
            <PhoneInput
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(Number(e.target.value))}
            />
            <textarea
              name="body"
              cols="50"
              rows="10"
              className="input body"
              placeholder="Body"
              required
              onChange={(e) => setBody(e.target.value)}
              value={body}
              minLength={50}
              maxLength={300}
            />
            <button type="submit" className="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Contact;
