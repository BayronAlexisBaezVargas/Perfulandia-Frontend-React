import 'bootstrap/dist/css/bootstrap.min.css';
import React,{ useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

import Home from "./pages/Home";

function App() {
  return (
      <Router>
        <NavBar />
         <Routes>
             <Route path="/" element={<Home />}  />
         </Routes>
        <Footer />
      </Router>
  );

}

export default App;
