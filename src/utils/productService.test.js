import { getProductById, getCriticalProducts, saveOrUpdateProduct, getProducts, saveProducts } from './productService';

// Datos de prueba simulados para evitar conflictos con el localStorage real.
// En un entorno de prueba real, usaríamos mocks/spies, pero aquí simulamos la estructura.
const MOCK_PRODUCTS = [
    { id: 10, nombre: "Test Fragrance A", precio: 100, stock: 5, imageLink: '' },
    { id: 20, nombre: "Test Fragrance B", precio: 200, stock: 15, imageLink: '' },
    { id: 30, nombre: "Test Fragrance C", precio: 300, stock: 10, imageLink: '' }
];

describe('Product Service Logic', () => {

    // Configuración para aislar las pruebas que modifican localStorage
    beforeEach(() => {
        // Aseguramos un estado conocido antes de cada prueba de servicio
        saveProducts(MOCK_PRODUCTS);
    });

    afterEach(() => {
        // Limpiamos el localStorage para no interferir con otras pruebas
        localStorage.removeItem('perfumes');
    });

    // Test 1
    it('should retrieve a product by its ID', () => {
        const product = getProductById(20);
        expect(product.nombre).toBe('Test Fragrance B');
        expect(product.precio).toBe(200);
    });

    // Test 2
    it('should identify all critical products (stock <= 10)', () => {
        const criticalProducts = getCriticalProducts();

        // Esperamos 2 productos: ID 10 (stock 5) e ID 30 (stock 10)
        expect(criticalProducts.length).toBe(2);

        // Verificamos si contienen los IDs esperados
        const ids = criticalProducts.map(p => p.id);
        expect(ids).toContain(10);
        expect(ids).toContain(30);
    });

    // Test 3
    it('should add a new product and generate a new ID', () => {
        const newProductData = {
            nombre: "New Test Product",
            precio: 50,
            stock: 25,
            imageLink: ''
        };

        const updatedProducts = saveOrUpdateProduct(newProductData);

        // El nuevo ID debería ser 31 (Máx de MOCK_PRODUCTS es 30, así que 30 + 1 = 31)
        const newestProduct = updatedProducts.find(p => p.nombre === 'New Test Product');

        expect(updatedProducts.length).toBe(4);
        expect(newestProduct.id).toBe(31);
        expect(newestProduct.stock).toBe(25);
    });
});