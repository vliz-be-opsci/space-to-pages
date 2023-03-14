// Description: This is the homepage of the website
import React from "react";
import { Navigation} from "../components/navigation";
import { Header } from "../components/header";
import { Features } from "../components/spaces";
import { Services } from "../components/crates";
import { Team } from "../components/Team";
import { About } from "../components/about";
import { Footer } from "../components/footer";

const Homepage = (data) => {
    console.log(data.data);
    const landingPageData = {
        "Header" : data.data.Header,
        "Features" : data.data.Features,
        "Services" : data.data.Services,
        "Contacts" : data.data.Contacts,
        "TData" : data.data.TData
    };

    return (
        <div>
            <Navigation data={landingPageData.Header}/>
            <Header data={landingPageData.Header} />
            <About data={landingPageData.Header} />
            <Features data={landingPageData.Features} />
            <Services data={landingPageData.Services} />
            <Team data={landingPageData.Contacts} />
            <Footer />
        </div>
    );
}

export default Homepage;