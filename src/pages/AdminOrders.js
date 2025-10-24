// src/pages/AdminOrders.js

import React, { useState, useEffect } from 'react';
import { getOrders } from '../utils/orderService';
// --- CAMBIO: Importar el nuevo módulo CSS ---
import styles from './AdminOrders.module.css';

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

function AdminOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        setOrders(getOrders());
    }, []);

    return (
        // Aplicamos la nueva clase de contenedor
        <div className={styles.orderTableCard}>
            <header className={styles.tableHeader}>
                <h2 className={styles.tableTitle}>Gestión de Pedidos</h2>
            </header>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th scope="col">ID Pedido</th>
                        <th scope="col">Cliente</th>
                        <th scope="col">Correo</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Total</th>
                        <th scope="col">Estado</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <th scope="row">{order.id}</th>
                            <td>{order.customer}</td>
                            <td>{order.email}</td>
                            <td>{order.date}</td>
                            <td>${order.total.toLocaleString('es-CL')}</td>
                            <td>
                                {/* Aplicamos las clases de badge del nuevo módulo */}
                                <span className={`${styles.badge} ${styles[getBadgeClass(order.status)]}`}>
                                        {order.status}
                                    </span>
                            </td>
                        </tr>
                    ))}
                    {orders.length === 0 && (
                        <tr>
                            <td colSpan="6" className="text-center p-4">No hay pedidos registrados.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            {/* Opcional: Paginación */}
            {orders.length > 10 && (
                <nav className={styles.pagination} aria-label="Page navigation">
                    <button className={styles.pageBtn} type="button">1</button>
                </nav>
            )}
        </div>
    );
}

export default AdminOrders;