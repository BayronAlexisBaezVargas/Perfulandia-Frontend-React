// src/utils/orderService.js

const ORDERS_KEY = 'pedidos';

// Datos de órdenes de ejemplo para inicializar la vista del administrador
const initialOrders = [
    {
        id: '#PF-0815',
        date: '2025-09-15',
        customer: 'Marcelo Ríos',
        email: 'marcelo.r@ejemplo.com',
        total: 130000,
        status: 'Completado',
        items: [{nombre: 'Bad Boy', cantidad: 1, precio: 130000}],
        shippingAddress: 'Av. Las Condes 1234, Santiago'
    },
    {
        id: '#PF-0814',
        date: '2025-09-14',
        customer: 'Ana González',
        email: 'ana.g@ejemplo.com',
        total: 80000,
        status: 'Pendiente',
        items: [{nombre: 'Blue Seduction', cantidad: 1, precio: 80000}],
        shippingAddress: 'Calle Central 567, Valparaíso'
    },
    {
        id: '#PF-0813',
        date: '2025-09-13',
        customer: 'Carlos Pérez',
        email: 'carlos.p@ejemplo.com',
        total: 210000,
        status: 'Enviado',
        items: [{nombre: 'Aqua Di GIO Profondo', cantidad: 1, precio: 210000}],
        shippingAddress: 'Ruta 5 Sur Km 20, Puerto Montt'
    },
    {
        id: '#PF-0812',
        date: '2025-09-12',
        customer: 'Sofía Vergara',
        email: 'sofia.v@ejemplo.com',
        total: 70000,
        status: 'Cancelado',
        items: [{nombre: 'All Black', cantidad: 1, precio: 70000}],
        shippingAddress: 'Pasaje Los Lagos 101, Concepción'
    },
];

// Obtiene la lista de pedidos de localStorage o inicializa con datos base
export const getOrders = () => {
    try {
        const raw = localStorage.getItem(ORDERS_KEY);
        if (raw) {
            return JSON.parse(raw);
        }
        // Inicializa con pedidos base para el admin
        localStorage.setItem(ORDERS_KEY, JSON.stringify(initialOrders));
        return initialOrders;
    } catch {
        return initialOrders;
    }
};

// Guarda un nuevo pedido
export const saveNewOrder = (orderData) => {
    const orders = getOrders();
    orders.unshift(orderData); // Agrega el nuevo pedido al inicio
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
};

// Función auxiliar para generar ID de pedido
export const generateOrderId = () => {
    const orders = getOrders();
    const prefix = '#PF-';

    // Obtener el ID numérico más alto y sumar 1
    const maxNum = orders.reduce((max, order) => {
        const num = parseInt(order.id.replace(prefix, '') || '0');
        return num > max ? num : max;
    }, 0);

    // El formato será #PF-0816, etc.
    const newNum = String(maxNum + 1).padStart(4, '0');
    return prefix + newNum;
};