import React from "react";

export const Header = (props) => {
  const fallback_background = "./img/fallback_background.jpg";
  console.log(props.data);
  const introstyle = {
    //make the background image cover the whole div
    backgroundSize: "cover",
    display: "table",
    width: "100%",
    height: "100vh",
    //have the background be opace
    // if props.data.main_image exists, use it, otherwise use the fallback image
    backgroundImage: `url(${
      props.data ? 
        //check if the image exists
        props.data.main_image && props.data.main_image !== "" ?
          //if it does, use it
          props.data.main_image :
          //if it doesn't, use the fallback image
          fallback_background 
        :
        //if props.data doesn't exist, use the fallback image
        fallback_background
    })`,
  }

  const paragraphstyle = {
    backgroundColor: "rgba(0,0,0,0.3)",
    height: "100vh"
  }

  return (
    <header id="header" style={{height:"100vh"}}>
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
                  href="#features"
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
