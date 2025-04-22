const {
    readCategory,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../category.model');

const database = require('../../config/database');

// Mock de la conexión a la base de datos
jest.mock('../../config/database', () => ({
    promise: jest.fn().mockReturnThis(),
    query: jest.fn()
}));


describe('Operaciones CRUD para las Categorías', () => {
    beforeEach(() => {
        // Limpiar todos los mocks antes de cada prueba
        jest.clearAllMocks();
    });

    describe('readCategory', () => {
        it('el resultado debe ser una categoría por ID', async () => {
            const mockCategory = { id_categoria: 1, nombre_categoria: 'Electrónicos' };
            database.promise().query.mockResolvedValueOnce([[mockCategory]]);

            const result = await readCategory(1);

            expect(database.promise().query).toHaveBeenCalledWith(
                'SELECT * FROM categorias WHERE id_categoria = 1;'
            );
            expect(result).toEqual([[mockCategory]]);
        });

        it('manejar errores en la BD', async () => {
            database.promise().query.mockRejectedValueOnce(new Error('Error en la BD'));

            await expect(readCategory(1)).rejects.toThrow('Error en la BD');
        });
    });

    describe('createCategory', () => {
        it('debe crear una nueva categoría', async () => {
            const mockResult = { affectedRows: 1 };
            database.promise().query.mockResolvedValueOnce([mockResult]);

            const result = await createCategory(2, 'Ropa');

            expect(database.promise().query).toHaveBeenCalledWith(
                'INSERT INTO categorias (id_categoria, nombre_categoria) VALUES (2, \'Ropa\');'
            );
            expect(result).toEqual([mockResult]);
        });

        it('manejar errores de la creación de categorías', async () => {
            database.promise().query.mockRejectedValueOnce(new Error('Fallo en la creación'));

            await expect(createCategory(2, 'Ropa')).rejects.toThrow('Fallo en la creación');
        });
    });

    describe('updateCategory', () => {
        it('debe actualizar una categoría existente', async () => {
            const mockResult = { affectedRows: 1 };
            database.promise().query.mockResolvedValueOnce([mockResult]);

            const result = await updateCategory(1, 'Electrodomésticos');

            expect(database.promise().query).toHaveBeenCalledWith(
                'UPDATE categorias SET nombre_categoria = \'Electrodomésticos\' WHERE id_categoria = 1;'
            );
            expect(result).toEqual([mockResult]);
        });

        it('manejar errores en la actualización', async () => {
            database.promise().query.mockRejectedValueOnce(new Error('Fallo en la actualización'));

            await expect(updateCategory(1, 'Electrodomésticos')).rejects.toThrow('Fallo en la actualización');
        });
    });

    describe('deleteCategory', () => {
        it('debe eliminar una categoría', async () => {
            const mockResult = { affectedRows: 1 };
            database.promise().query.mockResolvedValueOnce([mockResult]);

            const result = await deleteCategory(1);

            expect(database.promise().query).toHaveBeenCalledWith(
                'DELETE FROM categorias WHERE id_categoria = 1;'
            );
            expect(result).toEqual([mockResult]);
        });

        it('manejar errores en la eliminación', async () => {
            database.promise().query.mockRejectedValueOnce(new Error('Fallo en la eliminación'));

            await expect(deleteCategory(1)).rejects.toThrow('Fallo en la eliminación');
        });
    });
});