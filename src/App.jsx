import React, {useEffect, useState} from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";
import Data from "./pages/data_explorer";
import FilePage from "./pages/filepage";
import MainData from "./data/main_data.json";
import ContactData from "./data/contacts.json";
import ProfilesData from "./data/project_profiles.json";
import CratesData from "./data/project_crates.json";
import TabularData from "./data/tabular_data.json";
import PublicationsData from "./data/publications.json";
import BooksData from "./data/books.json";
import SmoothScroll from "smooth-scroll";
import { v5 as uuidv5} from "uuid"; 
import "./App.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {

  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

  const namespace = "1b671a64-40d5-491e-99b0-da01ff1f3341";
  
  TabularData.forEach((item) => {
    //make the uuid based on the name of the file
    item.id = uuidv5(item.name, namespace);
  });

  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    window.addEventListener("hashchange", () => {
      setHash(window.location.hash);
    });
  }, []);

  const landingPageData= {
    "Header" : MainData,
    "Profiles" : ProfilesData,
    "Crates" : CratesData,
    "Contacts" : ContactData,
    "Publications" : PublicationsData,
    "TData" : TabularData,
    "Books" : BooksData,
  };

  console.log(landingPageData);
  return (
    <Routes>
      <Route path="/" element={<Homepage data={landingPageData} />} />
      <Route path="/data-explorer/:id" element={<FilePage data={landingPageData} />} />
      <Route path="/data-explorer" element={<Data data={landingPageData} />} />
      <Route path="/*" element={<Homepage data={landingPageData} />} />
    </Routes>
  );
};

export default App;
