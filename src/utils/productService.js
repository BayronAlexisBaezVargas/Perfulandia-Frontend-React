const PRODUCTS_KEY = 'perfumes';
const STOCK_CRITICAL_THRESHOLD = 10;

const productosIniciales = [
    // La ruta es relativa a la raíz de la carpeta public.
    {id: 1, nombre: "Mandarin Sky", precio: 40000, stock: 12, descripcion: "Fragancia cítrica y vibrante, con notas de mandarina y brisa marina.", imageLink: '/images/1.webp'},
    {id: 2, nombre: "All Black", precio: 70000, stock: 102, descripcion: "Aroma intenso para la noche, con cardamomo, tonka y cedro.", imageLink: '/images/2.webp'},
    {id: 3, nombre: "Bad Boy", precio: 130000, stock: 327, descripcion: "Poderoso y sofisticado, con un atrevido contraste de frescura e intensidad.", imageLink: '/images/3.webp'},
    {id: 4, nombre: "Blue Seduction (A. Banderas)", precio: 80000, stock: 12, descripcion: "Un clásico fresco y seductor, con notas acuáticas y amaderadas.", imageLink: '/images/4.webp'},
    {id: 5, nombre: "9 pm (Afnan)", precio: 130000, stock: 50, descripcion: "Dulce y duradero, ideal para citas. Vainilla, canela y manzana.", imageLink: '/images/5.webp'},
    {id: 6, nombre: "Nautica Blue", precio: 40000, stock: 34, descripcion: "Aroma limpio y acuático, perfecto para el uso diario y el verano.", imageLink: '/images/6.webp'},
    {id: 7, nombre: "Aqua Di GIO Profondo", precio: 210000, stock: 8, descripcion: "El ícono de la frescura marina, profundo e intenso, con toques minerales.", imageLink: '/images/7.webp'},
    {id: 8, nombre: "Power of Seduction (A. Banderas)", precio: 160000, stock: 62, descripcion: "Pura seducción y poder, con notas de hielo y especias frescas.", imageLink: '/images/8.webp'},
    {id: 9, nombre: "Lamborghini Deo", precio: 430000, stock: 5, descripcion: "Lujo y velocidad en una botella. Fragancia oriental especiada y elegante.", imageLink: '/images/9.webp'},
];

// Función auxiliar para generar un nuevo ID
const getNextId = (products) => {
    const maxId = products.reduce((max, p) => (p.id > max ? p.id : max), 0);
    return maxId + 1;
};

// Obtiene todos los productos del localStorage (o inicializa si es la primera vez)
export const getProducts = () => {
    if (typeof window === 'undefined') return [];
    try {
        const storedProducts = localStorage.getItem(PRODUCTS_KEY);
        if (storedProducts) {
            return JSON.parse(storedProducts).map(p => ({
                ...p,
                id: parseInt(p.id),
                precio: Number(p.precio),
                stock: Number(p.stock)
            }));
        }

        // Inicializar y guardar la lista base
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(productosIniciales));
        return productosIniciales;

    } catch (error) {
        console.error("Error al obtener productos:", error);
        return productosIniciales;
    }
}

// Guarda la lista de productos
export const saveProducts = (products) => {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    } catch (error) {
        console.error("Error al guardar productos:", error);
    }
}

// Agrega o actualiza un producto
export const saveOrUpdateProduct = (productData) => {
    const products = getProducts();

    // Si tiene ID, es una actualización
    if (productData.id) {
        const index = products.findIndex(p => p.id === parseInt(productData.id));
        if (index !== -1) {
            products[index] = { ...products[index], ...productData, id: parseInt(productData.id) };
        }
    } else {
        // Nuevo producto
        const newId = getNextId(products);
        const newProduct = { ...productData, id: newId };
        products.push(newProduct);
    }

    saveProducts(products);
    return products;
}

// Elimina un producto
export const deleteProduct = (id) => {
    const products = getProducts();
    const updatedProducts = products.filter(p => p.id !== parseInt(id));
    saveProducts(updatedProducts);
    return updatedProducts;
}

// Obtiene un producto por ID
export const getProductById = (id) => {
    const products = getProducts();
    return products.find(p => p.id === parseInt(id));
}

// Obtiene productos críticos (stock <= 10)
export const getCriticalProducts = () => {
    const products = getProducts();
    return products.filter(p => p.stock <= STOCK_CRITICAL_THRESHOLD);
}