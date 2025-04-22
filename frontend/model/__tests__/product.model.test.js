// productModel.test.js
import ProductModel from '../product.model';

// Mock de fetch global
global.fetch = jest.fn();

describe('ProductModel', () => {
    let productModel;

    beforeEach(() => {
        productModel = new ProductModel();
        fetch.mockClear();
    });

    describe('getFeaturedProducts', () => {
        it('debería retornar productos destacados cuando la llamada es exitosa', async () => {
            const mockProducts = [{ id: 1, name: 'Producto 1' }, { id: 2, name: 'Producto 2' }];
            fetch.mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockProducts),
            });

            const result = await productModel.getFeaturedProducts();
            expect(result).toEqual(mockProducts);
            expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/products/destacados');
        });

        it('debería retornar array vacío cuando la llamada falla', async () => {
            fetch.mockRejectedValueOnce(new Error('Error de red'));

            const result = await productModel.getFeaturedProducts();
            expect(result).toEqual([]);
        });
    });

    describe('getProductsByCategory', () => {
        it('debería retornar productos por categoría cuando la llamada es exitosa', async () => {
            const categoryId = '123';
            const mockProducts = [{ id: 1, name: 'Producto A' }, { id: 2, name: 'Producto B' }];
            fetch.mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockProducts),
            });

            const result = await productModel.getProductsByCategory(categoryId);
            expect(result).toEqual(mockProducts);
            expect(fetch).toHaveBeenCalledWith(`http://localhost:3000/api/products/categoria/${categoryId}`);
        });

        it('debería retornar array vacío cuando la categoría no existe', async () => {
            const categoryId = '999';
            fetch.mockResolvedValueOnce({
                ok: false,
            });

            const result = await productModel.getProductsByCategory(categoryId);
            expect(result).toEqual([]);
        });
    });

    describe('searchProducts', () => {
        it('debería retornar productos que coincidan con el término de búsqueda', async () => {
            const searchTerm = 'zapatos';
            const mockResults = [{ id: 1, name: 'Zapatos deportivos' }, { id: 2, name: 'Zapatos formales' }];
            fetch.mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockResults),
            });

            const result = await productModel.searchProducts(searchTerm);
            expect(result).toEqual(mockResults);
            expect(fetch).toHaveBeenCalledWith(`http://localhost:3000/api/products/search/${encodeURIComponent(searchTerm)}`);
        });

        it('debería manejar correctamente términos de búsqueda con espacios', async () => {
            const searchTerm = 'zapatos deportivos';
            fetch.mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve([]),
            });

            await productModel.searchProducts(searchTerm);
            expect(fetch).toHaveBeenCalledWith(`http://localhost:3000/api/products/search/${encodeURIComponent(searchTerm)}`);
        });
    });

    describe('getProductDetails', () => {
        it('debería retornar detalles del producto cuando existe', async () => {
            const productId = '456';
            const mockDetails = { id: '456', name: 'Producto Detallado', price: 99.99 };
            fetch.mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockDetails),
            });

            const result = await productModel.getProductDetails(productId);
            expect(result).toEqual(mockDetails);
            expect(fetch).toHaveBeenCalledWith(`http://localhost:3000/api/products/${productId}`);
        });

        it('debería retornar null cuando el producto no existe', async () => {
            const productId = '999';
            fetch.mockResolvedValueOnce({
                ok: false,
            });

            const result = await productModel.getProductDetails(productId);
            expect(result).toBeNull();
        });
    });

    describe('getProductReviews', () => {
        it('debería retornar opiniones del producto cuando existen', async () => {
            const productId = '789';
            const mockReviews = [
                { id: 1, rating: 5, comment: 'Excelente' },
                { id: 2, rating: 4, comment: 'Muy bueno' },
            ];
            fetch.mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockReviews),
            });

            const result = await productModel.getProductReviews(productId);
            expect(result).toEqual(mockReviews);
            expect(fetch).toHaveBeenCalledWith(`http://localhost:3000/api/opinions/${productId}`);
        });

        it('debería retornar array vacío cuando no hay opiniones', async () => {
            const productId = '000';
            fetch.mockResolvedValueOnce({
                ok: false,
            });

            const result = await productModel.getProductReviews(productId);
            expect(result).toEqual([]);
        });
    });

    describe('submitProductReview', () => {
        it('debería enviar correctamente una opinión y retornar éxito', async () => {
            const reviewData = {
                productId: '123',
                rating: 5,
                comment: 'Muy buen producto',
                userId: 'user1',
            };
            const mockResponse = { id: 'review1', ...reviewData };
            fetch.mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockResponse),
            });

            const result = await productModel.submitProductReview(reviewData);
            expect(result).toEqual({ success: true, data: mockResponse });
            expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/opinions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewData),
            });
        });

        it('debería manejar errores al enviar una opinión', async () => {
            const reviewData = {
                productId: '123',
                rating: 5,
                comment: 'Muy buen producto',
                userId: 'user1',
            };
            const errorMessage = 'Error de servidor';
            fetch.mockRejectedValueOnce(new Error(errorMessage));

            const result = await productModel.submitProductReview(reviewData);
            expect(result).toEqual({
                success: false,
                error: errorMessage || 'No se pudo enviar la opinión. Intenta de nuevo más tarde.',
            });
        });

        it('debería manejar respuestas no exitosas del servidor', async () => {
            const reviewData = {
                productId: '123',
                rating: 5,
                comment: 'Muy buen producto',
                userId: 'user1',
            };
            fetch.mockResolvedValueOnce({
                ok: false,
            });

            const result = await productModel.submitProductReview(reviewData);
            expect(result.success).toBe(false);
        });
    });
});