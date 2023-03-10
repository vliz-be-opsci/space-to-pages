import React from "react";

export const Team = (props) => {
  return (
    <div id="team" className="text-center">
      <div className="container">
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2>Contact</h2>
          <p>
            If you have any questions, please contact the members below.
          </p>
        </div>
        <div id="row">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className={`col-md-${12/props.data.length < 4 ? 4 : 12/props.data.length} col-sm-6 team`}>
                  <div className="thumbnail">
                    {" "}
                    <img src={d.img} alt="..." className="team-img" />
                    <div className="caption">
                      <h4>{d.name}</h4>
                      <p>{d.job}</p>
                      {
                        //if email is not null, then display it
                        d.email ? (
                          <p><a href={`mailto:${d.email}`}>{d.email}</a></p>
                        ) : null
                      }
                      {
                        //if ORCID is not null, then display it
                        d.ORCID ? (
                          <p><a href={`https://orcid.org/${d.ORCID}`} target="_blank" rel="noreferrer">
                            {d.ORCID}
                          </a></p>
                        ) : null
                      }
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
