// Description: This is the homepage of the website
import React from "react";
import { Navigation} from "../components/navigation";
import { Header } from "../components/header";
import { Profiles } from "../components/profiles";
import { Crates } from "../components/crates";
import { Team } from "../components/Team";
import { About } from "../components/about";
import { Footer } from "../components/footer";

const Homepage = (data) => {
    console.log(data.data);
    const landingPageData = {
        "Header" : data.data.Header,
        "Profiles" : data.data.Profiles,
        "Crates" : data.data.Crates,
        "Contacts" : data.data.Contacts,
        "TData" : data.data.TData
    };

    return (
        <div>
            <Navigation data={landingPageData.Header}/>
            <Header data={landingPageData.Header} />
            <About data={landingPageData.Header} />
            <Profiles data={landingPageData.Profiles} />
            <Crates data={landingPageData.Crates} />
            <Team data={landingPageData.Contacts} />
            <Footer />
        </div>
    );
}

export default Homepage;