import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
/* for get input value in this route */
/* css */
import "../pagesCSS/codePlayGroundCSS.css";
const CodePlayGround = () => {
  /* innitialize the working of useNavigate */
  const navigate = useNavigate();
  /* this is for assign value to Registeration header value */
  const [Registeration, setRegisteration] = useState("");
  // Use the useLocation hook to access the location state
  /* useEffect */
  const registerationName = localStorage.getItem("myVal");
  useEffect(() => {
    // Use inputValue in this component
    setRegisteration(registerationName);
  }, [registerationName]);

  /* navigate html */
  const navigateHTML = async () => {
    
    navigate("/HtmlPage");
  };
  /* navigate css */
  const navigateCSS = async () => {
    navigate("/CssPage");
  };
  /* navigate js */
  const navigateJS = async () => {
    navigate("/JsPage");
  };
  // Rest of your code
  return (
    <div className="container">
      <div id="header">{Registeration}</div>
      <div className="contain">
        <div onClick={navigateHTML}>index.html</div>
        <div onClick={navigateCSS}>index.css</div>
        <div onClick={navigateJS}>index.js</div>
      </div>
    </div>
  );
};

export default CodePlayGround;
