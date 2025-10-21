// src/utils/productService.js

import img1 from '../assets/1.webp';
import img2 from '../assets/2.webp';
import img3 from '../assets/3.webp';
import img4 from '../assets/4.webp';
import img5 from '../assets/5.webp';
import img6 from '../assets/6.webp';
import img7 from '../assets/7.webp';
import img8 from '../assets/8.webp';
import img9 from '../assets/9.webp';

// Lista inicial de productos (si localStorage está vacío)
const productosIniciales = [
    {id: 1, nombre: "Mandarin Sky", precio: 40000, stock: 12, imagen: img1, descripcion: "Fragancia cítrica y vibrante, con notas de mandarina y brisa marina."},
    {id: 2, nombre: "All Black", precio: 70000, stock: 102, imagen: img2, descripcion: "Aroma intenso para la noche, con cardamomo, tonka y cedro."},
    {id: 3, nombre: "Bad Boy", precio: 130000, stock: 327, imagen: img3, descripcion: "Poderoso y sofisticado, con un atrevido contraste de frescura e intensidad."},
    {id: 4, nombre: "Blue Seduction (A. Banderas)", precio: 80000, stock: 12, imagen: img4, descripcion: "Un clásico fresco y seductor, con notas acuáticas y amaderadas."},
    {id: 5, nombre: "9 pm (Afnan)", precio: 130000, stock: 50, imagen: img5, descripcion: "Dulce y duradero, ideal para citas. Vainilla, canela y manzana."},
    {id: 6, nombre: "Nautica Blue", precio: 40000, stock: 34, imagen: img6, descripcion: "Aroma limpio y acuático, perfecto para el uso diario y el verano."},
    {id: 7, nombre: "Aqua Di GIO Profondo", precio: 210000, stock: 123, imagen: img7, descripcion: "El ícono de la frescura marina, profundo e intenso, con toques minerales."},
    {id: 8, nombre: "Power of Seduction (A. Banderas)", precio: 160000, stock: 62, imagen: img8, descripcion: "Pura seducción y poder, con notas de hielo y especias frescas."},
    {id: 9, nombre: "Lamborghini Deo", precio: 430000, stock: 78, imagen: img9, descripcion: "Lujo y velocidad en una botella. Fragancia oriental especiada y elegante."},
];

const PRODUCTS_KEY = 'perfumes';

// Función para obtener la lista de productos desde localStorage
export const getProducts = () => {
    try {
        const storedProducts = localStorage.getItem(PRODUCTS_KEY);
        if (storedProducts) {
            return JSON.parse(storedProducts);
        }
        // Si no hay productos, inicializa y devuelve la lista inicial
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(productosIniciales));
        return productosIniciales;

    } catch (error) {
        console.error("Error al obtener productos:", error);
        return productosIniciales;
    }
}

// Función para guardar la lista de productos en localStorage
export const saveProducts = (products) => {
    try {
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    } catch (error) {
        console.error("Error al guardar productos:", error);
    }
}

// Función para obtener un producto por ID
export const getProductById = (id) => {
    const products = getProducts();
    // Convertir ID a número ya que URL params son strings
    return products.find(p => p.id === parseInt(id));
}