// category.controller.test.js
const categoryController = require('../category.controller');
const categoryModel = require('../../models/category.model');

// Mock del modelo
jest.mock('../../models/category.model', () => ({
    readCategory: jest.fn(),
    createCategory: jest.fn(),
    updateCategory: jest.fn(),
    deleteCategory: jest.fn(),
}));

describe('Category Controller', () => {
    let mockRequest, mockResponse;

    beforeEach(() => {
        // Resetear los mocks antes de cada prueba
        jest.clearAllMocks();

        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    describe('readCategory', () => {
        it('debe retornar un error HTTP tipo 400 si hace falta el id de la categoria', async () => {
            mockRequest.params = {};

            await categoryController.readCategory(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'El ID de la categoría es obligatorio'
            });
        });

        it('debe retornar un error 404 si la categoría no se encuentra', async () => {
            mockRequest.params = { id_categoria: 'ABC' };
            categoryModel.readCategory.mockResolvedValue([[]]); // Simula que no se encontró la categoría

            await categoryController.readCategory(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Categoría no encontrada :('
            });
        });

        it('debe retornar la categoría si fue encontrada', async () => {
            const mockCategory = { id_categoria: 'CAL', nombre_categoria: 'Calzado' };
            mockRequest.params = { id_categoria: 'CAL' };
            categoryModel.readCategory.mockResolvedValue([[mockCategory]]);

            await categoryController.readCategory(mockRequest, mockResponse);

            expect(mockResponse.json).toHaveBeenCalledWith(mockCategory);
        });

        it('debe manejar los errores en el servidor', async () => {
            mockRequest.params = { id_categoria: '1' };
            categoryModel.readCategory.mockRejectedValue(new Error('DB Error'));

            await categoryController.readCategory(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Error interno del servidor'
            });
        });
    });

    describe('createCategory', () => {
        it('debe retornar error 400 si alguno de los campos falta por diligenciar', async () => {
            mockRequest.body = {};

            await categoryController.createCategory(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Todos los campos son obligatorios'
            });
        });

        it('debe crear una categorí y retornar success', async () => {
            mockRequest.body = { id_categoria: 'ABC', nombre_categoria: 'Test' };
            categoryModel.createCategory.mockResolvedValue();

            await categoryController.createCategory(mockRequest, mockResponse);

            expect(categoryModel.createCategory).toHaveBeenCalledWith('ABC', 'Test');
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Categoría creada con éxito'
            });
        });

        it('debe manejar los errores en el servidor', async () => {
            mockRequest.body = { id_categoria: '1', nombre_categoria: 'Test' };
            categoryModel.createCategory.mockRejectedValue(new Error('DB Error'));

            await categoryController.createCategory(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Error interno del servidor'
            });
        });
    });

    describe('updateCategory', () => {
        it('sdebe retornar error 400 si alguno de los campos falta por diligenciar', async () => {
            mockRequest.params = {};
            mockRequest.body = {};

            await categoryController.updateCategory(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Todos los campos son obligatorios'
            });
        });

        it('debe actualizar la categoría y retornar success', async () => {
            mockRequest.params = { id_categoria: 'ABC' };
            mockRequest.body = { nombre_categoria: 'Updated' };
            categoryModel.updateCategory.mockResolvedValue();

            await categoryController.updateCategory(mockRequest, mockResponse);

            expect(categoryModel.updateCategory).toHaveBeenCalledWith('ABC', 'Updated');
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Categoría actualizada con éxito'
            });
        });

        it('debe manejar los errores internos del servidor', async () => {
            mockRequest.params = { id_categoria: '1' };
            mockRequest.body = { nombre_categoria: 'Updated' };
            categoryModel.updateCategory.mockRejectedValue(new Error('DB Error'));

            await categoryController.updateCategory(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Error interno del servidor'
            });
        });
    });

    describe('deleteCategory', () => {
        it('debe retornar error 400 si el id de la categoría falta', async () => {
            mockRequest.params = {};

            await categoryController.deleteCategory(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'El ID de la categoría es obligatorio'
            });
        });

        it('debe borrar la categoría y retornar success', async () => {
            mockRequest.params = { id_categoria: 'ABC' };
            categoryModel.deleteCategory.mockResolvedValue();

            await categoryController.deleteCategory(mockRequest, mockResponse);

            expect(categoryModel.deleteCategory).toHaveBeenCalledWith('ABC');
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Categoría eliminada con éxito'
            });
        });

        it('debe manejar los errores internos del servidor', async () => {
            mockRequest.params = { id_categoria: '1' };
            categoryModel.deleteCategory.mockRejectedValue(new Error('DB Error'));

            await categoryController.deleteCategory(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Error interno del servidor'
            });
        });
    });
});