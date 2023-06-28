import React from "react";
import { SiLinkerd } from "react-icons/si";

export const Footer = (props) => {

  //get the current year
  const year = new Date().getFullYear();


  return (
    <div id="footer">
      <div className="container text-center flexrow">
        <a href="./metadata.ttl"><img src="https://www.svgrepo.com/show/44264/crate.svg" style={{"height":"25px"}}/></a>
        <p>&copy; {year} <a href="#">@{props.data.Header.short_name}</a></p>
        <p>&copy; 2023 <a href="https://open-science.vliz.be/">@vliz-be-opsci</a> React Landing Page Template</p>
      </div>
    </div>
  );
};
