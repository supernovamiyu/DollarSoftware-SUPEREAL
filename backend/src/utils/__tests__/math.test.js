const { suma } = require('../math');

describe('Suite de pruebas para math.js', () => {
    test('El total de la suma de 2 + 3 debe ser equivalente a 5', () => {
        expect(suma(2, 3)).toBe(5);
    });

    test('Suma de números negativos', () => {
        expect(suma(-1, -2)).toBe(-3);
    });
});