import React from "react";
import { FaEnvelope, FaOrcid } from "react-icons/fa";

export const Team = (props) => {
  return (
    <div id="team" className="text-center">
      <div className="container">
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2>Contact</h2>
          <p>
            For additional information please contact the members below.
          </p>
        </div>
        <div id="row">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-3 col-sm-6 team">
                  <div className="thumbnail">
                    <img src={d.img} alt="..." className="team-img" />
                    <div className="caption">
                      <h4>
                        {d.name}
                        {d.email && (
                          <a href={`mailto:${d.email}`} className="icon" style={{ marginLeft: '10px' }}>
                            <FaEnvelope />
                          </a>
                        )}
                        {d.ORCID && (
                          <a href={`https://orcid.org/${d.ORCID}`} target="_blank" rel="noreferrer" className="icon" style={{ marginLeft: '10px' }}>
                            <FaOrcid />
                          </a>
                        )}
                      </h4>
                      <p>{d.job}</p>
                    </div>
                  </div>
                </div>
              ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};
