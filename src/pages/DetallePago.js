import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

// Puedes crear un DetallePago.module.css similar al de Productos
// Por ahora usaré estilos en línea y clases de Bootstrap
import styles from './Productos.module.css'; // Reutiliza el estilo del contenedor

function DetallePago() {
    // Obtenemos los datos del carrito para mostrarlos
    const { carrito, calcularTotal } = useCart();
    const total = calcularTotal();

    return (
        <div className={styles.pageContainer}>
            <div className={styles.contentBox} style={{color: 'white', maxWidth: '800px'}}>
                <h1 className={styles.title}>Detalle de Pago</h1>

                {carrito.length > 0 ? (
                    <>
                        <h3 className="mb-3">Resumen de tu compra</h3>
                        <ul className="list-group list-group-flush mb-4">
                            {carrito.map(item => (
                                <li
                                    key={item.id}
                                    className="list-group-item d-flex justify-content-between align-items-center bg-transparent text-white"
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
                        </ul>

                        <hr className={styles.divider} />

                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4 className="mb-0">Total a Pagar:</h4>
                            <h4 className="mb-0 text-success fw-bold">
                                ${total.toLocaleString('es-CL')} CLP
                            </h4>
                        </div>

                        <p>Aquí iría tu formulario de pago (WebPay, etc.)</p>

                        <button className="btn btn-lg btn-success w-100">
                            Pagar Ahora
                        </button>
                    </>
                ) : (
                    <div className="text-center">
                        <p>Tu carrito está vacío.</p>
                        <Link to="/productos" className="btn btn-primary">
                            Volver a la tienda
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DetallePago;