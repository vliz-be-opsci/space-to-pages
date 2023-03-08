import React from "react";

export const DataFiles = (props) => {
    console.log(props);

    //add styling to the section
    const sectionStyle = {
        padding: "50px 0",
        marginTop: "50px",
        textAlign: "center",
    };

    return (
    <div id="data" className="text-center" style={sectionStyle}>
      <div className="container">
        <div className="col-md-12 section-title">
            <h2>Data</h2>
            <p>
                The data used in this project is available for download and preview.
            </p>
            <div id="row">
                {props.data 
                    ? props.data.map((d, i) => (
                            <div key={`${d.name}-${i}`} className={`col-md-12 col-sm-12 team col-lg-6`}>
                                <div className="fileitem">
                                    <a href={"#/data/"+d.id}>
                                        <h4>{d.name}</h4>
                                        <h6>{d.description}</h6>
                                    </a>
                                    <a href={d.url}>
                                        <h4>Download</h4>
                                    </a>
                                    <a href={d.url}>
                                        <h4>Github</h4>
                                    </a>
                                </div>
                            </div>
                        ))
                : "loading"}
            </div>
        </div>
      </div>
    </div>
    );
}
