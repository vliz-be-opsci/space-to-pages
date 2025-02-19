import React from "react";

export const Header = (props) => {
  const fallback_background = "./img/fallback_background.jpg";
  console.log(props.data);
  const introstyle = {
    // make the background image cover the whole div while maintaining aspect ratio
    display: "table",
    width: "100%",
    overflow: "hidden",
    backgroundSize: "cover",
    backgroundPosition: "center",
    objectFit: "cover", // ensure the image covers the div while respecting height
    // if props.data.main_image exists, use it, otherwise use the fallback image
    backgroundImage: `url(${
      props.data ? 
        // check if the image exists
        props.data.main_image && props.data.main_image !== "" ?
          // if it does, use it
          props.data.main_image :
          // if it doesn't, use the fallback image
          fallback_background 
        :
        // if props.data doesn't exist, use the fallback image
        fallback_background
    })`,
  }

  const paragraphstyle = {
    backgroundColor: "rgba(0,0,0,0.3)"
  }

  return (
    <header id="header">
      <div className="intro" style={introstyle}>
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-10 col-md-offset-1 intro-text" style={paragraphstyle}>
                <h1>
                  {props.data ? props.data.long_name : "Loading"}
                  <span></span>
                </h1>
                <p >{props.data ? props.data.description : "Loading"}</p>
                <a
                  href={props.data ? props.data.markdown_about_us && props.data.markdown_about_us !== "" ? "#aboutsection": "#features": "#features"}
                  className="btn btn-custom btn-lg page-scroll"
                >
                  Learn More
                </a>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
