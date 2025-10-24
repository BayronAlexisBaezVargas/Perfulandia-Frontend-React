// src/components/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';

function ProductCard({ producto, onAgregarAlCarrito }) {

    const handleAddToCartClick = (e) => {
        // Detiene la propagación del evento para evitar que el Link padre (toda la tarjeta) se active
        e.stopPropagation();
        // Previene la acción por defecto del enlace (aunque Link en React ya lo maneja)
        e.preventDefault();

        onAgregarAlCarrito(producto);
    }

    return (
        // Envolvemos toda la tarjeta en el Link y aplicamos estilos para simular la tarjeta
        <Link
            to={`/productos/${producto.id}`}
            title={`Ver detalles de ${producto.nombre}`}
            className={styles.cardLink}
        >
            <div className={styles.card}>
                <img
                    // --- CORRECCIÓN: Usar imageLink ---
                    src={producto.imageLink}
                    alt={producto.nombre}
                    className={styles.cardImage}
                />
                <div className={styles.cardBody}>
                    <h5 className={styles.cardTitle}>
                        {producto.nombre}
                    </h5>

                    <p className={styles.cardDescription}>
                        {producto.descripcion}
                    </p>

                    <p className={styles.cardPrice}>
                        ${producto.precio.toLocaleString('es-CL')}
                    </p>

                    <button
                        className={`btn btn-primary w-100 ${styles.cardButton}`}
                        onClick={handleAddToCartClick}
                        disabled={producto.stock <= 0}
                    >
                        {producto.stock > 0 ? 'Agregar al Carrito' : 'Agotado'}
                    </button>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;