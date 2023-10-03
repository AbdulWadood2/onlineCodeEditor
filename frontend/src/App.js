import { BrowserRouter, Routes, Route } from "react-router-dom";
/* pages */
import RegisterPage from "./pages/registerPage";
import CodePlayGround from "./pages/codePlayGround";
import HtmlPage from "./pages/htmlPage"
import CssPage from "./pages/cssPage"
import JsPage from "./pages/jsPage"

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<RegisterPage />}></Route>
          <Route path="/codePlayGround" element={<CodePlayGround />}></Route>
          <Route path="/HtmlPage" element={<HtmlPage />}></Route>
          <Route path="/CssPage" element={<CssPage />}></Route>
          <Route path="/JsPage" element={<JsPage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
