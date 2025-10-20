import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Crear el Contexto
const CartContext = createContext();

// 2. Crear un Hook personalizado para usar el contexto (más fácil)
export const useCart = () => useContext(CartContext);

// 3. Crear el Proveedor del Contexto
export const CartProvider = ({ children }) => {
    // --- Toda la lógica del carrito que estaba en Productos.js se mueve aquí ---

    // 1. Inicializa el carrito leyendo desde localStorage
    const [carrito, setCarrito] = useState(() => {
        try {
            const carritoGuardado = localStorage.getItem('carrito');
            return carritoGuardado ? JSON.parse(carritoGuardado) : [];
        } catch (error) {
            console.error("Error al leer localStorage", error);
            return [];
        }
    });

    // 2. Cada vez que el estado 'carrito' cambie, guárdalo en localStorage
    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito]);

    // 3. Lógica para agregar al carrito
    const agregarAlCarrito = (producto) => {
        setCarrito(prevCarrito => {
            const itemEncontrado = prevCarrito.find(item => item.id === producto.id);
            if (itemEncontrado) {
                return prevCarrito.map(item =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            } else {
                return [...prevCarrito, { ...producto, cantidad: 1 }];
            }
        });
    };

    // 4. Lógica para eliminar
    const eliminarDelCarrito = (id) => {
        setCarrito(prevCarrito => prevCarrito.filter(item => item.id !== id));
    };

    // 5. Lógica para vaciar
    const vaciarCarrito = () => {
        setCarrito([]);
    };

    // 6. Lógica para calcular total
    const calcularTotal = () => {
        return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    };

    // 7. Calcular el número total de items (para el badge)
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);

    // --- Provee el estado y las funciones a los componentes hijos ---
    const value = {
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        calcularTotal,
        totalItems
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};