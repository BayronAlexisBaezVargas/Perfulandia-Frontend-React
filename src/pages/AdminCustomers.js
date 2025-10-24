// src/pages/AdminCustomers.js

import React, { useState, useEffect } from 'react';
import { getUsers, saveUsers, updateUserProfile } from '../utils/auth';
import { getOrders } from '../utils/orderService';
import { PlusCircleFill, PencilSquare, JournalText } from 'react-bootstrap-icons';
import styles from './AdminCustomers.module.css';
import Swal from 'sweetalert2';

const CRITICAL_ADMIN_EMAILS = new Set([
    'sergionbaezbarria44@gmail.com',
    'marcelo.c@duoc.cl',
]);

// --- Componente: Formulario de Edición/Creación (Offcanvas) ---
const CustomerForm = ({ isEditing, customerToEdit, onClose, onSave }) => {
    // ... (Lógica de estado y handlers sin cambios) ...
    const initialFormState = {
        name: '',
        email: '',
        password: '',
        rut: '',
        address: '',
        phone: '',
    };

    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        if (isEditing && customerToEdit) {
            setFormData({
                ...customerToEdit,
                password: '',
            });
        } else {
            setFormData(initialFormState);
        }
    }, [isEditing, customerToEdit]);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email) {
            Swal.fire('Error', 'Nombre y correo son obligatorios.', 'error');
            return;
        }

        const currentUsers = getUsers();

        if (!isEditing) {
            const exists = currentUsers.some(u => u.email.toLowerCase() === formData.email.toLowerCase());
            if (exists) {
                Swal.fire('Error', 'Ya existe un usuario con este correo.', 'error');
                return;
            }
            if (!formData.password || formData.password.length < 6) {
                Swal.fire('Error', 'La contraseña debe tener al menos 6 caracteres para un nuevo usuario.', 'error');
                return;
            }
        }

        onSave(formData);
    };

    return (
        <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="customerOffcanvas"
            aria-labelledby="customerOffcanvasLabel"
        >
            {/* Header del Offcanvas */}
            <div className={`offcanvas-header ${styles.offcanvasHeader}`}>
                <h5 className="offcanvas-title text-white" id="customerOffcanvasLabel">
                    {isEditing ? `Editar Cliente: ${customerToEdit?.name}` : 'Registrar Nuevo Cliente'}
                </h5>
                <button
                    type="button"
                    className="btn-close btn-close-white"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                    onClick={onClose}
                ></button>
            </div>

            {/* Cuerpo del Formulario */}
            <div className={`offcanvas-body ${styles.offcanvasBody}`}>
                <form onSubmit={handleSubmit}>

                    {/* Nombre */}
                    <div className={styles.formGroup}>
                        <label htmlFor="name" className={styles.formLabel}>Nombre Completo</label>
                        <input
                            type="text"
                            className={`form-control ${styles.formInput}`}
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder={!isEditing ? 'Ingresa el nombre completo' : ''}
                        />
                    </div>

                    {/* Email (No Editable) */}
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.formLabel}>Correo Electrónico</label>
                        <input
                            type="email"
                            className={`form-control ${styles.formInput} ${isEditing ? styles.inputReadOnly : ''}`}
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={isEditing}
                            placeholder={!isEditing ? 'Ingresa un email' : ''}
                        />
                    </div>

                    {/* Contraseña */}
                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.formLabel}>{isEditing ? 'Nueva Contraseña (Dejar vacío para no cambiar)' : 'Contraseña'}</label>
                        <input
                            type="password"
                            className={`form-control ${styles.formInput}`}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required={!isEditing}
                            minLength={6}
                        />
                    </div>

                    {/* Rut */}
                    <div className={styles.formGroup}>
                        <label htmlFor="rut" className={styles.formLabel}>RUT (Opcional)</label>
                        <input type="text" className={`form-control ${styles.formInput}`} id="rut" name="rut" value={formData.rut} onChange={handleChange} placeholder="Ej: 12.345.678-9" />
                    </div>

                    {/* Dirección */}
                    <div className={styles.formGroup}>
                        <label htmlFor="address" className={styles.formLabel}>Dirección (Opcional)</label>
                        <input type="text" className={`form-control ${styles.formInput}`} id="address" name="address" value={formData.address} onChange={handleChange} placeholder="Calle, número, comuna" />
                    </div>

                    {/* Teléfono */}
                    <div className={styles.formGroup}>
                        <label htmlFor="phone" className={styles.formLabel}>Teléfono (Opcional)</label>
                        <input type="text" className={`form-control ${styles.formInput}`} id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Ej: +569 1234 5678" />
                    </div>

                    <button type="submit" className={`btn w-100 mt-4 ${styles.saveButton}`} data-bs-dismiss="offcanvas">
                        {isEditing ? 'Guardar Cambios' : 'Registrar Cliente'}
                    </button>
                    {isEditing && CRITICAL_ADMIN_EMAILS.has(formData.email.toLowerCase()) && (
                        <p className="text-warning small mt-2 text-center">No se recomienda editar/eliminar cuentas de administrador.</p>
                    )}
                </form>
            </div>
        </div>
    );
};

// --- Componente: Historial de Compras (Modal) ---
// ... (Este componente se mantiene igual ya que no tenía problemas de diseño críticos aquí)
const HistoryModal = ({ orders, customerName, onClose }) => {
    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header bg-dark text-white">
                        <h5 className="modal-title">Historial de Compras: {customerName}</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body bg-light text-dark">
                        {orders.length === 0 ? (
                            <p className="text-center">Este cliente no ha realizado ninguna compra aún.</p>
                        ) : (
                            <ul className="list-group">
                                {orders.map((order, index) => (
                                    <li key={index} className="list-group-item">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <strong>{order.id}</strong> - {order.date}
                                                <br />
                                                <small className="text-muted">Total: ${order.total.toLocaleString('es-CL')} CLP</small>
                                            </div>
                                            <span className={`badge bg-primary text-white`}>
                                                {order.items.length} {order.items.length === 1 ? 'Producto' : 'Productos'}
                                            </span>
                                        </div>
                                        <ul className="list-unstyled mt-2 small">
                                            {order.items.map((item, itemIndex) => (
                                                <li key={itemIndex}>- {item.nombre} (x{item.cantidad})</li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- Componente Principal: AdminCustomers ---
function AdminCustomers() {
    const [customers, setCustomers] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [customerToEdit, setCustomerToEdit] = useState(null);
    const [showHistory, setShowHistory] = useState(false);
    const [customerOrders, setCustomerOrders] = useState([]);

    useEffect(() => {
        setCustomers(getUsers());
    }, []);

    const handleSave = (formData) => {
        const currentUsers = getUsers();

        if (isEditing) {
            updateUserProfile(formData.email, formData);
        } else {
            const newRole = CRITICAL_ADMIN_EMAILS.has(formData.email.toLowerCase()) ? 'admin' : 'user';
            const newUser = { ...formData, role: newRole };

            const existingUserIndex = currentUsers.findIndex(u => u.email.toLowerCase() === newUser.email.toLowerCase());

            if (existingUserIndex === -1) {
                saveUsers([...currentUsers, newUser]);
            } else {
                Swal.fire('Error', 'El usuario ya existe. Usa la función de edición.', 'error');
                return;
            }
        }

        setCustomers(getUsers());
        Swal.fire('Éxito', 'Usuario guardado correctamente.', 'success');
        setIsEditing(false);
    };

    const handleAddClick = () => {
        setIsEditing(false);
        setCustomerToEdit(null);
    };

    const handleEditClick = (customer) => {
        setIsEditing(true);
        setCustomerToEdit(customer);
    };

    const handleViewHistory = (customerEmail, customerName) => {
        const allOrders = getOrders();
        const userOrders = allOrders.filter(order => order.email.toLowerCase() === customerEmail.toLowerCase());
        setCustomerOrders(userOrders);
        setShowHistory({ name: customerName, email: customerEmail });
    };

    const handleCloseHistory = () => {
        setShowHistory(false);
        setCustomerOrders([]);
    };

    return (
        <div className={styles.customerAdminRoot}>
            <header className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-white">Gestión de Clientes</h2>
                <button
                    className="btn btn-success btn-lg"
                    type="button"
                    onClick={handleAddClick}
                    data-bs-toggle="offcanvas"
                    data-bs-target="#customerOffcanvas"
                >
                    <PlusCircleFill className="me-2" /> Añadir Cliente
                </button>
            </header>

            {/* Tabla de Clientes */}
            <div className={styles.tableCard}>
                <header className={styles.tableHeader}>
                    <h2 className={styles.tableTitle}>Lista Completa de Usuarios ({customers.length})</h2>
                </header>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Teléfono</th>
                            <th>Dirección</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {customers.length > 0 ? (
                            customers.map(customer => (
                                <tr key={customer.email}>
                                    <td>{customer.name}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.phone || 'N/A'}</td>
                                    <td>{customer.address || 'N/A'}</td>
                                    <td>{customer.role.toUpperCase()}</td>
                                    <td>
                                        {/* Botón de Historial de Compras */}
                                        <button
                                            className={`${styles.actionButton} ${styles.historyButton} me-2`}
                                            onClick={() => handleViewHistory(customer.email, customer.name)}
                                            title="Ver Historial de Compras"
                                        >
                                            <JournalText /> Historial
                                        </button>

                                        {/* Botón de Editar */}
                                        <button
                                            className={styles.actionButton}
                                            onClick={() => handleEditClick(customer)}
                                            data-bs-toggle="offcanvas"
                                            data-bs-target="#customerOffcanvas"
                                            title="Editar Usuario"
                                            disabled={CRITICAL_ADMIN_EMAILS.has(customer.email.toLowerCase())}
                                        >
                                            <PencilSquare /> Editar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center p-4">
                                    No hay clientes registrados en el sistema.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Formulario Offcanvas de Edición/Creación */}
            <CustomerForm
                isEditing={isEditing}
                customerToEdit={customerToEdit}
                onSave={handleSave}
                onClose={() => setIsEditing(false)}
            />

            {/* Modal de Historial de Compras */}
            {showHistory && (
                <HistoryModal
                    orders={customerOrders}
                    customerName={showHistory.name}
                    onClose={handleCloseHistory}
                />
            )}
        </div>
    );
}

export default AdminCustomers;