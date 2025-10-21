import React, { useEffect } from 'react'; // Importar useEffect
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom'; // Importar useNavigate
// --- CAMBIO: Importar useAuth ---
import { useAuth } from '../utils/auth';

import styles from './Productos.module.css'; // Reutiliza el estilo del contenedor

function DetallePago() {
    const { carrito, calcularTotal } = useCart();
    // --- CAMBIO: Obtener estado de usuario y navegación ---
    const { user } = useAuth();
    const navigate = useNavigate();
    const total = calcularTotal();

    // Efecto para verificar la autenticación
    useEffect(() => {
        if (!user) {
            // Si no hay usuario, redirigir a la página de inicio de sesión
            alert("Debes iniciar sesión o registrarte para proceder al pago.");
            // Reemplazar la entrada en el historial para que no puedan volver con "atrás"
            navigate('/InicioS', { replace: true });
        }
    }, [user, navigate]);

    // Mostrar un estado de carga o redirigiendo
    if (!user) {
        return (
            <div className={styles.pageContainer}>
                <div className={styles.contentBox} style={{color: 'white', maxWidth: '800px'}}>
                    <h1 className={styles.title}>Redirigiendo a Inicio de Sesión...</h1>
                    <p className="text-center">Por favor, inicia sesión para continuar con tu compra.</p>
                </div>
            </div>
        );
    }

    // Lógica principal de DetallePago para usuarios autenticados
    return (
        <div className={styles.pageContainer}>
            <div className={styles.contentBox} style={{color: 'white', maxWidth: '800px'}}>
                <h1 className={styles.title}>Detalle de Pago</h1>

                {/* Mensaje de bienvenida/confirmación */}
                <p className="text-center lead mb-4">
                    ¡Gracias por tu compra, <span className='text-primary fw-bold'>{user.name}</span>! Finaliza tu pedido.
                </p>

                {carrito.length > 0 ? (
                    <>
                        {/* ... (el resto del resumen del carrito y el botón de pagar) ... */}
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