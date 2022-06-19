import React from "react";
import "../Styles/Why.css";

function Why() {
  return (
    <>
      <div className="why-container">
        <div className="why-text-container">
          <h1 className="why-heading">
            Why forward-thinking businesses choose Nano Bookkeepers?
          </h1>
          <div className="why-point">
            <h3 className="why-sub-heading">Expertise and dedicated support</h3>
            <p className="why-desc">
              Our finance and accounting experts are focused on helping you
              reach your goals. Get a dedicated Nano Bookkeepers finance team
              with expertise in your industry, size, and stage.
            </p>
          </div>
          <div className="why-point">
            <h3 className="why-sub-heading">Team of experts under one roof</h3>
            <p className="why-desc">
              We offer comprehensive finance support from strategy to
              operations. Make decisions with a clear picture of your financial
              health—where it is today and where it needs to go.
            </p>
          </div>
          <div className="why-point">
            <h3 className="why-sub-heading">A partner that grows with you</h3>
            <p className="why-desc">
              We match our engagement and level of support to your business
              needs. Whether you’re just starting or scaling quickly, we’re here
              to partner with you at every stage of your journey.
            </p>
          </div>
        </div>
        <img src="assets/why.png" alt="Why?" className="why-image" />
      </div>
    </>
  );
}

export default Why;
