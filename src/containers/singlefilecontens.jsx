//this container will contain all the components that a single file can have

import React, {useEffect, useState} from "react";
import FileReadme from "../components/fileReadme";
import CsvFile from "../components/csvFile";

const SingleFileContents = (props) => {
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
            <h2>{props.data.name}</h2>
            <FileReadme data={props.data}/>
            <CsvFile data={props.data}/>
        </div>
      </div>
    </div>
    );
}

export default SingleFileContents;