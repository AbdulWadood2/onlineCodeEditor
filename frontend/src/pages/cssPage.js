import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
/* axios for api */
import axios from "axios";
/* this is same as vs code 😉 */
/* editor  monaco-editor/react*/
import Editor from "@monaco-editor/react";
/* css */
import "../pagesCSS/cssPageCSS.css";
const CssPage = () => {
  const [editorValue, setEditorValue] = useState("");
  /* innitialize the working of useNavigate */
  const navigate = useNavigate();
  const [Registeration, setRegisteration] = useState("");
  const registerationName = localStorage.getItem("myVal");
  useEffect(() => {
    // Use inputValue in this component
    setRegisteration(registerationName);
  }, [registerationName]);
  /* addServerValueInCodeEditor */
  async function addServerValueInCodeEditor() {
    const response = await axios.post("http://localhost:3001/api/getFile", {
      registerationName: registerationName,
      filename: "index.css",
    });
    setEditorValue(response.data.data);
  }
  addServerValueInCodeEditor();
  /* handle file Change */
  async function handleEditorChange(value, event) {
    await axios.post("http://localhost:3001/api/writeFile", {
      registerationName: registerationName,
      fileName: "index.css",
      data: value,
    });
  }
  /* handle run click */
  async function runHtmlInNewTab() {
    await axios.post("http://localhost:3001/api/openHtml", {
      registerationName: registerationName,
    });
  }
  /* handle download click */
  const handleDownloadClick = async () => {
    axios
      .post(
        "http://localhost:3001/api/saveWorkOnHome",
        {
          registerationName: registerationName,
        },
        {
          responseType: "blob", // Important: Set responseType to 'blob'
        }
      ) // Replace with the correct API endpoint
      .then((response) => {
        // Trigger download when the response is received
        const blob = new Blob([response.data], { type: "application/zip" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = `${registerationName}.zip`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  /* navigate html */
  const navigateHTML = async () => {
    navigate("/HtmlPage");
  };
  /* navigate js */
  const navigateJS = async () => {
    navigate("/JsPage");
  };
  return (
    <div className="container">
      <div id="header">{Registeration}</div>
      <div className="contain">
        <div onClick={navigateHTML}>index.html</div>
        <div id="active">index.css</div>
        <div onClick={navigateJS}>index.js</div>
        <div onClick={runHtmlInNewTab}>run</div>
        <div onClick={handleDownloadClick}>Download</div>
      </div>
      <div className="CodeContainet">
        <Editor
          height="90vh"
          defaultLanguage="css"
          theme="vs-dark"
          defaultValue="// write here"
          value={editorValue}
          onChange={handleEditorChange}
        />
      </div>
    </div>
  );
};

export default CssPage;
