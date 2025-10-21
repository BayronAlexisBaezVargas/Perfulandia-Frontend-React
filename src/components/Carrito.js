import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import styles from './Carrito.module.css';

function Carrito() {
    const { carrito, eliminarDelCarrito, vaciarCarrito, calcularTotal } = useCart();
    const total = calcularTotal();


    const navigate = useNavigate();

    const handlePagar = () => {
        navigate('/detalle-pago');
    };

    return (

        <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="cartOffcanvas"
            aria-labelledby="cartOffcanvasLabel"
            style={{ backgroundColor: '#f8f9fa' }}
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
            <div className="offcanvas-body">
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