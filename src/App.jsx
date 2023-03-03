import React, { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Gallery } from "./components/gallery";
import { Testimonials } from "./components/testimonials";
import { Team } from "./components/Team";
import { Contact } from "./components/contact";
import MainData from "./data/main_data.json";
import ContactData from "./data/contacts.json";
import FeaturesData from "./data/project_features.json";
import ServicesData from "./data/project_services.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData({
      "Header" : MainData,
      "Features" : FeaturesData,
      "Services" : ServicesData,
      "Contacts" : ContactData
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
};

export default App;
