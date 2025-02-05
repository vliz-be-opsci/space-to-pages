import React from "react";

export const Navigation = (props) => {

  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

  //get the current route 
  const currentRoutePath = window.location.pathname;
  console.log(currentRoutePath);

  //get the current hash route
  const currentRoute = window.location.hash;
  console.log(currentRoute);
  //make prepend variable that will be used to prepend the hash route to the href
  function prependHash(currentRoute) {
    //if the current route is not #aboutsection,#publications,#profiles,#crates,#team then prepend hash
    if (
      !currentRoute.includes("aboutsection") &&
      !currentRoute.includes("publications") &&
      !currentRoute.includes("profiles") &&
      !currentRoute.includes("crates") &&
      !currentRoute.includes("team") &&
      !currentRoute.includes("")
    ) {
      return "/";
    } else {
      //return query string
      return "";
    }
  }
  
  const prepend = prependHash(currentRoute);
  console.log(prepend);
  const logostyle = {
    width: "30px",
    height: "30px",
  }


  console.log(props)
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href={currentRoutePath+prepend}>
            {props.data ? 
            <>
              <img src={props.data.logo} style={logostyle} alt="project_title_here"></img>
            </>
             : "Loading"}
          </a>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            {props.data ? 
              props.data.markdown_about_us && props.data.markdown_about_us !== "" ?
            (
              <li>
                <a href={currentRoutePath+prepend+"#aboutsection"}  className="page-scroll">
                  About
                </a>
              </li>
              ) : (
              <></>
              )
            : (
              <></>
            )
            }
            <li>
              <a href="docs">
                Docs
              </a>
            </li>
            {
              props.data.TData ?
              <li>
                <a href={currentRoutePath+"#/data-explorer"} className="page-scroll">
                  Data explorer
                </a>
              </li>
              :
              <></>
            }
            {
              //check if length of profiles is greater than 0
              props.crates.length > 0 ? (
                <li>
                  <a 
                  href={currentRoutePath+prepend+"#crates"} 
                  className="page-scroll" 
                  data-toggle="tooltip2" 
                  data-placement="bottom" 
                  title="Research Object Crates (https://www.researchobject.org/ro-crate/): a way to package file-based research data so they are linked, grouped, described, and semantically annotated. In our Github spaces, each repository can also be a RO-Crate."
                  >
                    Data
                  </a>
                </li>
              ) : (
                <></>
              )
            }
            <li>
              <a href={currentRoutePath+prepend+"#publications"} className="page-scroll">
                Publications
              </a>
            </li>
            {
              //check if length of profiles is greater than 0
              props.profiles.length > 0 ? (
                <li>
                  <a 
                  href={currentRoutePath+prepend+"#profiles"}
                  className="page-scroll"
                  data-toggle="tooltip1" 
                  data-placement="top" 
                  title="Research Object Profiles (https://www.researchobject.org/ro-crate/): a set of conventions, types, and properties that one minimally can require and expect to be present in a particular type of RO-Crate, thus standardising their layout."
                  >
                    RO-Profiles
                  </a>
                </li>
              ) : (
                <></>
              )
            }
            <li>
              <a href={currentRoutePath+prepend+"#team"} className="page-scroll">
                Contact
              </a>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
};
