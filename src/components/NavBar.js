import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/image.png'

function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand text-white" href="index.html">Perfulandia <img src={logo} alt="" style={{ height: 20 }}/> </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Link className="navbar-brand" to="/"></Link>
                <div className="navbar-nav d-flex flex-row gap-3">
                    <Link className="nav-link active" to="/">Inicio</Link>
                    <Link className="nav-link" to="/nosotros">Inicio Sesion/Registro</Link>
                    <Link className="nav-link" to="/servicios">Productos</Link>

                </div>
            </div>
        </nav>
    );

}

export default NavBar;