//this component is used to display the readme file of the selected repository

import React, {useEffect, useState} from "react";
import axios from "axios";
import ReactMarkdown from 'react-markdown';
const FileReadme = (props) => {
    console.log(props);
    //make a request to the github api to get the readme file
    const [readme, setReadme] = useState("");

    useEffect(() => {
        //check if props.data.extra_info exists
        if (props.data.extra_info === undefined) {
            setReadme("No readme file found");
            return;
        }
        //change the github url to get the raw file
        let url = props.data.extra_info.replace("https://github.com/", "https://raw.githubusercontent.com/");
        url = url.replace("/blob/", "/");
        axios.get(url)
        .then((response) => {
            console.log(response);
            setReadme(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);



    return (
    <>
        {readme !== "" ? <ReactMarkdown className="markdownStyle">{readme}</ReactMarkdown> : <p>Loading...</p>}
    </>
    );
}

export default FileReadme;