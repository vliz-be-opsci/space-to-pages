import React from "react";

export const Crates = (props) => {

  //disable all background scrolling when modal is open

  //function here that will redirect to given url or that will open a modal with the crate info
  const crateClick = (crate) => {
    //go to crate.url
    console.log(crate);
    if (crate.index) {
      window.location.href = "#"+crate.url;
    }
    else {
      window.location.href = crate.url;
    }
  }

  return (
    <div id="crates" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Our Crates</h2>
        </div>
        <div className="row">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className={`col-md-${12/props.data.length < 4 ? 4 : 12/props.data.length} cratecard`} onClick={() => crateClick(d)}>
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
