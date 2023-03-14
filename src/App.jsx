import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";
import Data from "./pages/data_explorer";
import FilePage from "./pages/filepage";
import MainData from "./data/main_data.json";
import ContactData from "./data/contacts.json";
import FeaturesData from "./data/project_features.json";
import ServicesData from "./data/project_services.json";
import TabularData from "./data/tabular_data.json";
import SmoothScroll from "smooth-scroll";
import { v5 as uuidv5} from "uuid"; 
import "./App.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});


const App = () => {

  const namespace = "1b671a64-40d5-491e-99b0-da01ff1f3341";
  
  TabularData.forEach((item) => {
    //make the uuid based on the name of the file
    item.id = uuidv5(item.name, namespace);
  });

  console.log(window.location.hash);

  const landingPageData= {
    "Header" : MainData,
    "Features" : FeaturesData,
    "Services" : ServicesData,
    "Contacts" : ContactData,
    "TData" : TabularData
  };
  console.log(landingPageData);
  return (
    <Routes>
      <Route path="/" element={<Homepage data={landingPageData} />} />
      <Route path="/data/:id" element={<FilePage data={landingPageData} />} />
      <Route path="/data" element={<Data data={landingPageData} />} />
    </Routes>
  );
};

export default App;
