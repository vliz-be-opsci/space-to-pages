import React from "react";

export const Docs = (props) => {
  //disable all background scrolling when modal is open
    console.log(props.data);
  

  return (
    <div id="docs" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Documents</h2>
        </div>
        <div
          className="row justify-content-center"
          style={{ marginBottom: "10px" }}
        >
        {props.data.map((doc, index) => (
            <div key={index} className="col-md-6 col-sm-12">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                         {doc.name}
                        </h5>
                        <a href={doc.url} className="btn btn-primary">
                            Go to document
                        </a>
                    </div>
                </div>
            </div>
        ))}
        </div>
      </div>
    </div>
  );
};
