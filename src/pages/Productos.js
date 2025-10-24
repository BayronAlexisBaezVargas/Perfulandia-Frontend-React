// src/pages/Productos.js
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import styles from './Productos.module.css';
import { getProducts } from '../utils/productService';


function Productos() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        // Obtenemos los productos con sus imageLink (rutas)
        setProductos(getProducts());
    }, []);

    const { agregarAlCarrito } = useCart();

    return (
        // Fondo degradado
        <div className={styles.pageContainer}>
            {/* Panel oscuro central */}
            <div className={styles.contentBox}>

                <h1 className={styles.title}>
                    <span className={styles.titleHighlight}>Nuestra Colección</span>
                </h1>
                <p className="lead text-center text-white-50 mb-5">
                    Descubre la fragancia perfecta para cada ocasión.
                </p>

                {/* Contenedor de las tarjetas de producto */}
                <div className={styles.gridContainer}>
                    {/* Usar ProductCard directamente */}
                    {productos.map(prod => (
                        <ProductCard
                            key={prod.id}
                            producto={prod}
                            onAgregarAlCarrito={agregarAlCarrito}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Productos;