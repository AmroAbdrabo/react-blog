import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Cards from "./pages/sec/cards";
import SecPage from "./pages/sec/index"
import Pass from "./pages/sec/pass"
import Syssec from "./pages/sec/syssec"


//import logo from './logo.svg';
import * as React from 'react';
import './App.css';


function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route index element={<Home />} />
        <Route path="/blog/security" element={<SecPage />} />
        <Route path="/blog/security/pass" element={<Pass />} />
        <Route path="/blog/security/syssec" element={<Syssec />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
