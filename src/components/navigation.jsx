import React from "react";

export const Navigation = (props) => {

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
          <a className="navbar-brand page-scroll" href={prepend+"#"}>
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
                <a href={prepend+"#aboutsection"}  className="page-scroll">
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
              <a href={prepend+"#features"} className="page-scroll">
                Features
              </a>
            </li>
            <li>
              <a href={prepend+"#services"} className="page-scroll">
                Services
              </a>
            </li>
            <li>
              <a href={prepend+"#team"} className="page-scroll">
                Team
              </a>
            </li>
            <li>
              <a href="/#/data" className="page-scroll">
                Data
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
