import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/image.png';
import './admin.modules.css';

// --- Componentes y Servicios de Vistas ---
import AdminProducts from './AdminProducts';
import AdminOrders from './AdminOrders';
import { getOrders } from '../utils/orderService'; // Importar el servicio de órdenes

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

const VIEWS = {
    DASHBOARD: 'dashboard',
    ORDERS: 'orders',
    PRODUCTS: 'products',
    CUSTOMERS: 'customers',
    REPORTS: 'reports',
};

// Helper para mapear el estado a la clase de Bootstrap
const getBadgeClass = (status) => {
    switch (status) {
        case 'Completado':
            return 'badgeSuccess';
        case 'Pendiente':
            return 'badgeWarning';
        case 'Cancelado':
            return 'badgeDanger';
        case 'Enviado':
            return 'badgeInfo';
        default:
            return 'badgeInfo';
    }
}

// Componente para renderizar el contenido según la vista seleccionada
function ContentView({ view }) {
    // Lógica dinámica para el Dashboard
    const [latestOrders, setLatestOrders] = useState([]);
    const [stats, setStats] = useState({ totalSales: 0, newOrders: 0, totalCustomers: 1283 });

    useEffect(() => {
        if (view === VIEWS.DASHBOARD) {
            const allOrders = getOrders();
            // Mostrar solo los 5 pedidos más recientes
            setLatestOrders(allOrders.slice(0, 5));

            // Simular estadísticas basadas en los pedidos (simple)
            const totalSales = allOrders.reduce((sum, order) => sum + (order.status !== 'Cancelado' ? order.total : 0), 0);
            // El número de clientes es estático en este caso, solo actualizamos ventas y pendientes
            const newOrders = allOrders.filter(order => order.status === 'Pendiente').length;

            setStats(prev => ({
                ...prev,
                totalSales: totalSales,
                newOrders: newOrders
            }));
        }
    }, [view]);

    switch (view) {
        case VIEWS.DASHBOARD:
            return (
                <>
                    {/* Sección de Estadísticas - Dinámica */}
                    <section className="stats">
                        <article className="statCard">
                            <div className="statIcon statIconSuccess" aria-hidden="true">
                                <IconCash />
                            </div>
                            <div>
                                <p className="cardTitle">Ventas del Mes (Total)</p>
                                <p className="cardValue">${stats.totalSales.toLocaleString('es-CL')}</p>
                            </div>
                        </article>

                        <article className="statCard">
                            <div className="statIcon statIconPrimary" aria-hidden="true">
                                <IconReceipt />
                            </div>
                            <div>
                                <p className="cardTitle">Pedidos Pendientes</p>
                                <p className="cardValue">{stats.newOrders}</p>
                            </div>
                        </article>

                        <article className="statCard">
                            <div className="statIcon statIconInfo" aria-hidden="true">
                                <IconPeople />
                            </div>
                            <div>
                                <p className="cardTitle">Total de Clientes</p>
                                <p className="cardValue">{stats.totalCustomers.toLocaleString('es-CL')}</p>
                            </div>
                        </article>
                    </section>

                    {/* Sección de Últimos Pedidos - Dinámica */}
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
                                {latestOrders.map((order) => (
                                    <tr key={order.id}>
                                        <th scope="row">{order.id}</th>
                                        <td>{order.customer}</td>
                                        <td>{order.date}</td>
                                        <td>${order.total.toLocaleString('es-CL')}</td>
                                        <td>
                                            <span className={`badge ${getBadgeClass(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {latestOrders.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="text-center p-4 text-dark">No hay pedidos registrados.</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>

                        {/* Paginación simplificada */}
                        <nav className="pagination" aria-label="Page navigation">
                            <button className="pageBtn pageBtnActive text-dark" type="button" disabled={latestOrders.length === 0}>1</button>
                        </nav>
                    </section>
                </>
            );
        case VIEWS.ORDERS:
            return <AdminOrders />;
        case VIEWS.PRODUCTS:
            return <AdminProducts />;
        case VIEWS.CUSTOMERS:
        case VIEWS.REPORTS:
        default:
            return (
                <div className="tableCard p-4 bg-white text-dark">
                    <p>Contenido para {view.charAt(0).toUpperCase() + view.slice(1)}.</p>
                </div>
            );
    }
}


function Admin() {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    // Estado para manejar la vista actual
    const [currentView, setCurrentView] = useState(VIEWS.DASHBOARD);


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

    // Determinar si mostrar el header (solo en Dashboard)
    const showHeader = currentView === VIEWS.DASHBOARD;

    return (
        <div className="admin">
            <div className="adminLayout">
                {/* Sidebar */}
                <aside className="sidebar">
                    <div className="brand">
                        <img className="brandLogo" src={logo} alt="Perfulandia" />
                        <span className="brandText">Perfulandia (Admin)</span>
                    </div>

                    <ul className="menu">
                        <li className="menuItem">
                            <button
                                type="button"
                                className={`menuButton ${currentView === VIEWS.DASHBOARD ? 'menuButtonActive' : ''}`}
                                onClick={() => setCurrentView(VIEWS.DASHBOARD)}
                            >
                                <IconDashboard /> Dashboard
                            </button>
                        </li>
                        <li className="menuItem">
                            <button
                                type="button"
                                className={`menuButton ${currentView === VIEWS.ORDERS ? 'menuButtonActive' : ''}`}
                                onClick={() => setCurrentView(VIEWS.ORDERS)}
                            >
                                <IconReceipt /> Pedidos
                            </button>
                        </li>
                        <li className="menuItem">
                            <button
                                type="button"
                                className={`menuButton ${currentView === VIEWS.PRODUCTS ? 'menuButtonActive' : ''}`}
                                onClick={() => setCurrentView(VIEWS.PRODUCTS)}
                            >
                                <IconBox /> Productos
                            </button>
                        </li>
                        <li className="menuItem">
                            <button
                                type="button"
                                className={`menuButton ${currentView === VIEWS.CUSTOMERS ? 'menuButtonActive' : ''}`}
                                onClick={() => setCurrentView(VIEWS.CUSTOMERS)}
                            >
                                <IconUsers /> Clientes
                            </button>
                        </li>
                        <li className="menuItem">
                            <button
                                type="button"
                                className={`menuButton ${currentView === VIEWS.REPORTS ? 'menuButtonActive' : ''}`}
                                onClick={() => setCurrentView(VIEWS.REPORTS)}
                            >
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
                    {showHeader && (
                        <div className="header">
                            <h1 className="headerTitle">Hola, {auth?.name || 'Administrador'}</h1>
                            <span className="headerMuted">{auth?.email}</span>
                        </div>
                    )}

                    {/* Renderiza el contenido dinámicamente */}
                    <ContentView view={currentView} />

                </main>
            </div>
        </div>
    );
}

export default Admin;


