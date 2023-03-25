import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import Start from "./pages/home";
import SecPage from "./pages/sec/index"
import MlPage from "./pages/ml/index"
import AlPage from "./pages/alg/index"
import Pass from "./pages/sec/pass"
import ExPage from "./pages/life/index"
import Syssec from "./pages/sec/syssec"

//import logo from './logo.svg';
import * as React from 'react';
import  {useEffect } from 'react';


function App() {
  useEffect(() => {
    document.title = 'Amro Blog';
  });
//   var dropdown = document.getElementsByClassName("dropdown-btn");
// var i;

// for (i = 0; i < dropdown.length; i++) {
//   dropdown[i].addEventListener("click", function() {
//     this.classList.toggle("active");
//     var dropdownContent = this.nextElementSibling;
//     if (dropdownContent.style.display === "block") {
//       dropdownContent.style.display = "none";
//     } else {
//       dropdownContent.style.display = "block";
//     }
//   });
// }
  return (
    <>
    <HashRouter>
    <Routes>
        <Route index element={<Start />} />
        <Route path="/blog/ml" element={<MlPage />} />
        <Route path="/blog/security" element={<SecPage />} />
        <Route path="/blog/alg" element={<AlPage />} />
        <Route path="/blog/life" element={<ExPage />} />
        <Route path="/blog/security/pass" element={<Pass />} />
        <Route path="/blog/security/syssec" element={<Syssec />} />
    </Routes>
  </HashRouter>
  </>
  );
}

export default App;
