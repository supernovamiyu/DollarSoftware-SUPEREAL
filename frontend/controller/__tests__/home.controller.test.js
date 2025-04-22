// HomeController.test.js
import HomeController from '../home.controller'

describe('HomeController', () => {
    // Mock de las dependencias
    let mockView, mockProductController, homeController

    beforeEach(() => {
        // Crear mocks para las dependencias
        mockView = {
            showHomePage: jest.fn(),
            initCarousel: jest.fn(),
            setupCategoryButtons: jest.fn()
        }

        mockProductController = {
            showFeaturedProducts: jest.fn(),
            showProductsByCategory: jest.fn()
        }

        // Instanciar el controlador con los mocks
        homeController = new HomeController(mockView, mockProductController)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('Constructor', () => {
        test('debería inicializar correctamente con las dependencias inyectadas', () => {
            expect(homeController.view).toBe(mockView)
            expect(homeController.productController).toBe(mockProductController)
        })
    })

    describe('showHomePage()', () => {
        test('debería llamar a los métodos correctos de la vista y controlador', () => {
            homeController.showHomePage()

            // Verificar que se llamó a los métodos de la vista
            expect(mockView.showHomePage).toHaveBeenCalledTimes(1)
            expect(mockView.initCarousel).toHaveBeenCalledTimes(1)

            // Verificar que se configuraron los botones de categoría
            expect(mockView.setupCategoryButtons).toHaveBeenCalledTimes(1)
            expect(typeof mockView.setupCategoryButtons.mock.calls[0][0]).toBe('function')

            // Verificar que se mostraron los productos destacados
            expect(mockProductController.showFeaturedProducts).toHaveBeenCalledTimes(1)
        })
    })

    describe('setupCategoryButtons()', () => {
        test('debería configurar los botones de categoría correctamente', () => {
            // Simular el setup de botones
            homeController.setupCategoryButtons()

            // Obtener el callback que se pasa a setupCategoryButtons
            const callback = mockView.setupCategoryButtons.mock.calls[0][0]

            // Crear un evento simulado
            const mockEvent = {
                target: {
                    closest: jest.fn().mockReturnValue({
                        getAttribute: jest.fn().mockReturnValue('123')
                    })
                }
            }

            // Ejecutar el callback con el evento simulado
            callback(mockEvent)

            // Verificar que se llamó al método correcto del controlador de productos
            expect(mockProductController.showProductsByCategory).toHaveBeenCalledWith('123')
        })

        test('no debería hacer nada si no se encuentra el atributo data-categoria', () => {
            homeController.setupCategoryButtons()
            const callback = mockView.setupCategoryButtons.mock.calls[0][0]

            // Simular que no se encuentra el atributo
            const mockEvent = {
                target: {
                    closest: jest.fn().mockReturnValue({
                        getAttribute: jest.fn().mockReturnValue(null)
                    })
                }
            }

            callback(mockEvent)

            expect(mockProductController.showProductsByCategory).not.toHaveBeenCalled()
        })

        test('no debería hacer nada si el elemento más cercano no es un botón', () => {
            homeController.setupCategoryButtons()
            const callback = mockView.setupCategoryButtons.mock.calls[0][0]

            // Simular que no se encuentra un elemento button cercano
            const mockEvent = {
                target: {
                    closest: jest.fn().mockReturnValue(null)
                }
            }

            callback(mockEvent)

            expect(mockProductController.showProductsByCategory).not.toHaveBeenCalled()
        })
    })
})