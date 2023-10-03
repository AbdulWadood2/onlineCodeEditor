/* react*/
import { useNavigate } from "react-router-dom";
import { useState } from "react";
/* axios for api */
import axios from "axios";
/* css */
import "../pagesCSS/registerPageCSS.css";
const RegisterPage = () => {
  /* states */
  const [Message, setMessage] = useState("");
  /* innitialize the working of useNavigate */
  const navigate = useNavigate();
  const handleSubmitClick = async () => {
    const myVal = localStorage.getItem("myVal");
    const inputTag = document.getElementById("input");
    const inputValue = inputTag.value;
    localStorage.myVal = inputValue;
    let response = await axios.post(
      "http://localhost:3001/api/createRegisterFolder",
      {
        registerationName: inputValue,
      }
    );
    response = response.data.message;
    if (response === "success") {
      // Push the value to the '/codePlayGround' route
      navigate("/codePlayGround");
      await axios.post("http://localhost:3001/api/deleteCompletely", {
        filename: myVal,
      });
    } else {
      setMessage(response);
    }
  };
  return (
    <div className="container">
      <div className="Message">{Message}</div>
      <div className="inputSubmitArea">
        <div className="input">
          <input id="input" placeholder="ENTER YOUR REGISTER NAME" />
        </div>
        <div className="submit" onClick={handleSubmitClick}>
          Submit
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
