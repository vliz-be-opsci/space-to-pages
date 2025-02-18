import React from "react";
import ReactDOM from "react-dom";
import { Navigation } from "./components/navigation";
import MainData from "./data/main_data.json";
import CratesData from "./data/project_crates.json";
import ProfilesData from "./data/project_profiles.json";
import BooksData from "./data/books.json";
import ResultsData from "./data/results.json";

const data = {
  Header: MainData,
  Crates: CratesData,
  Profiles: ProfilesData,
  Books: BooksData,
  Results: ResultsData,
};

ReactDOM.render(
  <Navigation
    data={data.Header}
    crates={data.Crates}
    profiles={data.Profiles}
    books={data.Books}
    results={data.Results}
  />,
  document.getElementById("navigation-root")
);
