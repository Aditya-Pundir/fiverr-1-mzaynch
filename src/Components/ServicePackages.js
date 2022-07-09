import React from "react";
import "../Styles/ServicePackages.css";

function ServicePackages() {
  return (
    <div className="service-packs-outer">
      <div className="service-packs-heading">
        <h1 className="primary-services-heading">Primary Services Offered</h1>
        <p className="quote service-packs-subheading ">
          From a startup to a market leader we offer these services on the go
        </p>
      </div>
      <div className="service-packs-container">
        <div className="service-package">
          <h2 className="package-heading">Monthly Bookkeeping Support</h2>
          <p className="package-desc">
            Ongoing monthly bookkeeping support to help your business manage
            books and categorize transactions as they happen and prepare
            Financial Statements monthly.
          </p>
        </div>
        <div className="service-package">
          <h2 className="package-heading">Backlog Bookkeeping</h2>
          <p className="package-desc">
            Rectifying errors in bookkeeping and helping with lagging backlog
            categorization of transactions and financial statements preparations
            for the period.
          </p>
        </div>
        <div className="service-package">
          <h2 className="package-heading">Budgeting and Forecasting</h2>
          <p className="package-desc">
            Budgeting and forecasting for upcoming years for better
            decision-making. Detailed Cost of production reports for
            manufacturing businesses. Asset register management and many more
            customized financial reporting services.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ServicePackages;
