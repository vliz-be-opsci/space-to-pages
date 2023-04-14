//this page will be used to display the data from one file comong from the json files.data
import React from "react";
import { Navigation} from "../components/navigation";
import SingleFileContents from "../containers/singlefilecontens";
import { Footer } from "../components/footer";
const FilePage = (props) => {
    console.log(props.data);
    console.log(window.location.hash);

    //get the last part of the hash 
    const file_id = window.location.hash.split("/").pop();
    //find the file with the id in props.data.TData
    const filee = props.data.TData.find((file) => file.id === file_id);

    const filepagestyle = {
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
    }

    
    return (
        <div style={filepagestyle}>
            <Navigation data={props.data.Header}/>
            <SingleFileContents data={filee}/>
            <Footer/>
        </div>
    );
}

export default FilePage;
