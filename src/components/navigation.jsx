import React from "react";

export const Navigation = (props) => {

  //get the current route 
  const currentRoutePath = window.location.pathname;
  console.log(currentRoutePath);

  //get the current hash route
  const currentRoute = window.location.hash;
  console.log(currentRoute);
  //make prepend variable that will be used to prepend the hash route to the href
  function prependHash(currentRoute) {
    if (currentRoute.includes("#/data")) {
      return "#/";
    } else {
      return "";
    }
  }
  const prepend = prependHash(currentRoute);
  console.log(prepend);
  const logostyle = {
    width: "40px",
    height: "40px",
    display: "inline-block",
    verticalAlign: "middle"
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
          <a className="navbar-brand page-scroll" href={currentRoutePath+prepend+"#"}>
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
              <a href={currentRoutePath+prepend+"#profiles"} className="page-scroll">
                Profiles
              </a>
            </li>
            <li>
              <a href={currentRoutePath+prepend+"#crates"} className="page-scroll">
                Crates
              </a>
            </li>
            <li>
              <a href={currentRoutePath+prepend+"#team"} className="page-scroll">
                Team
              </a>
            </li>
            <li>
              <a href={currentRoutePath+"#/data"} className="page-scroll">
                Data explorer
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
