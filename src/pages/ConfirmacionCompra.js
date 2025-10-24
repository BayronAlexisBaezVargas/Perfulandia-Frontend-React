// src/pages/ConfirmacionCompra.js

import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Productos.module.css'; // Reutilizar estilos de contenedor
import logo from '../assets/image.png'; // Importar el logo
import { HouseFill, ArrowClockwise } from 'react-bootstrap-icons'; // Iconos

function ConfirmacionCompra() {
    const location = useLocation();
    // Obtener estado de éxito, ID y total
    const { success, orderId, total } = location.state || { success: false, orderId: '#ERROR', total: 0 };

    // Si no hay estado, redirigir a inicio.
    useEffect(() => {
        if (location.state === undefined) {
            console.warn("Acceso directo a confirmación sin estado de compra. Redirigiendo.");
            // navigate('/', { replace: true });
        }
    }, [location]);

    return (
        <div className={styles.pageContainer}>
            <div className={styles.contentBox} style={{color: 'white', maxWidth: '800px', textAlign: 'center', padding: '50px'}}>

                {/* Logo Centralizado */}
                <div className="mb-4">
                    <img src={logo} alt="Perfulandia Logo" style={{ height: 60, width: 60 }} className="mb-3"/>
                </div>

                {success ? (
                    <>
                        <h1 className="display-4 fw-bold text-success mb-3">¡Compra Exitosa!</h1>
                        <p className="lead text-white-50 mb-5">
                            Tu pedido ha sido procesado y será preparado pronto.
                        </p>

                        <div className="alert p-4 mx-auto" style={{maxWidth: '400px', backgroundColor: '#d4edda', color: '#155724', borderRadius: '10px'}}>
                            <h5 className="fw-bold mb-1">ID de Pedido: {orderId}</h5>
                            <p className="mb-0">Monto: ${total.toLocaleString('es-CL')} CLP</p>
                        </div>

                        <p className="mt-5">
                            Revisa el resumen de tu pedido en tu <Link to="/perfil" className="text-info fw-bold">perfil de cliente</Link>.
                        </p>

                        <Link to="/" className="btn btn-primary btn-lg mt-3">
                            <HouseFill className="me-2"/> Volver a Inicio
                        </Link>
                    </>
                ) : (
                    <>
                        <h1 className="display-4 fw-bold text-danger mb-3">Transacción Fallida</h1>
                        <p className="lead text-white-50 mb-5">
                            Hubo un error al procesar tu pago. No se ha realizado ningún cargo a tu tarjeta.
                        </p>

                        <div className="alert p-4 mx-auto" style={{maxWidth: '450px', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '10px'}}>
                            <h5 className="fw-bold mb-1">Causa: Fondos insuficientes o datos incorrectos (Simulación).</h5>
                            <p className="mb-0">Por favor, revisa tus datos e inténtalo de nuevo.</p>
                        </div>

                        <Link to="/detalle-pago" className="btn btn-warning btn-lg mt-3 fw-bold">
                            <ArrowClockwise className="me-2"/> Reintentar Pago
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default ConfirmacionCompra;