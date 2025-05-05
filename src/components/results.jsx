import React from "react";

export const Results = (props) => {

  const profileClick = (crate) => {
    //go to crate.url
    console.log(crate);
    if (crate.index) {
      window.location.href = "#"+crate.url;
    }
    else {
      //open a new tab
      window.open(crate.url, "_blank");
    }
  }

  return (
    <div id="results" className="text-center">
      <div className="container" >
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>Results</h2>
        </div>
        <div className="row justify-content-center">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.title}-${i}`} className="col-md-3 col-sm-6 cratecard" onClick={() => profileClick(d)} style={{ border: '2px solid #337ab7', borderRadius: '8px', padding: '10px', margin: '5px' }}>
                  {" "}
                  <i className={d.icon} style={{ fontSize: '2em' }}></i>
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
