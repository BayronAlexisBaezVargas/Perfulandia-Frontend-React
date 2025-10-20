import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import styles from './Productos.module.css';


import img1 from '../assets/1.webp';
import img2 from '../assets/2.webp';
import img3 from '../assets/3.webp';
import img4 from '../assets/4.webp';
import img5 from '../assets/5.webp';
import img6 from '../assets/6.webp';
import img7 from '../assets/7.webp';
import img8 from '../assets/8.webp';
import img9 from '../assets/9.webp';


const productosIniciales = [
    {id: 1, nombre: "Mandarin sky", precio: 40000, stock: 12, imagen: img1, descripcion: "Fragancia cítrica y vibrante."},
    {id: 2, nombre: "All Black", precio: 70000, stock: 102, imagen: img2, descripcion: "Aroma intenso para la noche."},
    {id: 3, nombre: "Bad Boy", precio: 130000, stock: 327, imagen: img3, descripcion: "Poderoso y sofisticado."},
    {id: 4, nombre: "Blue (A. Banderas)", precio: 80000, stock: 12, imagen: img4, descripcion: "Un clásico fresco y seductor."},
    {id: 5, nombre: "9 pm", precio: 130000, stock: 50, imagen: img5, descripcion: "Dulce y duradero, ideal para citas."},
    {id: 6, nombre: "Nautica Blue", precio: 40000, stock: 34, imagen: img6, descripcion: "Aroma limpio y acuático."},
    {id: 7, nombre: "Aqua Di GIO", precio: 210000, stock: 123, imagen: img7, descripcion: "El ícono de la frescura marina."},
    {id: 8, nombre: "Power (A. Banderas)", precio: 160000, stock: 62, imagen: img8, descripcion: "Pura seducción y poder."},
    {id: 9, nombre: "Lamborghini Deo", precio: 430000, stock: 78, imagen: img9, descripcion: "Lujo y velocidad en una botella."},
];

function Productos() {
    const [productos] = useState(productosIniciales);
    const { agregarAlCarrito } = useCart();

    return (
        // Fondo degradado
        <div className={styles.pageContainer}>
            {/* Panel oscuro central */}
            <div className={styles.contentBox}>

                <h1 className={styles.title}>Productos Perfulandia</h1>

                {/* Contenedor de las tarjetas de producto */}
                <div className={styles.gridContainer}>
                    {productos.map(prod => (
                        <ProductCard
                            key={prod.id}
                            producto={prod}
                            // 3. Pasa la función del contexto al componente hijo
                            onAgregarAlCarrito={agregarAlCarrito}
                        />
                    ))}
                </div>

                {/* 4. Ya no hay necesidad de renderizar el carrito aquí abajo */}
            </div>
        </div>
    );
}

export default Productos;