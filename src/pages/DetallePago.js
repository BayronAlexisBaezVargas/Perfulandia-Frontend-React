// src/pages/DetallePago.js

import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../utils/auth';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// Importar servicio de órdenes
import { saveNewOrder, generateOrderId } from '../utils/orderService';
// --- CAMBIO: Importar estilos de módulo CSS específico ---
import styles from './DetallePago.module.css';

function DetallePago() {
    const { carrito, calcularTotal, vaciarCarrito } = useCart();
    const { user, getUserProfileData } = useAuth();
    const navigate = useNavigate();
    const total = calcularTotal();
    const profile = getUserProfileData();

    const [cardData, setCardData] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: profile?.name || '',
    });

    useEffect(() => {
        if (!user) {
            alert("Debes iniciar sesión o registrarte para proceder al pago.");
            navigate('/InicioS', { replace: true });
        }
        if (carrito.length === 0) {
            navigate('/Productos', { replace: true });
        }
    }, [user, navigate, carrito]);

    const handleChange = (e) => {
        setCardData({
            ...cardData,
            [e.target.name]: e.target.value
        });
    };

    const finalizeOrder = (isSuccess) => {
        if (!user || carrito.length === 0) return;

        if (isSuccess) {
            const newOrderId = generateOrderId();
            const orderDate = new Date().toISOString().split('T')[0];

            const newOrder = {
                id: newOrderId,
                date: orderDate,
                customer: profile?.name || user?.name,
                email: user.email,
                total: total,
                status: 'Pendiente',
                items: carrito.map(item => ({
                    nombre: item.nombre,
                    cantidad: item.cantidad,
                    precio: item.precio
                })),
                shippingAddress: profile?.address || 'Dirección no especificada'
            };

            saveNewOrder(newOrder);
            vaciarCarrito();

            Swal.fire({
                icon: 'success',
                title: '¡Pago Confirmado!',
                text: `Tu pedido ${newOrderId} ha sido registrado.`,
                showConfirmButton: false,
                timer: 2000
            }).then(() => {
                navigate('/confirmacion-compra', { state: { success: true, orderId: newOrderId, total: total } });
            });

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error de Pago',
                text: 'La transacción no pudo ser completada. Por favor, intenta con otra tarjeta.',
                showConfirmButton: true
            }).then(() => {
                navigate('/confirmacion-compra', { state: { success: false } });
            });
        }
    };

    const handleSimulatedPayment = (e) => {
        e.preventDefault();

        if (!cardData.number || !cardData.expiry || !cardData.cvc || !cardData.name) {
            Swal.fire({
                icon: 'warning',
                title: 'Faltan datos',
                text: "Por favor, rellena todos los campos de la tarjeta para simular el pago.",
                showConfirmButton: true
            });
            return;
        }

        finalizeOrder(true);
    };

    const handleSimulateError = (e) => {
        e.preventDefault();
        finalizeOrder(false);
    };

    if (!user || carrito.length === 0) return null;

    return (
        // Aplicamos la clase de contenedor de la página
        <div className={styles.pageContainer}>
            {/* Aplicamos la clase de la caja de contenido */}
            <div className={styles.contentBox}>
                <h1 className={styles.title}>Detalle de Pago</h1>

                {/* --- RESUMEN DE COMPRA --- */}
                <h3 className="text-white">Resumen de tu Compra</h3>
                <ul className="list-group list-group-flush mb-4 border-0">
                    {carrito.map(item => (
                        <li
                            key={item.id}
                            // Usamos cartItem
                            className={`list-group-item d-flex justify-content-between align-items-center bg-transparent text-white ${styles.cartItem}`}
                        >
                            <div>
                                {item.nombre}
                                <span className="text-white-50 ms-2">x {item.cantidad}</span>
                            </div>
                            <span className="fw-bold">
                                ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                            </span>
                        </li>
                    ))}
                    {/* Fila del Total */}
                    <li className={`list-group-item d-flex justify-content-between align-items-center bg-transparent text-white ${styles.cartTotal}`}>
                        <h4 className="mb-0 text-white">Total:</h4>
                        <h4 className="mb-0 text-success fw-bold">${total.toLocaleString('es-CL')} CLP</h4>
                    </li>
                </ul>

                <hr className="mt-4 mb-4" style={{ backgroundColor: '#495057', height: '1px', border: 'none' }} />

                {/* --- FORMULARIO DE PAGO SIMULADO --- */}
                <h3 className={styles.sectionTitle}>Tarjeta de Pago</h3>

                <form onSubmit={handleSimulatedPayment}>
                    <div className="mb-3">
                        <label htmlFor="number" className="form-label visually-hidden">Número de Tarjeta</label>
                        <input
                            type="text"
                            // Usamos formInput
                            className={`form-control form-control-lg ${styles.formInput}`}
                            id="number"
                            name="number"
                            placeholder="Número de Tarjeta"
                            value={cardData.number}
                            onChange={handleChange}
                            maxLength="16"
                            required
                        />
                    </div>

                    <div className="row mb-4">
                        <div className="col-6">
                            <label htmlFor="expiry" className="form-label visually-hidden">MM / AA</label>
                            <input
                                type="text"
                                className={`form-control form-control-lg ${styles.formInput}`}
                                id="expiry"
                                name="expiry"
                                placeholder="MM / AA"
                                value={cardData.expiry}
                                onChange={handleChange}
                                maxLength="5"
                                required
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="cvc" className="form-label visually-hidden">CVC</label>
                            <input
                                type="text"
                                className={`form-control form-control-lg ${styles.formInput}`}
                                id="cvc"
                                name="cvc"
                                placeholder="CVC"
                                value={cardData.cvc}
                                onChange={handleChange}
                                maxLength="4"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="name" className="form-label visually-hidden">Nombre del titular</label>
                        <input
                            type="text"
                            className={`form-control form-control-lg ${styles.formInput}`}
                            id="name"
                            name="name"
                            placeholder="Nombre del titular de la tarjeta"
                            value={cardData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="d-grid gap-3 mt-4">
                        {/* Botón de Pago Exitoso */}
                        <button type="submit" className={`btn btn-lg fw-bold ${styles.payButton}`}>
                            PAGAR
                        </button>

                        {/* Botón de Simulación de Error */}
                        <button type="button" onClick={handleSimulateError} className={`btn btn-lg fw-bold ${styles.errorButton}`}>
                            SIMULAR ERROR DE PAGO
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default DetallePago;