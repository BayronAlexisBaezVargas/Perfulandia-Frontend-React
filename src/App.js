import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

import Home from "./pages/Home";
import InicioSesion from "./pages/InicioSesion";
import Products from "./pages/Productos";
import Blog from "./pages/Blog";
import Contacto from "./pages/Contacto";
import Admin from './pages/admin';

import SobreNosotros from "./pages/AboutUS";

function Layout() {
    const location = useLocation();
    const hideChrome = location.pathname.startsWith('/admin');

    return (
        <>
            {!hideChrome && <NavBar />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/InicioS" element={<InicioSesion />} />
                <Route path="/Productos" element={<Products />} />
                <Route path="/sobre-nosotros" element={<SobreNosotros />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
            {!hideChrome && <Footer />}
        </>
    );
}

function App() {
    return (
        <Router>
            <Layout />
        </Router>
    );
}

export default App;

