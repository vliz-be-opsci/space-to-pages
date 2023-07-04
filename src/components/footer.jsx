import React from "react";
import { SiLinkerd } from "react-icons/si";

export const Footer = (props) => {

  //get the current year
  const year = new Date().getFullYear();


  return (
    <div id="footer">
      <div className="container text-center flexrow">
            <p></p>
            <p>Created from 
                <a href="https://github.com/vliz-be-opsci/https://github.com/vliz-be-opsci/space-to-pages"> space-to-pages </a> 
                by 
                <a href="https://open-science.vliz.be/" target="_blank">
                    <img src="https://open-science.vliz.be/img/vliz-opsci-logo.png" alt="@vliz-be-opsci" className="footer_logo"/>
                </a>
            </p>
            <p>
                <a href="./metadata.ttl">
                    <img src="https://open-science.vliz.be/img/rdf.png" alt="metadata.ttl" className="footer_logo"/>
                </a>
            </p>
      </div>
    </div>
  );
};
