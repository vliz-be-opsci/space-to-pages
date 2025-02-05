// Description: This is the homepage of the website
import React from "react";
import { Navigation} from "../components/navigation";
import { Header } from "../components/header";
import { Profiles } from "../components/profiles";
import { Crates } from "../components/crates";
import { Team } from "../components/Team";
import { About } from "../components/about";
import { Publications } from "../components/Publications";
import { Footer } from "../components/footer";

const Homepage = (data) => {
    console.log(data.data);
    const landingPageData = {
        "Header" : data.data.Header,
        "Profiles" : data.data.Profiles,
        "Crates" : data.data.Crates,
        "Contacts" : data.data.Contacts,
        "Publications" : data.data.Publications,
        "TData" : data.data.TData
    };

    return (
        <div>
            <Navigation data={landingPageData.Header} crates={landingPageData.Crates} profiles={landingPageData.Profiles} docs={landingPageData.Docs}/>
            <Header data={landingPageData.Header} />
            <About data={landingPageData.Header} />
            { 
              landingPageData.Crates.length > 0 ?
              <Crates data={landingPageData.Crates} />
                :
                <></>
            }
            <Publications data={landingPageData.Publications} />
            {
                landingPageData.Profiles.length > 0 ?
                <Profiles data={landingPageData.Profiles} />
                :
                <></>
            }
            <Team data={landingPageData.Contacts} />
            <Footer data={landingPageData}/>
        </div>
    );
}

export default Homepage;