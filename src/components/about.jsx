import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export const About = (props) => {
  console.log(props.data);

  const [readme, setReadme] = useState("");

  //make the url to get the readme file
  //check if props.data.markdown_about_us exists
  let url = "";
  if (props.data?.markdown_about_us !== undefined) {
    //check if it starts with https://raw.githubusercontent.com/
    if (props.data.markdown_about_us.startsWith("https://raw.githubusercontent.com/")) {
      url = props.data.markdown_about_us;
    } else {
      let url_to_get = props.data.markdown_about_us.replace(
        "https://github.com/",
        "https://raw.githubusercontent.com/"
      );
      url = url_to_get.replace("/blob/", "/");
    }
  }

  useEffect(() => {
    if (!url) {
      return;
    }
    axios
      .get(url)
      .then((response) => {
        console.log(response);
        setReadme(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [url]);

  if (url === "") {
    return <></>;
  }

  return (
    <div id="aboutsection" className="text-center">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>About us</h2>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-12">
            <div className="markdownStyleAboutUs">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {readme}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
