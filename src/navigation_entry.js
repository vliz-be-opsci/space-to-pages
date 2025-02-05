import React from "react";
import ReactDOM from "react-dom";
import { Navigation } from "./components/navigation";
import MainData from "./data/main_data.json";
import CratesData from "./data/project_crates.json";
import ProfilesData from "./data/project_profiles.json";

const data = {
  Header: MainData,
  Crates: CratesData,
  Profiles: ProfilesData,
};

ReactDOM.render(
  <Navigation
    data={data.Header}
    crates={data.Crates}
    profiles={data.Profiles}
  />,
  document.getElementById("navigation-root")
);
