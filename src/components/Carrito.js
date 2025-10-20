import React from 'react';
import { useCart } from '../context/CartContext'; // 1. Importa el hook
import { useNavigate } from 'react-router-dom'; // 2. Importa useNavigate para redirigir
import styles from './Carrito.module.css'; // Sigue usando tus CSS modules

function Carrito() {
    // 3. Obtén TODO del contexto
    const { carrito, eliminarDelCarrito, vaciarCarrito, calcularTotal } = useCart();
    const total = calcularTotal();

    // 4. Hook para navegar
    const navigate = useNavigate();

    const handlePagar = () => {
        // Esta función navegará a la página de pago
        navigate('/detalle-pago');
        // El offcanvas se cerrará solo gracias a 'data-bs-dismiss' en el botón
    };

    return (
        // 5. Esta es la estructura del Offcanvas de Bootstrap
        <div
            className="offcanvas offcanvas-end" // <-- Clases de Bootstrap
            tabIndex="-1"
            id="cartOffcanvas" // <-- Este ID debe coincidir con 'data-bs-target' de la NavBar
            aria-labelledby="cartOffcanvasLabel"
            style={{ backgroundColor: '#f8f9fa' }} // Fondo claro, puedes cambiarlo
        >
            {/* Cabecera del Offcanvas */}
            <div className="offcanvas-header border-bottom">
                <h5 className="offcanvas-title" id="cartOffcanvasLabel">
                    Carrito de Compras
                </h5>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas" // <-- Atributo para cerrar
                    aria-label="Close"
                ></button>
            </div>

            {/* Cuerpo del Offcanvas (aquí va tu lógica de .cartContainer) */}
            <div className="offcanvas-body">
                {/* Reutilizamos tus estilos y lógica de antes, pero con datos del context */}
                <div className={styles.cartContainer} style={{padding: 0, boxShadow: 'none'}}>
                    {carrito.length === 0 ? (
                        <p className={styles.cartEmpty}>Tu carrito está vacío</p>
                    ) : (
                        <ul className={styles.cartList}>
                            {carrito.map(item => (
                                <li key={item.id} className={styles.cartItem}>
                                    <div className={styles.itemDetails}>
                                        <h6 className={styles.itemName}>{item.nombre}</h6>
                                        <small className={styles.itemMeta}>
                                            Cantidad: {item.cantidad} x ${item.precio.toLocaleString('es-CL')}
                                        </small>
                                    </div>
                                    <div className={styles.itemControls}>
                                        <span className={styles.itemPrice}>
                                            ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                                        </span>
                                        <button
                                            className={`btn btn-sm btn-outline-danger ${styles.deleteButton}`}
                                            title="Eliminar item"
                                            onClick={() => eliminarDelCarrito(item.id)}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}

                    <hr className={styles.divider}/>

                    <div className={styles.totalRow}>
                        <p className={styles.totalText}>Total:</p>
                        <p className={styles.totalPrice}>${total.toLocaleString('es-CL')} CLP</p>
                    </div>

                    <div className={styles.buttonRow} style={{flexDirection: 'column', gap: '10px'}}>
                        <button
                            className="btn btn-success btn-lg w-100"
                            onClick={handlePagar} // <-- Llama a la función de navegar
                            disabled={carrito.length === 0}
                            data-bs-dismiss="offcanvas" // <-- Cierra el offcanvas al pagar
                        >
                            Ir a Pagar
                        </button>
                        <button
                            className="btn btn-danger w-100"
                            onClick={vaciarCarrito}
                            disabled={carrito.length === 0}
                        >
                            Vaciar Carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Carrito;