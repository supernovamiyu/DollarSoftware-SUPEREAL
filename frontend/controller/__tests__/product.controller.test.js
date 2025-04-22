import ProductController from '../product.controller';

describe('ProductController', () => {
    let modelMock;
    let viewMock;
    let controller;

    beforeEach(() => {
        // Mocks simulando los métodos del modelo y la vista
        modelMock = {
            getFeaturedProducts: jest.fn(),
            getProductsByCategory: jest.fn(),
            searchProducts: jest.fn(),
            getProductDetails: jest.fn(),
            getProductReviews: jest.fn(),
            submitProductReview: jest.fn(),
        };

        viewMock = {
            showFeaturedProducts: jest.fn(),
            showProductsByCategory: jest.fn(),
            showSearchResults: jest.fn(),
            showProductDetails: jest.fn(),
            showProductReviews: jest.fn(),
            showLoadingReviews: jest.fn(),
            showMessage: jest.fn(),
            updateURL: jest.fn(),
            removeExistingReviewForms: jest.fn(),
            addReviewForm: jest.fn(),
            setupAddToCartButtons: jest.fn(),
        };

        // Limpieza del localStorage antes de cada prueba
        localStorage.clear();

        controller = new ProductController(modelMock, viewMock);
    });

    test('showFeaturedProducts muestra productos con descripciones por defecto', async () => {
        const mockProducts = [
            { id_productos: 1, nombre_producto: 'Producto 1', descripcion: '' }
        ];
        modelMock.getFeaturedProducts.mockResolvedValue(mockProducts);

        await controller.showFeaturedProducts();

        expect(viewMock.showFeaturedProducts).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({ descripcion: "Descripción breve no disponible" })
            ])
        );
    });

    test('searchProducts muestra advertencia si el término es muy corto', async () => {
        await controller.searchProducts("ab");
        expect(viewMock.showMessage).toHaveBeenCalledWith("Ingresa al menos 3 caracteres", "warning");
    });

    test('searchProducts busca productos y actualiza la vista', async () => {
        const searchResults = [{ id_productos: 2, nombre_producto: 'Mouse' }];
        modelMock.searchProducts.mockResolvedValue(searchResults);

        await controller.searchProducts("mouse");

        expect(viewMock.showSearchResults).toHaveBeenCalledWith(searchResults, "mouse");
        expect(viewMock.updateURL).toHaveBeenCalled();
    });

    test('showProductDetails carga y muestra producto por ID', async () => {
        const product = { id_productos: 1, nombre_producto: 'Monitor', descripcion: "Alta definición" };
        modelMock.getProductDetails.mockResolvedValue(product);
        modelMock.getProductReviews.mockResolvedValue([]);

        await controller.showProductDetails("1");

        expect(viewMock.showProductDetails).toHaveBeenCalledWith(expect.objectContaining({
            nombre_producto: "Monitor"
        }));
        expect(modelMock.getProductReviews).toHaveBeenCalledWith(1);
    });

    test('handleReviewSubmit valida y muestra mensaje si la opinión está vacía', async () => {
        await controller.handleReviewSubmit({ opinion: "   ", productId: 1 });
        expect(viewMock.showMessage).toHaveBeenCalledWith("Por favor, escribe tu opinión", "error");
    });

    test('handleReviewSubmit envía la opinión correctamente', async () => {
        modelMock.submitProductReview.mockResolvedValue({ success: true });
        modelMock.getProductReviews.mockResolvedValue([]);

        await controller.handleReviewSubmit({
            opinion: "Buen producto",
            productId: 1,
            anonymous: false
        });

        expect(modelMock.submitProductReview).toHaveBeenCalledWith(expect.objectContaining({
            opinion: "Buen producto",
            es_anonimo: 0
        }));
        expect(viewMock.showMessage).toHaveBeenCalledWith("¡Opinión enviada con éxito!", "success");
    });
});
