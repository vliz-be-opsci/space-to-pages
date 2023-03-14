//this component is used to display the readme file of the selected repository

import React, {useEffect, useState} from "react";
import axios from "axios";
import ReactMarkdown from 'react-markdown';
import {BsFillPlusCircleFill} from "react-icons/bs";
import {AiFillMinusCircle} from "react-icons/ai";
const FileReadme = (props) => {
    console.log(props);
    //make a request to the github api to get the readme file
    const [readmeDisplay, setReadmeDisplay] = useState(true);
    const [readme, setReadme] = useState("");
    useEffect(() => {
        //check if props.data.extra_info exists
        if (props.data.extra_info === undefined) {
            setReadme(null);
            return;
        }
        //change the github url to get the raw file
        let url = props.data.extra_info.replace("https://github.com/", "https://raw.githubusercontent.com/"); //beware of the fact that some uri might be different for other users that don't tend to use github for file storage
        url = url.replace("/blob/", "/");
        axios.get(url)
        .then((response) => {
            console.log(response);
            setReadme(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    },[]);

    //make function that will display the readme file
    const displayReadme = () => {
        //get the element by class collapsible
        let coll = document.getElementsByClassName("collapsible");
        let i;
        for (i = 0; i < coll.length; i++) {
            let content = coll[i].nextElementSibling;
            //check if the element is already open
            if (content.style.display === "block") {
                //close the element
                setReadmeDisplay(false);
                content.animate([
                    {opacity: 1, transform: "translateY(0px)"},
                    {opacity: 0, transform: "translateY(-50px)"}
                ], {
                    duration: 500,
                });
                content.style.display = "none";
                //have the coll element style border radius be 0 0 0 0 when the readme is open
                //and 0 0 10px 10px when the readme is closed
                coll[i].style.borderRadius = "4px 4px 4px 4px";
                coll[i].style.marginBottom = "20px";
            }
            else {
                //open the element
                setReadmeDisplay(true);
                content.style.display = "block";
                /*smooth dropdown animation*/ 
                content.animate([
                    {opacity: 0, transform: "translateY(-50px)"},
                    {opacity: 1, transform: "translateY(0px)"}
                ], {
                    duration: 500,
                    easing: "ease-in-out",
                });
                coll[i].style.borderRadius = "4px 4px 0px 0px";
                coll[i].style.marginBottom = "0px";
            }
        }
        return
    }

    const iconstyle = {
        fontSize: "2.0rem",
        marginLeft: "1rem",
        display: "inline-block",
        verticalAlign: "middle",
        float: "right",
    }

    return (
    <>
        {readme !== "" ? 
            readme === null ? <></> :
            //have a collapsable element to display the readme file
            <>
                <button className="collapsible" onClick={displayReadme}>Extra info {readmeDisplay ? <AiFillMinusCircle style={iconstyle}/> : <BsFillPlusCircleFill style={iconstyle}/> }</button>
                <div className="content">
                    <ReactMarkdown className="markdownStyle">{readme}</ReactMarkdown>
                </div>
            </>
        : <p>Loading...</p>}
    </>
    );
}

export default FileReadme;