import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// --- NUEVO ---
// 1. Importa el CartProvider
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './utils/auth';

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';


import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

// --- NUEVO ---
// 2. Importa el componente Carrito (Offcanvas)
import Carrito from "./components/Carrito";

import Home from "./pages/Home";
import InicioSesion from "./pages/InicioSesion";
import Products from "./pages/Productos";
import Blog from "./pages/Blog";
import Contacto from "./pages/Contacto";
import Admin from './pages/admin';
import SobreNosotros from "./pages/AboutUS";

import DetallePago from "./pages/DetallePago";

import Perfil from "./pages/Perfil";

import DetalleProducto from "./pages/DetalleProducto";

import ConfirmacionCompra from "./pages/ConfirmacionCompra";

function Layout() {
    const location = useLocation();
    const hideChrome = location.pathname.startsWith('/admin');

    return (
        <>

            {!hideChrome && <NavBar />}

            {!hideChrome && <Carrito />}

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/InicioS" element={<InicioSesion />} />
                <Route path="/Productos" element={<Products />} />
                <Route path="/sobre-nosotros" element={<SobreNosotros />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/detalle-pago" element={<DetallePago />} />
                <Route path="/confirmacion-compra" element={<ConfirmacionCompra />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/productos/:id" element={<DetalleProducto />} />
                <Route path="/confirmacion-compra" element={<ConfirmacionCompra />} />
            </Routes>
            {!hideChrome && <Footer />}
        </>
    );
}

function App() {
    return (
        <Router>
            <AuthProvider>
                <CartProvider>
                    <Layout />
                </CartProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;

