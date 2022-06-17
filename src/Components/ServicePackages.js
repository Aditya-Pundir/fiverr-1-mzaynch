import React from "react";
import "../Styles/ServicePackages.css";

function ServicePackages() {
  return (
    <div className="service-packs-outer">
      <div className="service-packs-heading">
        <h1>Service Packages</h1>
      </div>
      <div className="service-packs-container">
        <div className="package">
          <h2 className="package-heading">Start</h2>
          <p className="package-desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum,
            magnam.
          </p>
          <div className="package-specs">
            <p className="package-spec">Spec 1</p>
            <p className="package-spec">Spec 2</p>
            <p className="package-spec">Spec 3</p>
          </div>
          <h2 className="price">$12.50</h2>
          <p className="price-scale">per month</p>
        </div>
        <div className="package">
          <h2 className="package-heading">Start</h2>
          <p className="package-desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum,
            magnam.
          </p>
          <div className="package-specs">
            <p className="package-spec">Spec 1</p>
            <p className="package-spec">Spec 2</p>
            <p className="package-spec">Spec 3</p>
          </div>
          <h2 className="price">$12.50</h2>
          <p className="price-scale">per month</p>
        </div>
        <div className="package">
          <h2 className="package-heading">Start</h2>
          <p className="package-desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum,
            magnam.
          </p>
          <div className="package-specs">
            <p className="package-spec">Spec 1</p>
            <p className="package-spec">Spec 2</p>
            <p className="package-spec">Spec 3</p>
          </div>
          <h2 className="price">$12.50</h2>
          <p className="price-scale">per month</p>
        </div>
      </div>
    </div>
  );
}

export default ServicePackages;
