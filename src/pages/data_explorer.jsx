// description: data page. This page is used to display the data from the json files
import React from "react";
import { Navigation} from "../components/navigation";
import { DataFiles } from "../components/datafiles";
import  { Footer } from "../components/footer";


const Data = (data) => {
    console.log(data.data);

    const landingPageData = {
        "Header" : data.data.Header,
        "Features" : data.data.Features,
        "Services" : data.data.Services,
        "Contacts" : data.data.Contacts,
        "TData" : data.data.TData,
        "Books" : data.data.Books,
    };

    return (
        <div>
            <Navigation data={landingPageData.Header} books={landingPageData.Books}/>
            <DataFiles data={landingPageData.TData}/>
            <Footer/>
        </div>
    );
}

export default Data;
