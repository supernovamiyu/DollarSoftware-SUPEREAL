const cityController = require('../city.controller'); // Ajusta la ruta según tu estructura
const cityModel = require('../../models/city.model'); // Ajusta la ruta según tu estructura

// Mock del modelo
jest.mock('../../models/city.model', () => ({
    readCity: jest.fn(),
    createCity: jest.fn(),
    updateCity: jest.fn(),
    deleteCity: jest.fn(),
}));

describe('City Controller', () => {
    let mockReq, mockRes, mockNext;

    beforeEach(() => {
        // Configuración inicial para cada test
        mockReq = {
            params: {},
            body: {}
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();

        // Limpiar todos los mocks antes de cada test
        jest.clearAllMocks();
    });

    //////////////////////// readCity Tests ////////////////////////
    describe('readCity', () => {
        it('debe retornar error 400 si el id de la ciudad falta', async () => {
            await cityController.readCity(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'El ID de la ciudad es obligatorio'
            });
        });

        it('debe retornar error 404 si la ciudad no existe', async () => {
            mockReq.params.id_ciudad = '1';
            cityModel.readCity.mockResolvedValue([[]]); // Simula que no se encontró la ciudad

            await cityController.readCity(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Ciudad no encontrada :('
            });
        });

        it('debe retornar la ciudad si es encontrada', async () => {
            const mockCity = { id_ciudad: '1', nombre_ciudad: 'Madrid' };
            mockReq.params.id_ciudad = '1';
            cityModel.readCity.mockResolvedValue([[mockCity]]);

            await cityController.readCity(mockReq, mockRes);

            expect(mockRes.json).toHaveBeenCalledWith(mockCity);
        });

        it('debe manejar los errores internos del servidor', async () => {
            mockReq.params.id_ciudad = '1';
            cityModel.readCity.mockRejectedValue(new Error('DB Error'));

            await cityController.readCity(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Error interno del servidor'
            });
        });
    });

    //////////////////////// createCity Tests ////////////////////////
    describe('createCity', () => {
        it('debe retornar error 400 si algun campo falta', async () => {
            await cityController.createCity(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Todos los campos son obligatorios'
            });
        });

        it('debe crear una ciudad y mostrar un mensaje de éxito', async () => {
            mockReq.body = { id_ciudad: '1', nombre_ciudad: 'Barcelona' };
            cityModel.createCity.mockResolvedValue();

            await cityController.createCity(mockReq, mockRes);

            expect(cityModel.createCity).toHaveBeenCalledWith('1', 'Barcelona');
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Ciudad creada con éxito'
            });
        });

        it('debe manejar los errores internos del servidor', async () => {
            mockReq.body = { id_ciudad: '1', nombre_ciudad: 'Barcelona' };
            cityModel.createCity.mockRejectedValue(new Error('DB Error'));

            await cityController.createCity(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Error interno del servidor'
            });
        });
    });

    //////////////////////// updateCity Tests ////////////////////////
    describe('updateCity', () => {
        it('debe retornar error 400 si alguno de los campos falta', async () => {
            await cityController.updateCity(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Todos los campos son obligatorios'
            });
        });

        it('debe actualizar la ciudad y retornar un mensaje de éxito', async () => {
            mockReq.params.id_ciudad = '1';
            mockReq.body = { nombre_ciudad: 'Valencia' };
            cityModel.updateCity.mockResolvedValue();

            await cityController.updateCity(mockReq, mockRes);

            expect(cityModel.updateCity).toHaveBeenCalledWith('1', 'Valencia');
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Ciudad actualizada con éxito'
            });
        });

        it('debe manejar los errores internos del servidor', async () => {
            mockReq.params.id_ciudad = '1';
            mockReq.body = { nombre_ciudad: 'Valencia' };
            cityModel.updateCity.mockRejectedValue(new Error('DB Error'));

            await cityController.updateCity(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Error interno del servidor'
            });
        });
    });

    //////////////////////// deleteCity Tests ////////////////////////
    describe('deleteCity', () => {
        it('debe retornar error 400 si el id de la ciudad falta', async () => {
            await cityController.deleteCity(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'El ID de la ciudad es obligatorio'
            });
        });

        it('debe borrar una ciudad y retornar un mensaje de éxito', async () => {
            mockReq.params.id_ciudad = '1';
            cityModel.deleteCity.mockResolvedValue();

            await cityController.deleteCity(mockReq, mockRes);

            expect(cityModel.deleteCity).toHaveBeenCalledWith('1');
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Ciudad eliminada con éxito'
            });
        });

        it('debe manejar los errores internos del servidor', async () => {
            mockReq.params.id_ciudad = '1';
            cityModel.deleteCity.mockRejectedValue(new Error('DB Error'));

            await cityController.deleteCity(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Error interno del servidor'
            });
        });
    });
});