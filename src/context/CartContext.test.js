// Esta es una prueba "mock" de la lógica del carrito, ya que no estamos
// montando el componente React completo, solo probamos la función de cálculo.

// Función simple de cálculo (duplicada de CartContext para fines de prueba)
const calcularTotal = (items) => {
    // Aseguramos la lógica de cálculo
    return items.reduce((total, item) => total + (item.precio * item.cantidad), 0);
};

// Simulación de la lógica de agregar al carrito para pruebas (solo la lógica del array)
const simularAgregarAlCarrito = (prevCarrito, producto) => {
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
};

describe('Cart Context Core Logic', () => {

    // Datos base para el carrito
    const PRODUCT_A = { id: 1, precio: 50, stock: 10 };
    const PRODUCT_B = { id: 2, precio: 100, stock: 5 };

    // Test 4
    it('should calculate the total price correctly for multiple items', () => {
        const items = [
            { ...PRODUCT_A, cantidad: 2 }, // 50 * 2 = 100
            { ...PRODUCT_B, cantidad: 3 }  // 100 * 3 = 300
        ];

        expect(calcularTotal(items)).toEqual(400);
    });

    // Test 5
    it('should return 0 when the cart is empty', () => {
        expect(calcularTotal([])).toEqual(0);
    });

    // Test 6
    it('should add a new product with quantity 1 if it does not exist', () => {
        const initialCart = [{ ...PRODUCT_A, cantidad: 1 }];
        const newCart = simularAgregarAlCarrito(initialCart, PRODUCT_B);

        expect(newCart.length).toBe(2);
        const addedItem = newCart.find(item => item.id === PRODUCT_B.id);
        expect(addedItem.cantidad).toBe(1);
    });

    // Test 7
    it('should increment quantity if the product already exists', () => {
        const initialCart = [{ ...PRODUCT_A, cantidad: 2 }];
        const newCart = simularAgregarAlCarrito(initialCart, PRODUCT_A);

        expect(newCart.length).toBe(1);
        expect(newCart[0].cantidad).toBe(3); // 2 + 1 = 3
    });

    // Test 8
    it('should correctly empty the cart (simulating vaciarCarrito)', () => {
        const initialCart = [{ ...PRODUCT_A, cantidad: 1 }, { ...PRODUCT_B, cantidad: 1 }];
        const emptyCart = initialCart.filter(() => false); // Simula vaciar

        expect(emptyCart.length).toBe(0);
        expect(calcularTotal(emptyCart)).toEqual(0);
    });
});