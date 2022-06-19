import React from "react";
import "../Styles/ServicePackages.css";

function ServicePackages() {
  return (
    <div className="service-packs-outer">
      <div className="service-packs-heading">
        <h1>Primary Services Offered</h1>
      </div>
      <div className="service-packs-container">
        <div className="package">
          <h2 className="package-heading">Monthly Bookkeeping Support</h2>
          <p className="package-desc">
            Ongoing monthly bookkeeping support to help your business manage
            books and categorize transactions as they happen and prepare
            Financial Statements monthly.
          </p>
        </div>
        <div className="package">
          <h2 className="package-heading">Backlog Bookkeeping</h2>
          <p className="package-desc">
            Rectifying errors in bookkeeping and helping with lagging backlog
            categorization of transactions and financial statements preparations
            for the period.
          </p>
        </div>
        <div className="package">
          <h2 className="package-heading">Budgeting and Forecasting</h2>
          <p className="package-desc">
            Budgeting and forecasting for upcoming years for better
            decision-making. Detailed Cost of production reports for
            manufacturing businesses.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ServicePackages;
