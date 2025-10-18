import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/image.png'

const NAV_LINKS = [
    { to: '/', label: 'Inicio' },
    { to: '/InicioS', label: 'Inicio sesión/Registro' },
    { to: '/Productos', label: 'Productos' },
];

function navLinkClass({ isActive }) {
    return `nav-link${isActive ? ' active' : ''}`;
}

function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <NavLink className="navbar-brand d-flex align-items-center text-white" to="/">
                    Perfulandia <img src={logo} alt="Logo" style={{ height: 20, marginLeft: 8 }} />
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#menu"
                    aria-controls="menu"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="menu">
                    <ul className="navbar-nav ms-auto">
                        {NAV_LINKS.map(({ to, label }) => (
                            <li key={to} className="nav-item">
                                <NavLink to={to} className={navLinkClass} end={to === '/'}>
                                    {label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );


}

export default NavBar;