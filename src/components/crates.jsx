import React from "react";

export const Crates = (props) => {
  return (
    <div id="crates" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Our Crates</h2>
        </div>
        <div className="row">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className={`col-md-${12/props.data.length < 4 ? 4 : 12/props.data.length}`}>
                  {" "}
                  <i className={d.icon}></i>
                  <div className="service-desc">
                    <h3>{d.name}</h3>
                    <p>{d.text}</p>
                  </div>
                </div>
              ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};
