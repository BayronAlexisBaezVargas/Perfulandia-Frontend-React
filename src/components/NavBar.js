import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/image.png';
import { useCart } from '../context/CartContext';
import { CartFill, PersonCircle, BoxArrowRight } from 'react-bootstrap-icons';
import { useAuth } from '../utils/auth';

const NAV_LINKS = [
    { to: '/', label: 'Inicio' },
    { to: '/Productos', label: 'Productos' },
];

function navLinkClass({ isActive }) {
    return `nav-link${isActive ? ' active' : ''}`;
}

function NavBar() {
    const { totalItems } = useCart();
    const { user, handleLogout } = useAuth(); // Usar el hook de auth
    const navigate = useNavigate();

    // Determinar el color del icono de perfil
    const profileIconClass = user ? 'text-success' : 'text-white';

    const handleProfileClick = () => {
        if (user) {
            navigate('/perfil');
        } else {
            navigate('/InicioS');
        }
    };

    // Función para manejar el logout
    const handleUserLogout = () => {
        handleLogout();
        navigate('/'); // Redirigir a inicio después de cerrar sesión
    };

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

                        {/* Botón/Icono de Perfil */}
                        <li className="nav-item">
                            <button
                                className={`nav-link btn btn-link ${profileIconClass}`}
                                type="button"
                                onClick={handleProfileClick}
                                title={user ? `Ver Perfil: ${user.name}` : 'Iniciar Sesión'}
                                style={{
                                    border: 'none',
                                    backgroundColor: 'transparent',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    fontWeight: '500',
                                    padding: '0.5rem 1rem'
                                }}
                            >
                                <PersonCircle size={20} className="me-2" />
                                {user ? user.name : 'Ingresar'}
                            </button>
                        </li>

                        {/* Botón de Cerrar Sesión (solo si está logeado y NO es admin) */}
                        {user && user.role !== 'admin' && ( // Solo mostrar el de usuario, el de admin es en su dashboard
                            <li className="nav-item">
                                <button
                                    className="nav-link btn btn-link text-danger"
                                    type="button"
                                    onClick={handleUserLogout}
                                    title="Cerrar Sesión"
                                    style={{
                                        border: 'none',
                                        backgroundColor: 'transparent',
                                        cursor: 'pointer',
                                        fontSize: '1rem',
                                        fontWeight: '500',
                                        padding: '0.5rem 1rem'
                                    }}
                                >
                                    <BoxArrowRight size={20} />
                                </button>
                            </li>
                        )}

                        {/* Botón del Carrito (Offcanvas) */}
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