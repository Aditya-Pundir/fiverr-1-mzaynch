import React from "react";
import "../Styles/What.css";

function What() {
  return (
    <>
      <div className="what-container">
        <div className="cards">
          <div className="card">
            <span className="material-icons">signal_cellular_alt</span>
            <h3 className="card-title">Title</h3>
            <p className="card-desc">Desc</p>
          </div>
          <div className="card">
            <span class="material-icons">signal_cellular_alt</span>
            <h3 className="card-title">Title</h3>
            <p className="card-desc">Desc</p>
          </div>
          <div className="card">
            <span class="material-icons">signal_cellular_alt</span>
            <h3 className="card-title">Title</h3>
            <p className="card-desc">Desc</p>
          </div>
        </div>
        <div className="what-text-container">
          <h1>What is Nano Book Keepers?</h1>
          <p className="what-desc">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga
            laudantium eum iusto accusantium fugiat dolor tenetur consequatur
            ut. Fugiat, laudantium aliquam. Quidem ad, mollitia earum,
            perferendis voluptatem officiis provident magni laboriosam harum
            excepturi, doloribus rem et sit quas dolor molestiae reprehenderit
            ea. Voluptas ut quidem est quae nobis laborum quod.
          </p>
        </div>
      </div>
    </>
  );
}

export default What;
