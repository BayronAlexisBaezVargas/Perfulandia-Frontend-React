// src/context/CartContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';

// 1. Crear el Contexto
const CartContext = createContext();

// 2. Crear un Hook personalizado para usar el contexto (más fácil)
export const useCart = () => useContext(CartContext);

// 3. Crear el Proveedor del Contexto
export const CartProvider = ({ children }) => {
    // ... (Inicialización y useEffect sin cambios) ...

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

    // 3. Lógica para agregar al carrito (CON ALERTAS TIPO TOAST)
    const agregarAlCarrito = (producto) => {
        if (producto.stock <= 0) {
            // Alerta de Error (más pequeña, tipo toast)
            Swal.fire({
                toast: true,
                position: 'top-start', // <--- CAMBIO CLAVE: Movido a la izquierda
                icon: 'error',
                title: `${producto.nombre} agotado.`,
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
            return;
        }

        let isNewItem = false;

        setCarrito(prevCarrito => {
            const itemEncontrado = prevCarrito.find(item => item.id === producto.id);
            if (itemEncontrado) {
                // Cantidad actualizada
                return prevCarrito.map(item =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            } else {
                // Nuevo producto
                isNewItem = true;
                return [...prevCarrito, { ...producto, cantidad: 1 }];
            }
        });

        // Alerta de Éxito (más pequeña, tipo toast)
        Swal.fire({
            toast: true,
            position: "top-start", // <--- CAMBIO CLAVE: Movido a la izquierda
            icon: "success",
            title: isNewItem ? `${producto.nombre} añadido.` : `Una unidad más de ${producto.nombre}.`,
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
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