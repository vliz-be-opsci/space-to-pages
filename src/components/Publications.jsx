import React from "react";

export const Publications = (props) => {
  return (
    <div id="publications">
      <div className="container">
        <div className="section-title text-center">
          <h2>Publications</h2>
        </div>
        <div className="row">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.title}-${i}`} className="col-md-6">
                  <a href={d.link} target="_blank" rel="noreferrer">
                    <div className="publications">
                      <div className="publications-content">
                        <div className="publications-meta"> - {d.title} </div>
                        <p>"{d.text}"</p>
                      </div>
                    </div>
                  </a>
                </div>
              ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};
