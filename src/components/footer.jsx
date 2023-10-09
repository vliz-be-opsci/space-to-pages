import React from "react";

export const Footer = (props) => {
  console.log(process.env.REACT_APP_GH_REPO);
  //get the current year
  const year = new Date().getFullYear();
  return (
    <div id="footer">
      <div className="container text-center flexrow">
            <p></p>
            <p>Created by
                <a href="https://github.com/vliz-be-opsci/https://github.com/vliz-be-opsci/space-to-pages"> space-to-pages </a> 
                from
                <a href="https://open-science.vliz.be/" target="_blank">
                    <img src="https://open-science.vliz.be/common-assets/img/VLIZ_LOGO.svg" alt="@vliz-be-opsci" className="footer_logo"/>
                </a>
                with data 
                <a href={"https://github.com/"+process.env.REACT_APP_GH_REPO} target="_blank">
                    <img src="https://open-science.vliz.be/common-assets/img/github-logo.svg" alt="data-location" className="footer_logo"/>
                </a>
            </p>
            <p>
                as 
                <a href="./metadata.ttl">
                    <img src="https://open-science.vliz.be/common-assets/img/rdf-logo.svg" alt="metadata.ttl" className="footer_logo"/>
                </a>
            </p>
      </div>
    </div>
  );
};
