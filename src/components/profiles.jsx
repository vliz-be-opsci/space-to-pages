import React from "react";

export const Profiles = (props) => {

  return (
    <div id="profiles" className="text-center">
      <div className="container" >
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>Profiles</h2>
        </div>
        <div className="row">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.title}-${i}`} className={`col-md-${12/props.data.length < 3 ? 3 : 12/props.data.length} col-sm-6`} > 
                  {" "}
                  <i className={d.icon}></i>
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                </div>
              ))
            : "Loading..."}
        </div>
      </div>
    </div>
  );
};
