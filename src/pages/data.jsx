// description: data page. This page is used to display the data from the json files
import React, {useEffect, useState} from "react";
import { Navigation} from "../components/navigation";
import { DataFiles } from "../components/datafiles";


const Data = (data) => {
    console.log(data.data);

    const [landingPageData, setLandingPageData] = useState({
        "Header" : data.data.Header,
        "Features" : data.data.Features,
        "Services" : data.data.Services,
        "Contacts" : data.data.Contacts,
        "TData" : data.data.TData
    });
    useEffect(() => {
        setLandingPageData({
            "Header" : data.data.Header,
            "Features" : data.data.Features,
            "Services" : data.data.Services,
            "Contacts" : data.data.Contacts,
            "TData" : data.data.TData
        }
        )
    }, []);

    return (
        <div>
            <Navigation data={landingPageData.Header}/>
            <DataFiles data={landingPageData.TData}/>
        </div>
    );
}

export default Data;
