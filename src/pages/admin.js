import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/image.png';
import './admin.modules.css';

/* Iconos simples en SVG (sin dependencias) */
function IconCash(props) {
    return (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M3 6h18a1 1 0 0 1 1 1v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a1 1 0 0 1 1-1zm1 2v7h16a1 1 0 0 0 1-1V8H4zm9 1a3 3 0 1 1-3 3a3 3 0 0 1 3-3z" />
        </svg>
    );
}
function IconReceipt(props) {
    return (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M7 2h10a2 2 0 0 1 2 2v16l-3-2l-3 2l-3-2l-3 2V4a2 2 0 0 1 2-2zm2 5h6v2H9V7zm0 4h6v2H9v-2z" />
        </svg>
    );
}
function IconPeople(props) {
    return (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M16 11a4 4 0 1 0-4-4a4 4 0 0 0 4 4zM6 13a3 3 0 1 0-3-3a3 3 0 0 0 3 3zm10 2c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4zM6 15c-2.5 0-6 1.17-6 3v2h6v-1c0-.72.25-1.39.69-2.01C6.45 16.36 6.21 15.66 6 15z"/>
        </svg>
    );
}
function IconDashboard(props) {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
        </svg>
    );
}
function IconBox(props) {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M21 8l-9-5l-9 5l9 5l9-5zm-9 7l-9-5v7l9 5l9-5v-7l-9 5z" />
        </svg>
    );
}
function IconUsers(props) {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M16 11a4 4 0 1 0-4-4a4 4 0 0 0 4 4zM8 12a3 3 0 1 0-3-3a3 3 0 0 0 3 3zm8 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zM8 14c-2.5 0-6 1.17-6 3v3h6v-1c0-1.2.39-2.28 1.07-3.24C8.72 14.42 8.35 14.2 8 14z"/>
        </svg>
    );
}
function IconChart(props) {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M3 3h2v18H3V3zm16 18h2V9h-2v12zM7 21h2V13H7v8zm8 0h2V5h-2v16z" />
        </svg>
    );
}

function Admin() {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        try {
            const raw = localStorage.getItem('authUser');
            const parsed = raw ? JSON.parse(raw) : null;
            if (!parsed || parsed.role !== 'admin') {
                navigate('/', { replace: true });
                return;
            }
            setAuth(parsed);
        } catch {
            navigate('/', { replace: true });
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('authUser');
        navigate('/', { replace: true });
    };

    if (!auth) return null;

    return (
        <div className="admin">
            <div className="adminLayout">
                {/* Sidebar */}
                <aside className="sidebar">
                    <div className="brand">
                        <img className="brandLogo" src={logo} alt="Perfulandia" />
                        <span className="brandText">Perfulandia</span>
                    </div>

                    <ul className="menu">
                        <li className="menuItem">
                            <button type="button" className="menuButton menuButtonActive">
                                <IconDashboard /> Dashboard
                            </button>
                        </li>
                        <li className="menuItem">
                            <button type="button" className="menuButton">
                                <IconReceipt /> Pedidos
                            </button>
                        </li>
                        <li className="menuItem">
                            <button type="button" className="menuButton">
                                <IconBox /> Productos
                            </button>
                        </li>
                        <li className="menuItem">
                            <button type="button" className="menuButton">
                                <IconUsers /> Clientes
                            </button>
                        </li>
                        <li className="menuItem">
                            <button type="button" className="menuButton">
                                <IconChart /> Reportes
                            </button>
                        </li>
                    </ul>

                    <div className="separator" />

                    <div className={`dropdown userSection ${menuOpen ? 'open' : ''}`}>
                        <button
                            type="button"
                            className="dropdownButton"
                            onClick={() => setMenuOpen(v => !v)}
                            aria-expanded={menuOpen}
                            aria-haspopup="true"
                        >
                            <strong>{auth?.name || 'Admin'}</strong>
                            <span aria-hidden="true">▾</span>
                        </button>
                        <div className="dropdownMenu" role="menu">
                            <button className="dropdownItem" type="button">Configuración</button>
                            <button className="dropdownItem" type="button">Perfil</button>
                            <div className="dropdownDivider" />
                            <button className="dropdownItem" type="button" onClick={handleLogout}>
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Contenido principal */}
                <main className="content">
                    <div className="header">
                        <h1 className="headerTitle">Hola, {auth?.name || 'Administrador'}</h1>
                        <span className="headerMuted">{auth?.email}</span>
                    </div>

                    <section className="stats">
                        <article className="statCard">
                            <div className="statIcon statIconSuccess" aria-hidden="true">
                                <IconCash />
                            </div>
                            <div>
                                <p className="cardTitle">Ventas del Mes</p>
                                <p className="cardValue">$8.450.000</p>
                            </div>
                        </article>

                        <article className="statCard">
                            <div className="statIcon statIconPrimary" aria-hidden="true">
                                <IconReceipt />
                            </div>
                            <div>
                                <p className="cardTitle">Nuevos Pedidos</p>
                                <p className="cardValue">124</p>
                            </div>
                        </article>

                        <article className="statCard">
                            <div className="statIcon statIconInfo" aria-hidden="true">
                                <IconPeople />
                            </div>
                            <div>
                                <p className="cardTitle">Total de Clientes</p>
                                <p className="cardValue">1.283</p>
                            </div>
                        </article>
                    </section>

                    <section className="tableCard">
                        <header className="tableHeader">
                            <h2 className="tableTitle">Últimos Pedidos</h2>
                        </header>
                        <div className="tableWrapper">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">ID Pedido</th>
                                    <th scope="col">Cliente</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Estado</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th scope="row">#PF-0815</th>
                                    <td>Marcelo Ríos</td>
                                    <td>2025-09-15</td>
                                    <td>$130.000</td>
                                    <td><span className="badge badgeSuccess">Completado</span></td>
                                </tr>
                                <tr>
                                    <th scope="row">#PF-0814</th>
                                    <td>Ana González</td>
                                    <td>2025-09-14</td>
                                    <td>$80.000</td>
                                    <td><span className="badge badgeWarning">Pendiente</span></td>
                                </tr>
                                <tr>
                                    <th scope="row">#PF-0812</th>
                                    <td>Carlos Pérez</td>
                                    <td>2025-09-13</td>
                                    <td>$210.000</td>
                                    <td><span className="badge badgeDanger">Cancelado</span></td>
                                </tr>
                                <tr>
                                    <th scope="row">#PF-0811</th>
                                    <td>Sofía Vergara</td>
                                    <td>2025-09-12</td>
                                    <td>$70.000</td>
                                    <td><span className="badge badgeSuccess">Completado</span></td>
                                </tr>
                                <tr>
                                    <th scope="row">#PF-0810</th>
                                    <td>Benjamín Vicuña</td>
                                    <td>2025-09-11</td>
                                    <td>$40.000</td>
                                    <td><span className="badge badgeInfo">Enviado</span></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <nav className="pagination" aria-label="Page navigation">
                            <button className="pageBtn pageBtnDisabled text-dark" type="button" disabled>Anterior</button>
                            <button className="pageBtn pageBtnActive " type="button">1</button>
                            <button className="pageBtn text-dark" type="button">2</button>
                            <button className="pageBtn text-dark" type="button">3</button>
                            <button className="pageBtn text-dark" type="button">Siguiente</button>
                        </nav>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default Admin;


