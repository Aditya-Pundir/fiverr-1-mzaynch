import React from "react";
import "../Styles/CEO.css";

function CEO() {
  return (
    <>
      <div className="team-members">
        <div className="team-member">
          <p className="ceo-quote">
            We believe in providing value and helping with decision-making with
            complete data, facts, and knowledge.
          </p>
          <div className="ceo">
            <img className="member" src="assets/ceo.webp" alt="CEO" />
            <h4>
              Muhammad Zayn <br /> <p className="post">CEO & Founder</p>
            </h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default CEO;
