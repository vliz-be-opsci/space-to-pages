import React from "react";
import { Navigation} from "../components/navigation";
import { GroupedCratesTable } from "../components/groupedcrates";
import { Footer } from "../components/footer";

const GroupedCrates = (data) => {
    console.log(data.data);

    const landingPageData = {
        "Header" : data.data.Header,
        "Features" : data.data.Features,
        "Services" : data.data.Services,
        "Contacts" : data.data.Contacts,
        "TData" : data.data.TData
    };

    //get the current hash route
    const currentRoute = window.location.hash;
    console.log(currentRoute);
    const currentCrate = currentRoute.slice(1);
    //check in data.data.Crates if there is a url that matches the current hasroute
    const currentCrateinfo = data.data.Crates.find(crate => crate.url === currentCrate);
    console.log(currentCrateinfo);

    return (
        <div>
            <Navigation data={landingPageData.Header}/>
            <GroupedCratesTable data={currentCrateinfo}/>
            <Footer/>
        </div>
    );
}

export default GroupedCrates;