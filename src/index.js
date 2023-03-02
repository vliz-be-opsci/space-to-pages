import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import LandingPage from './pages/landing_page';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById("navbar").style.padding = "0px 0px";
        document.getElementsByClassName("project_logo")[0].style.width = "30px";
        document.getElementsByClassName("project_logo")[0].style.height = "30px";
    } else {
        document.getElementById("navbar").style.padding = "40px 10px";
        document.getElementsByClassName("project_logo")[0].style.width = "100px";
        document.getElementsByClassName("project_logo")[0].style.height = "100px";
        //have transition here
        document.getElementsByClassName("project_logo")[0].style.transition = "all 0.5s ease-in-out";
    }
    } 

root.render(
  <React.StrictMode>
    {LandingPage()}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
