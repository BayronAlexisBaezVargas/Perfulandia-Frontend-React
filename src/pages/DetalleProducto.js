import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
// --- Importar servicio de productos ---
import { getProductById } from '../utils/productService';
// Reutilizar el CSS del contenedor principal
import styles from './Productos.module.css';

function DetalleProducto() {
    const { id } = useParams(); // Obtiene el ID del producto desde la URL
    const navigate = useNavigate();
    const { agregarAlCarrito } = useCart();
    const [producto, setProducto] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const foundProduct = getProductById(id);
        if (foundProduct) {
            setProducto(foundProduct);
        } else {
            // Si el producto no existe, redirigir a la página de productos
            navigate('/Productos', { replace: true });
        }
        setIsLoading(false);
    }, [id, navigate]);

    const handleAddToCart = () => {
        if (producto) {
            agregarAlCarrito(producto);
            // Opcional: Mostrar una notificación o redirigir al carrito (offcanvas)
        }
    }

    if (isLoading) {
        return (
            <div className={styles.pageContainer}>
                <div className={styles.contentBox} style={{color: 'white', maxWidth: '800px'}}>
                    <h1 className={styles.title}>Cargando Producto...</h1>
                </div>
            </div>
        );
    }

    // Solo se renderiza si producto existe (si no, el useEffect redirige)
    return (
        <div className={styles.pageContainer}>
            <div className={styles.contentBox} style={{maxWidth: '1000px'}}>

                <div className="row">
                    {/* Columna de la Imagen */}
                    <div className="col-md-6 mb-4 mb-md-0">
                        <img
                            src={producto.imagen}
                            alt={producto.nombre}
                            className="img-fluid rounded-4 shadow-lg"
                            style={{ maxHeight: '500px', objectFit: 'cover', width: '100%' }}
                        />
                    </div>

                    {/* Columna de Detalles */}
                    <div className="col-md-6 text-white">
                        <h1 className="display-4 fw-bold mb-3">{producto.nombre}</h1>

                        <p className="lead text-white-50 mb-4">{producto.descripcion}</p>

                        <div className="mb-4 p-3 bg-secondary rounded-3 bg-opacity-25">
                            <h2 className="display-5 fw-bolder text-success">
                                ${producto.precio.toLocaleString('es-CL')} CLP
                            </h2>
                            <p className='mb-0 text-info'>IVA incluido</p>
                        </div>

                        <div className="mb-4">
                            <p className="fs-5 fw-semibold text-white">Disponibilidad:</p>
                            <span className={`badge rounded-pill fs-6 ${producto.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
                                {producto.stock > 0 ? `En Stock (${producto.stock} unidades)` : 'Agotado'}
                            </span>
                        </div>

                        <div className="d-grid gap-2">
                            <button
                                className="btn btn-primary btn-lg fw-bold"
                                onClick={handleAddToCart}
                                disabled={producto.stock <= 0}
                            >
                                Agregar al Carrito
                            </button>
                            <button
                                className="btn btn-outline-light btn-lg"
                                onClick={() => navigate('/Productos')}
                            >
                                Volver a la Colección
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default DetalleProducto;