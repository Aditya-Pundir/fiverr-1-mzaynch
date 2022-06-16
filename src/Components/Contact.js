import React from "react";
import { NavLink } from "react-router-dom";
import "../Styles/Contact.css";

function Contact({ server }) {
  const add = `${server}/api/contacts/add`;
  document.title = "Nano Book Keepers | Contact";
  return (
    <>
      <div className="outer">
        <div className="inner">
          <form action={add} method="POST" className="form">
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
              minLength={4}
              maxLength={30}
            />
            <input
              type="email"
              name="email"
              className="input email"
              placeholder="Email"
              required
              minLength={6}
              maxLength={30}
            />
            <textarea
              name="body"
              cols="50"
              rows="10"
              className="input body"
              placeholder="Body"
              required
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
