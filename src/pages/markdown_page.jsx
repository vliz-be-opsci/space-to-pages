import React , {useState, useEffect} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import rehypeRaw from "rehype-raw";
import { Navigation } from "../components/navigation";
import { Footer } from "../components/footer";

import axios from "axios";

const MarkdownPage = ({ data }) => {

  //get the last part of the hash 
  const file_id = window.location.hash.split("/").pop();

  console.log(file_id);
  console.log(data);


  const landingPageData = {
          "Header" : data.Header,
          "Profiles" : data.Profiles,
          "Crates" : data.Crates,
          "Contacts" : data.Contacts,
          "Publications" : data.Publications,
          "TData" : data.TData,
          "Docs": data.Docs
      };

    console.log(landingPageData);

    const [content, setContent] = useState("");

    useEffect(() => {
        const fetchMarkdown = async () => {
            try {
                const response = await axios.get(`./docs/${file_id}.md`);
                setContent(response.data);
            } catch (error) {
                console.error("Error fetching the markdown file:", error);
            }
        };

    fetchMarkdown();
}, [file_id]);

  return (
    <div>
        <Navigation data={landingPageData.Header} crates={landingPageData.Crates} profiles={landingPageData.Profiles} docs={landingPageData.Docs}/>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div id="aboutsection" className="text-center">
                <div className="container">
                  <div className="col-md-10 col-md-offset-1 section-title">
                    <h2>{file_id}</h2>
                  </div>
                  <div className="row">
                    <div className="col-xs-12 col-md-12">
                      <ReactMarkdown className="markdownStyleAboutUs" remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>
        <Footer/>
    </div>
  );
};

export default MarkdownPage;
