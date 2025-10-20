import React from 'react';
// Importa los estilos de la tarjeta
import styles from './ProductCard.module.css';

function ProductCard({ producto, onAgregarAlCarrito }) {

    return (
        <div className={styles.card}>
            <img
                src={producto.imagen}
                alt={producto.nombre}
                className={styles.cardImage}
            />
            <div className={styles.cardBody}>
                <h5 className={styles.cardTitle}>{producto.nombre}</h5>

                <p className={styles.cardDescription}>
                    {producto.descripcion}
                </p>

                <p className={styles.cardPrice}>
                    ${producto.precio.toLocaleString('es-CL')}
                </p>

                <button
                    // Combinamos clases de Bootstrap y CSS Modules
                    className={`btn btn-primary w-100 ${styles.cardButton}`}
                    onClick={() => onAgregarAlCarrito(producto)}
                >
                    Agregar al Carrito
                </button>
            </div>
        </div>
    );
}

export default ProductCard;