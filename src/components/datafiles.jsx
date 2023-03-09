import React from "react";
import {AiFillGithub, AiOutlineCloudDownload} from "react-icons/ai";
import {IconContext} from "react-icons";

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
                    ? props.data.map((d, i) => {
                            let dd = d.url.replace("https://github.com/", "https://raw.githubusercontent.com/");
                            dd = dd.replace("/blob/", "/");

                            return(

                            <div key={`${d.name}-${i}`} className={`col-md-12 col-sm-12 team col-lg-6`}>
                                
                                <div className="fileitem">
                                    <div className="fileitem_direct_child">
                                    <a href={"#/data/"+d.id} >
                                        <h4>{d.name}</h4>
                                        <h6>{d.description}</h6>
                                    </a>
                                    </div>
                                    <div >
                                    <a href={dd} target="_blank">
                                    <IconContext.Provider value={{ className:"react-icons"}}>
                                        <AiOutlineCloudDownload></AiOutlineCloudDownload>
                                    </IconContext.Provider>
                                    </a>
                                    <a href={d.url} target="_blank">
                                    <IconContext.Provider value={{ className:"react-icons"}}>
                                        <AiFillGithub></AiFillGithub>
                                    </IconContext.Provider>
                                    </a>
                                    </div>
                                </div>
                                
                            </div>
                            )
                    })
                : "loading"}
            </div>
        </div>
      </div>
    </div>
    );
}
