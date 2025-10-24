// src/pages/AdminProducts.js
import React, { useState, useEffect } from 'react';
import { saveOrUpdateProduct, deleteProduct, getProducts, getCriticalProducts } from '../utils/productService';
import { PlusCircleFill, TrashFill, PencilSquare } from 'react-bootstrap-icons';
import styles from './AdminProducts.module.css';

// Componente del Formulario (Offcanvas)
const ProductForm = ({ isEditing, productToEdit, onClose, onSave }) => {
    const initialFormState = {
        id: null,
        nombre: '',
        precio: '',
        stock: '',
        descripcion: '',
        imageLink: '', // Campo para el link de la foto
    };

    const [formData, setFormData] = useState(initialFormState);

    // Sincronizar formulario con producto a editar
    useEffect(() => {
        if (isEditing && productToEdit) {
            setFormData({
                id: productToEdit.id,
                nombre: productToEdit.nombre || '',
                precio: productToEdit.precio || '',
                stock: productToEdit.stock || '',
                descripcion: productToEdit.descripcion || '',
                imageLink: productToEdit.imageLink || '',
            });
        } else {
            setFormData(initialFormState);
        }
    }, [isEditing, productToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'precio' || name === 'stock' ? (value === '' ? '' : Number(value)) : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación básica
        if (!formData.nombre || !formData.precio || formData.stock === '' || !formData.descripcion || !formData.imageLink) {
            alert("Por favor, rellena todos los campos.");
            return;
        }

        onSave(formData);
    };

    return (
        <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="productOffcanvas" // Target ID
            aria-labelledby="productOffcanvasLabel"
        >
            <div className="offcanvas-header" style={{backgroundColor: '#212529'}}>
                <h5 className="offcanvas-title text-white" id="productOffcanvasLabel">
                    {isEditing ? 'Editar Producto' : 'Añadir Nuevo Producto'}
                </h5>
                <button
                    type="button"
                    className="btn-close btn-close-white"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                    onClick={onClose}
                ></button>
            </div>
            <div className="offcanvas-body bg-dark text-white">
                <form onSubmit={handleSubmit}>

                    {/* Nombre */}
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre del Producto</label>
                        <input type="text" className="form-control" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
                    </div>

                    {/* Precio */}
                    <div className="mb-3">
                        <label htmlFor="precio" className="form-label">Precio ($)</label>
                        <input type="number" className="form-control" id="precio" name="precio" value={formData.precio} onChange={handleChange} required min="0" />
                    </div>

                    {/* Stock */}
                    <div className="mb-3">
                        <label htmlFor="stock" className="form-label">Stock (Unidades)</label>
                        <input type="number" className="form-control" id="stock" name="stock" value={formData.stock} onChange={handleChange} required min="0" />
                    </div>

                    {/* Descripción */}
                    <div className="mb-3">
                        <label htmlFor="descripcion" className="form-label">Descripción</label>
                        <textarea className="form-control" id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange} rows="3" required></textarea>
                    </div>

                    {/* Image Link */}
                    <div className="mb-3">
                        <label htmlFor="imageLink" className="form-label">Link de la Imagen (URL/Path)</label>
                        <input type="text" className="form-control" id="imageLink" name="imageLink" value={formData.imageLink} onChange={handleChange} required />
                    </div>

                    {/* Vista previa de la imagen */}
                    {formData.imageLink && (
                        <div className="mb-3 text-center">
                            <p className="form-label">Vista Previa:</p>
                            <img
                                src={formData.imageLink}
                                alt="Vista previa"
                                className={styles.imagePreview}
                                // Ocultar si hay error de carga
                                onError={(e) => { e.target.style.display='none'; e.target.previousElementSibling.textContent = 'Link de imagen no válido'; }}
                                onLoad={(e) => { e.target.style.display='block'; }}
                            />
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary w-100 mt-3" data-bs-dismiss="offcanvas">
                        {isEditing ? 'Guardar Cambios' : 'Crear Producto'}
                    </button>
                </form>
            </div>
        </div>
    );
};


// Componente principal de Administración de Productos
function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [viewMode, setViewMode] = useState('all');
    const [isEditing, setIsEditing] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);
    const criticalThreshold = 10;

    // Carga inicial de productos
    useEffect(() => {
        setProducts(getProducts());

        const offcanvasElement = document.getElementById('productOffcanvas');
        if (offcanvasElement) {
            // Este listener asegura que el estado de React se limpia al cerrar el Offcanvas con la 'X' o escape
            offcanvasElement.addEventListener('hidden.bs.offcanvas', resetFormState);
        }

        return () => {
            if (offcanvasElement) {
                offcanvasElement.removeEventListener('hidden.bs.offcanvas', resetFormState);
            }
        };
    }, []);

    const filteredProducts = (viewMode === 'critical' ? getCriticalProducts() : products).filter(p => p);

    const handleSave = (productData) => {
        const updatedList = saveOrUpdateProduct(productData);
        setProducts(updatedList);
    };

    const handleDelete = (id) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
            const updatedList = deleteProduct(id);
            setProducts(updatedList);
        }
    };

    const handleEditClick = (product) => {
        setIsEditing(true);
        setProductToEdit(product);
        // Eliminamos la llamada programática a new window.bootstrap.Offcanvas.show()
    };

    const handleAddClick = () => {
        setIsEditing(false);
        setProductToEdit(null);
        // Eliminamos la llamada programática a new window.bootstrap.Offcanvas.show()
    };

    const resetFormState = () => {
        setIsEditing(false);
        setProductToEdit(null);
    };

    // Contar productos críticos para el botón
    const totalCritical = products.filter(p => p.stock <= criticalThreshold).length;


    return (
        <div className={styles.productAdminRoot}>
            <header className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-white">Gestión de Inventario</h2>
                {/* --- BOTÓN AÑADIR: Usa atributos declarativos de Bootstrap --- */}
                <button
                    className="btn btn-success btn-lg"
                    type="button"
                    onClick={handleAddClick}
                    data-bs-toggle="offcanvas"
                    data-bs-target="#productOffcanvas"
                >
                    <PlusCircleFill className="me-2" /> Añadir Producto
                </button>
            </header>

            {/* Selector de Vista */}
            <div className="btn-group mb-4 w-100">
                <button
                    className={`btn ${viewMode === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setViewMode('all')}
                >
                    Todos los Productos ({products.length})
                </button>
                <button
                    className={`btn ${viewMode === 'critical' ? 'btn-danger' : 'btn-outline-danger'}`}
                    onClick={() => setViewMode('critical')}
                >
                    Productos Críticos ({totalCritical})
                </button>
            </div>

            {/* Tabla de Productos */}
            <div className={styles.tableCard}>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Descripción</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(prod => (
                                <tr key={prod.id} className={prod.stock <= criticalThreshold ? styles.criticalRow : ''}>
                                    <td>{prod.id}</td>
                                    <td>
                                        <img
                                            src={prod.imageLink}
                                            alt={prod.nombre}
                                            className={styles.productThumb}
                                            onError={(e) => { e.target.style.opacity = 0.3 }}
                                        />
                                    </td>
                                    <td>{prod.nombre}</td>
                                    <td>${prod.precio.toLocaleString('es-CL')}</td>
                                    <td>
                                            <span className={`badge ${prod.stock <= criticalThreshold ? 'bg-danger' : 'bg-success'}`}>
                                                {prod.stock}
                                            </span>
                                    </td>
                                    <td className={styles.descriptionCell}>{prod.descripcion}</td>
                                    <td>
                                        {/* --- BOTÓN EDITAR: Usa atributos declarativos de Bootstrap --- */}
                                        <button
                                            className="btn btn-sm btn-info me-2"
                                            onClick={() => handleEditClick(prod)}
                                            data-bs-toggle="offcanvas"
                                            data-bs-target="#productOffcanvas"
                                            title="Editar"
                                        >
                                            <PencilSquare />
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDelete(prod.id)}
                                            title="Eliminar"
                                        >
                                            <TrashFill />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center p-4">
                                    {viewMode === 'critical' ? 'No hay productos con stock crítico.' : 'No hay productos en el inventario.'}
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Formulario Offcanvas */}
            <ProductForm
                isEditing={isEditing}
                productToEdit={productToEdit}
                onClose={resetFormState}
                onSave={handleSave}
            />
        </div>
    );
}

export default AdminProducts;