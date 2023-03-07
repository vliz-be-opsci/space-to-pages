// Description: This is the homepage of the website
import React, {useEffect, useState} from "react";
import { Navigation} from "../components/navigation";
import { Header } from "../components/header";
import { Features } from "../components/features";
import { Services } from "../components/services";
import { Team } from "../components/Team";

const Homepage = (data) => {
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
            <Header data={landingPageData.Header} />
            <Features data={landingPageData.Features} />
            <Services data={landingPageData.Services} />
            <Team data={landingPageData.Contacts} />
        </div>
    );
}

export default Homepage;