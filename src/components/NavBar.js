import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/image.png';
import { useCart } from '../context/CartContext';
import { CartFill } from 'react-bootstrap-icons';

const NAV_LINKS = [
    { to: '/', label: 'Inicio' },
    { to: '/InicioS', label: 'Inicio sesión/Registro' },
    { to: '/Productos', label: 'Productos' },
];

function navLinkClass({ isActive }) {
    return `nav-link${isActive ? ' active' : ''}`;
}

function NavBar() {
    const { totalItems } = useCart();

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
                        <li className="nav-item">
                            <button
                                className="nav-link btn btn-link text-light position-relative"
                                type="button"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#cartOffcanvas"
                                aria-controls="cartOffcanvas"
                            >
                                <CartFill size={20} />
                                {totalItems > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {totalItems}
                                        <span className="visually-hidden">items en el carrito</span>
                                    </span>
                                )}
                            </button>
                        </li>
                    </ul>

                    {/* El botón ya NO va aquí afuera */}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;