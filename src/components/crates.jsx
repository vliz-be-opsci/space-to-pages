import React from "react";

export const Crates = (props) => {

  //disable all background scrolling when modal is open

  //function here that will redirect to given url or that will open a modal with the crate info
  const crateClick = (crate) => {
    //go to crate.url
    console.log(crate);
    window.open(crate.crateurl, "_blank");
  }

  const githubClick = (crate) => {
    //go to crate.url
    console.log(crate);
    window.open(crate.url, "_blank");
  }

  return (
    <div id="crates" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Our Data packages</h2>
        </div>
        <div className="row" style={{padding:"20px"}}>
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-12" >
                  {" "}
                  <div className="col-md-2">
                    <h4>{d.name}</h4>
                  </div>
                  <div className="col-md-8">
                    <p>{d.text}</p>
                  </div>
                  <div className="col-md-1" onClick={() => githubClick(d)}>
                    <i className="fa fa-github"></i>
                  </div>
                  {
                    d.crateurl ?
                    <div className="col-md-1" onClick={() => crateClick(d)}>
                      <i className="fa fa-archive"></i>
                    </div>
                    :
                  <></>
                  }
                </div>
              ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};
