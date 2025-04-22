import ProductView from "../product.view.js";

jest.mock("../base.view.js", () => {
    // Creamos una clase mock base
    const mockBaseView = jest.fn(function () {
        this.showTemplate = jest.fn().mockReturnValue(true);
        this.showMessage = jest.fn();
        this.updateURL = jest.fn();
    });

    return mockBaseView;
});


// Mock para las funciones del DOM
document.getElementById = jest.fn();
document.querySelectorAll = jest.fn(() => []);
document.createElement = jest.fn();
document.querySelector = jest.fn();

describe('ProductView', () => {
    let productView;
    let mockElement;

    beforeEach(() => {
        // Limpiar todos los mocks antes de cada prueba
        jest.clearAllMocks();

        // Crear un nuevo ProductView para cada prueba
        productView = new ProductView();

        // Mock estándar para elementos del DOM
        mockElement = {
            innerHTML: '',
            appendChild: jest.fn(),
            remove: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            className: '',
            textContent: ''
        };

        // Configurar getElementById para devolver nuestro elemento mock por defecto
        document.getElementById.mockImplementation(() => mockElement);

        // Configurar createElement para devolver un nuevo elemento mock
        document.createElement.mockImplementation(() => ({ ...mockElement }));

        // Configurar querySelectorAll para devolver un array vacío por defecto
        document.querySelectorAll.mockImplementation(() => []);

        // Asegurar que console.error está mockeado
        console.error = jest.fn();
    });

    describe('showProductsByCategory', () => {
        test('debe mostrar mensaje cuando no hay productos', () => {
            // Preparar
            const products = [];
            const categoryName = "Electrónica";

            const categoryTitleMock = { innerHTML: '' };
            const productsContainerMock = { innerHTML: '' };

            document.getElementById.mockImplementation((id) => {
                if (id === "titulo-seccion-categoria") return categoryTitleMock;
                if (id === "productos-categorias") return productsContainerMock;
                return null;
            });

            // Ejecutar
            productView.showProductsByCategory(products, categoryName);

            // Comprobar
            expect(categoryTitleMock.innerHTML).toContain(categoryName);
            expect(productsContainerMock.innerHTML).toContain("No hay productos disponibles");
        });

        test('debe mostrar productos correctamente', () => {
            // Preparar
            const products = [
                {
                    id_productos: 1,
                    nombre_producto: "Producto de prueba",
                    precio: 100,
                    imagen_url: "test.jpg",
                    unidades_disponibles: 10,
                    id_categoria: 5
                }
            ];
            const categoryName = "Electrónica";

            const categoryTitleMock = { innerHTML: '' };
            const productsContainerMock = { innerHTML: '' };

            document.getElementById.mockImplementation((id) => {
                if (id === "titulo-seccion-categoria") return categoryTitleMock;
                if (id === "productos-categorias") return productsContainerMock;
                return null;
            });

            // Ejecutar
            productView.showProductsByCategory(products, categoryName);

            // Comprobar
            expect(categoryTitleMock.innerHTML).toContain(categoryName);
            expect(productsContainerMock.innerHTML).toContain("Producto de prueba");
            expect(productsContainerMock.innerHTML).toContain("$100");
            expect(productView.updateURL).toHaveBeenCalledWith("/categoria/5");
        });

        test('no debe hacer nada si la plantilla no se puede mostrar', () => {
            // Preparar
            productView.showTemplate.mockReturnValueOnce(false);

            // Ejecutar
            productView.showProductsByCategory([], "Categoría");

            // Comprobar
            expect(document.getElementById).not.toHaveBeenCalled();
        });
    });

    describe('showSearchResults', () => {
        test('debe mostrar mensaje de error si el término de búsqueda es inválido', () => {
            // Preparar
            const products = [];
            const searchTerm = "";

            // Ejecutar
            productView.showSearchResults(products, searchTerm);

            // Comprobar
            expect(productView.showMessage).toHaveBeenCalledWith(
                "Término de búsqueda inválido",
                "error"
            );
        });

        test('debe mostrar mensaje de error si la plantilla no se puede cargar', () => {
            // Preparar
            const products = [];
            const searchTerm = "test";

            productView.showTemplate.mockReturnValueOnce(false);

            // Ejecutar
            productView.showSearchResults(products, searchTerm);

            // Comprobar
            expect(productView.showMessage).toHaveBeenCalledWith(
                "Error al cargar la plantilla de resultados",
                "error"
            );
        });

        test('debe mostrar mensaje cuando no hay resultados', () => {
            // Preparar
            const products = [];
            const searchTerm = "test";

            const resultsContainerMock = { innerHTML: '' };
            document.getElementById.mockImplementation((id) => {
                if (id === "resultados-productos") return resultsContainerMock;
                return null;
            });

            // Mock para setTimeout
            jest.useFakeTimers();

            // Ejecutar
            productView.showSearchResults(products, searchTerm);
            jest.runAllTimers(); // Ejecutar todos los temporizadores

            // Comprobar
            expect(resultsContainerMock.innerHTML).toContain("No se encontraron productos");
        });

        test('debe mostrar productos encontrados correctamente', () => {
            // Preparar
            const products = [
                {
                    id_productos: 1,
                    nombre_producto: "Producto de prueba",
                    precio: 100,
                    imagen_url: "test.jpg",
                    unidades_disponibles: 10
                }
            ];
            const searchTerm = "producto";

            const resultsContainerMock = { innerHTML: '' };
            document.getElementById.mockImplementation((id) => {
                if (id === "resultados-productos") return resultsContainerMock;
                return null;
            });

            // Mock para setTimeout
            jest.useFakeTimers();

            // Ejecutar
            productView.showSearchResults(products, searchTerm);
            jest.runAllTimers(); // Ejecutar todos los temporizadores

            // Comprobar
            expect(resultsContainerMock.innerHTML).toContain("Producto de prueba");
            expect(productView.updateURL).toHaveBeenCalledWith(
                "/busqueda?q=producto",
                expect.any(Object)
            );
        });
    });

    describe('showProductDetails', () => {
        test('debe mostrar mensaje de error si los datos del producto son incompletos', () => {
            // Preparar
            const product = {};

            // Ejecutar
            productView.showProductDetails(product);

            // Comprobar
            expect(productView.showMessage).toHaveBeenCalledWith(
                "Error al cargar los detalles del producto",
                "error"
            );
        });

        test('debe mostrar los detalles del producto correctamente', () => {
            // Preparar
            const product = {
                id_productos: 1,
                nombre_producto: "Producto de prueba",
                precio: 100,
                imagen_url: "test.jpg",
                descripcion: "Descripción de prueba",
                unidades_disponibles: 10
            };

            const containerPrincipalMock = { innerHTML: '' };
            document.getElementById.mockImplementation((id) => {
                if (id === "container-principal") return containerPrincipalMock;
                return null;
            });

            // Ejecutar
            productView.showProductDetails(product);

            // Comprobar
            expect(containerPrincipalMock.innerHTML).toContain("Producto de prueba");
            expect(containerPrincipalMock.innerHTML).toContain("$100");
            expect(containerPrincipalMock.innerHTML).toContain("Descripción de prueba");
        });

        test('debe usar descripción por defecto si no hay descripción', () => {
            // Preparar
            const product = {
                id_productos: 1,
                nombre_producto: "Producto de prueba",
                precio: 100,
                imagen_url: "test.jpg",
                unidades_disponibles: 10
            };

            const containerPrincipalMock = { innerHTML: '' };
            document.getElementById.mockImplementation((id) => {
                if (id === "container-principal") return containerPrincipalMock;
                return null;
            });

            // Ejecutar
            productView.showProductDetails(product);

            // Comprobar
            expect(containerPrincipalMock.innerHTML).toContain("Este producto no tiene descripción disponible");
        });
    });

    describe('showLoadingReviews', () => {
        test('debe crear contenedor de opiniones si no existe', () => {
            // Preparar
            document.getElementById.mockImplementation((id) => {
                if (id === "opiniones-container") return null;
                if (id === "container-principal") return mockElement;
                return null;
            });

            // Ejecutar
            productView.showLoadingReviews();

            // Comprobar
            expect(document.createElement).toHaveBeenCalledWith("div");
            expect(mockElement.appendChild).toHaveBeenCalled();
        });

        test('debe mostrar indicador de carga', () => {
            // Preparar
            const mockOpinionesContainer = { innerHTML: '' };

            document.getElementById.mockImplementation((id) => {
                if (id === "opiniones-container") return mockOpinionesContainer;
                return null;
            });

            // Ejecutar
            productView.showLoadingReviews();

            // Comprobar
            expect(mockOpinionesContainer.innerHTML).toContain("Cargando opiniones");
        });
    });

    describe('showProductReviews', () => {
        test('debe mostrar mensaje cuando no hay opiniones', () => {
            // Preparar
            const reviews = [];

            const mockContainerPrincipal = { appendChild: jest.fn() };
            const mockReviewsContainer = {
                id: 'opiniones-container',
                className: '',
                innerHTML: '',
                appendChild: jest.fn()
            };

            document.getElementById.mockImplementation((id) => {
                if (id === "opiniones-container") return null;
                if (id === "container-principal") return mockContainerPrincipal;
                return null;
            });

            document.createElement.mockImplementation((tag) => {
                if (tag === "div" && !document.createElement.mock.calls[0]) return mockReviewsContainer;
                if (tag === "p") return { className: '', textContent: '' };
                return { ...mockElement };
            });

            // Ejecutar
            productView.showProductReviews(reviews);

            // Comprobar
            expect(mockContainerPrincipal.appendChild).toHaveBeenCalled();
            expect(document.createElement).toHaveBeenCalledWith("p");
        });

        test('debe mostrar opiniones limitadas y botón ver más', () => {
            // Preparar
            const reviews = [
                { id: 1, nombre_usuario: 'User1', es_anonimo: 0, fecha: '2023-01-01', opinion: 'Opinión 1' },
                { id: 2, nombre_usuario: 'User2', es_anonimo: 0, fecha: '2023-01-02', opinion: 'Opinión 2' },
                { id: 3, nombre_usuario: 'User3', es_anonimo: 0, fecha: '2023-01-03', opinion: 'Opinión 3' }
            ];

            const mockContainerPrincipal = { appendChild: jest.fn() };
            const mockReviewsContainer = {
                id: 'opiniones-container',
                className: '',
                innerHTML: '',
                appendChild: jest.fn()
            };

            document.getElementById.mockImplementation((id) => {
                if (id === "opiniones-container") return null;
                if (id === "container-principal") return mockContainerPrincipal;
                return null;
            });

            document.createElement.mockImplementation((tag) => {
                if (tag === "div" && !document.createElement.mock.calls[0]) return mockReviewsContainer;
                return { ...mockElement };
            });

            // Ejecutar
            productView.showProductReviews(reviews, 2);

            // Comprobar
            expect(document.createElement).toHaveBeenCalledWith("button");
        });
    });

    describe('showAllReviews', () => {
        test('debe mostrar todas las opiniones', () => {
            // Preparar
            const reviews = [
                { id: 1, nombre_usuario: 'User1', es_anonimo: 0, fecha: '2023-01-01', opinion: 'Opinión 1' },
                { id: 2, nombre_usuario: 'User2', es_anonimo: 0, fecha: '2023-01-02', opinion: 'Opinión 2' },
                { id: 3, nombre_usuario: 'User3', es_anonimo: 0, fecha: '2023-01-03', opinion: 'Opinión 3' }
            ];

            const mockReviewsList = {
                innerHTML: '',
                appendChild: jest.fn()
            };

            // Ejecutar
            productView.showAllReviews(reviews, mockReviewsList);

            // Comprobar
            expect(mockReviewsList.innerHTML).toBe("");
            expect(document.createElement).toHaveBeenCalledTimes(3); // Tres elementos div de opinión
            expect(mockReviewsList.appendChild).toHaveBeenCalledTimes(3);
        });
    });

    describe('removeExistingReviewForms', () => {
        test('debe eliminar todos los formularios existentes', () => {
            // Preparar
            const mockForms = [
                { remove: jest.fn() },
                { remove: jest.fn() }
            ];

            document.querySelectorAll.mockReturnValue(mockForms);

            // Ejecutar
            productView.removeExistingReviewForms();

            // Comprobar
            expect(document.querySelectorAll).toHaveBeenCalledWith(".seccion-opiniones");
            expect(mockForms[0].remove).toHaveBeenCalled();
            expect(mockForms[1].remove).toHaveBeenCalled();
        });
    });

    describe('addReviewForm', () => {
        test('no debe agregar formulario si ya existe uno', () => {
            // Preparar
            document.querySelector.mockReturnValue({});

            // Ejecutar
            productView.addReviewForm("1", jest.fn());

            // Comprobar
            expect(document.getElementById).not.toHaveBeenCalled();
        });

        test('debe agregar formulario de opinión', () => {
            // Preparar
            document.querySelector.mockReturnValue(null);

            const mockContainerPrincipal = {
                appendChild: jest.fn()
            };

            document.getElementById.mockReturnValue(mockContainerPrincipal);

            const submitHandler = jest.fn();

            // Ejecutar
            productView.addReviewForm("1", submitHandler);

            // Comprobar
            expect(document.createElement).toHaveBeenCalledWith("div");
            expect(document.createElement).toHaveBeenCalledWith("form");
            expect(mockContainerPrincipal.appendChild).toHaveBeenCalled();
        });

        test('debe manejar envío del formulario', () => {
            // Preparar
            document.querySelector.mockReturnValue(null);

            const mockContainerPrincipal = {
                appendChild: jest.fn()
            };

            document.getElementById.mockReturnValue(mockContainerPrincipal);

            const mockForm = {
                id: 'formulario-opiniones',
                innerHTML: '',
                addEventListener: jest.fn()
            };

            document.createElement.mockImplementation((tag) => {
                if (tag === "form") return mockForm;
                return { ...mockElement };
            });

            const submitHandler = jest.fn();

            // Ejecutar
            productView.addReviewForm("1", submitHandler);

            // Comprobar
            expect(mockForm.addEventListener).toHaveBeenCalledWith("submit", expect.any(Function));

            // Simular envío del formulario
            const mockEvent = { preventDefault: jest.fn() };
            const submitCallback = mockForm.addEventListener.mock.calls[0][1];

            // Configurar mocks para el envío del formulario
            document.getElementById.mockImplementation((id) => {
                if (id === "opinion") return { value: "Buena opinión" };
                if (id === "anonimo") return { checked: true };
                return null;
            });

            // Ejecutar el callback de envío
            submitCallback(mockEvent);

            // Comprobar
            expect(mockEvent.preventDefault).toHaveBeenCalled();
            expect(submitHandler).toHaveBeenCalledWith({
                productId: "1",
                opinion: "Buena opinión",
                anonymous: true
            });
        });
    });

    describe('setupAddToCartButtons', () => {
        test('debe configurar eventos para botones de compra', () => {
            // Preparar
            const mockButtons = [
                { removeEventListener: jest.fn(), addEventListener: jest.fn() },
                { removeEventListener: jest.fn(), addEventListener: jest.fn() }
            ];

            document.querySelectorAll.mockReturnValue(mockButtons);

            const clickHandler = jest.fn();

            // Ejecutar
            productView.setupAddToCartButtons(clickHandler);

            // Comprobar
            expect(document.querySelectorAll).toHaveBeenCalledWith(".comprar");
            expect(mockButtons[0].removeEventListener).toHaveBeenCalledWith("click", clickHandler);
            expect(mockButtons[0].addEventListener).toHaveBeenCalledWith("click", clickHandler);
            expect(mockButtons[1].removeEventListener).toHaveBeenCalledWith("click", clickHandler);
            expect(mockButtons[1].addEventListener).toHaveBeenCalledWith("click", clickHandler);
        });
    });

    describe('showFeaturedProducts', () => {
        test('debe mostrar productos destacados limitados a 4', () => {
            // Preparar
            const products = [
                { id_productos: 1, nombre_producto: "Producto 1", precio: 100, imagen_url: "test1.jpg", unidades_disponibles: 10 },
                { id_productos: 2, nombre_producto: "Producto 2", precio: 200, imagen_url: "test2.jpg", unidades_disponibles: 20 },
                { id_productos: 3, nombre_producto: "Producto 3", precio: 300, imagen_url: "test3.jpg", unidades_disponibles: 30 },
                { id_productos: 4, nombre_producto: "Producto 4", precio: 400, imagen_url: "test4.jpg", unidades_disponibles: 40 },
                { id_productos: 5, nombre_producto: "Producto 5", precio: 500, imagen_url: "test5.jpg", unidades_disponibles: 50 }
            ];

            const mockContainer = {
                innerHTML: ''
            };

            document.getElementById.mockImplementation((id) => {
                if (id === "productos-populares") return mockContainer;
                return null;
            });

            // Ejecutar
            productView.showFeaturedProducts(products);

            // Comprobar
            expect(document.getElementById).toHaveBeenCalledWith("productos-populares");
            expect(mockContainer.innerHTML).toContain("Producto 1");
            expect(mockContainer.innerHTML).toContain("Producto 4");
            expect(mockContainer.innerHTML).not.toContain("Producto 5");
        });

        test('no debe hacer nada si no encuentra el contenedor', () => {
            // Preparar
            document.getElementById.mockReturnValue(null);

            // Ejecutar
            productView.showFeaturedProducts([]);

            // Comprobar
            expect(console.error).toHaveBeenCalled();
        });
    });
});