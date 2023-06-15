import React from "react";
import { SiLinkerd } from "react-icons/si";

export const Footer = (props) => {

  //get the current year
  const year = new Date().getFullYear();


  return (
    <div id="footer">
      <div className="container text-center">
        <p>
        &copy; {year} <a href="#">@{props.data.Header.short_name}</a> .
        <br />
          &copy; 2023 <a href="https://open-science.vliz.be/">@vliz-be-opsci</a> React Landing Page Template.
        <br />
        <a href="./metadata.ttl"><SiLinkerd/></a>
        </p>
      </div>
    </div>
  );
};
