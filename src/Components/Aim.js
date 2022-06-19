import React from "react";
import "../Styles/Aim.css";

function Aim() {
  return (
    <>
      <div className="aim-container">
        {/* <div className="cards">
          <div className="card">
            <span className="material-icons">signal_cellular_alt</span>
            <h3 className="card-title">Title</h3>
            <p className="card-desc">Desc</p>
          </div>
          <div className="card">
            <span className="material-icons">signal_cellular_alt</span>
            <h3 className="card-title">Title</h3>
            <p className="card-desc">Desc</p>
          </div>
          <div className="card">
            <span className="material-icons">signal_cellular_alt</span>
            <h3 className="card-title">Title</h3>
            <p className="card-desc">Desc</p>
          </div>
        </div> */}
        <img src="assets/aim.png" alt="Our aim" className="aim-image" />
        <div className="aim-text-container">
          <h1 className="aim-heading">Our Aim</h1>
          <p className="aim-desc">
            Nano Bookkeepers strives to help small and growing businesses with
            the backend of their business. <br /> We will organize your books
            precisely so you can concentrate on your primary business
            activities.
          </p>
          <h4 className="quote">"We pay attention to nano details"</h4>
        </div>
      </div>
    </>
  );
}

export default Aim;
