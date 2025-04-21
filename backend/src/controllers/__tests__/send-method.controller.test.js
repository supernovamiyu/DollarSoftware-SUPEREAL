const {
    readSendMethod,
    createSendMethod,
    updateSendMethod,
    deleteSendMethod
} = require('../send-method.controller')
const sendMethodModel = require('../../models/send-method.model');

// Mockear el modelo completo
jest.mock('../../models/send-method.model', () => ({
    readSendMethod: jest.fn(),
    createSendMethod: jest.fn(),
    updateSendMethod: jest.fn(),
    deleteSendMethod: jest.fn(),
}));

describe('Send Method Controller', () => {
    let mockRequest;
    let mockResponse;
    let mockNext;

    beforeEach(() => {
        // Configurar mocks para request y response
        mockRequest = {
            params: {},
            body: {}
        };

        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        mockNext = jest.fn();

        // Limpiar todos los mocks antes de cada prueba
        jest.clearAllMocks();
    });

    // Pruebas para readSendMethod
    describe('readSendMethod', () => {
        it('debería devolver 400 si no se proporciona id_metodo_envio', async () => {
            await readSendMethod(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'El ID del método de envío es obligatorio'
            });
        });

        it('debería devolver el método de envío si existe', async () => {
            const mockResult = [{ id_metodo_envio: 1, nombre_m_envio: 'Estándar' }];
            sendMethodModel.readSendMethod.mockResolvedValueOnce([mockResult]);

            mockRequest.params.id_metodo_envio = '1';
            await readSendMethod(mockRequest, mockResponse);

            expect(sendMethodModel.readSendMethod).toHaveBeenCalledWith('1');
            expect(mockResponse.json).toHaveBeenCalledWith(mockResult[0]);
        });

        it('debería devolver mensaje de no encontrado si el método no existe', async () => {
            sendMethodModel.readSendMethod.mockResolvedValueOnce([[]]);

            mockRequest.params.id_metodo_envio = '999';
            await readSendMethod(mockRequest, mockResponse);

            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Método de envío no encontrado :('
            });
        });

        it('debería manejar errores internos', async () => {
            sendMethodModel.readSendMethod.mockRejectedValueOnce(new Error('Error de DB'));

            mockRequest.params.id_metodo_envio = '1';
            await readSendMethod(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Error interno del servidor'
            });
        });
    });

    // Pruebas para createSendMethod
    describe('createSendMethod', () => {
        it('debería devolver 400 si faltan campos obligatorios', async () => {
            // Caso 1: Falta id_metodo_envio
            mockRequest.body = { nombre_m_envio: 'Express' };
            await createSendMethod(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(400);

            // Caso 2: Falta nombre_m_envio
            mockRequest.body = { id_metodo_envio: 2 };
            await createSendMethod(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(400);

            // Caso 3: Faltan ambos
            mockRequest.body = {};
            await createSendMethod(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(400);
        });

        it('debería crear el método de envío exitosamente', async () => {
            mockRequest.body = {
                id_metodo_envio: 2,
                nombre_m_envio: 'Express'
            };

            await createSendMethod(mockRequest, mockResponse);

            expect(sendMethodModel.createSendMethod).toHaveBeenCalled();
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Método de envío creado con éxito'
            });
        });

        it('debería manejar errores internos', async () => {
            sendMethodModel.createSendMethod.mockRejectedValueOnce(new Error('Error de DB'));

            mockRequest.body = {
                id_metodo_envio: 2,
                nombre_m_envio: 'Express'
            };
            await createSendMethod(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
        });
    });

    // Pruebas para updateSendMethod
    describe('updateSendMethod', () => {
        it('debería devolver 400 si faltan campos obligatorios', async () => {
            // Caso 1: Falta id_metodo_envio en params
            mockRequest.params = {};
            mockRequest.body = { nombre_m_envio: 'Express Plus' };
            await updateSendMethod(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(400);

            // Caso 2: Falta nombre_m_envio en body
            mockRequest.params = { id_metodo_envio: 1 };
            mockRequest.body = {};
            await updateSendMethod(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(400);
        });

        it('debería actualizar el método de envío exitosamente', async () => {
            mockRequest.params = { id_metodo_envio: 1 };
            mockRequest.body = { nombre_m_envio: 'Express Plus' };

            await updateSendMethod(mockRequest, mockResponse);

            expect(sendMethodModel.updateSendMethod).toHaveBeenCalledWith(1, 'Express Plus');
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Método de envío actualizado con éxito'
            });
        });

        it('debería manejar errores internos', async () => {
            sendMethodModel.updateSendMethod.mockRejectedValueOnce(new Error('Error de DB'));

            mockRequest.params = { id_metodo_envio: 1 };
            mockRequest.body = { nombre_m_envio: 'Express Plus' };
            await updateSendMethod(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
        });
    });

    // Pruebas para deleteSendMethod
    describe('deleteSendMethod', () => {
        it('debería devolver 400 si no se proporciona id_metodo_envio', async () => {
            await deleteSendMethod(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'El ID del método de envío es obligatorio'
            });
        });

        it('debería eliminar el método de envío exitosamente', async () => {
            mockRequest.params = { id_metodo_envio: 1 };

            await deleteSendMethod(mockRequest, mockResponse);

            expect(sendMethodModel.deleteSendMethod).toHaveBeenCalledWith(1);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Método de envío eliminado con éxito'
            });
        });

        it('debería manejar errores internos', async () => {
            sendMethodModel.deleteSendMethod.mockRejectedValueOnce(new Error('Error de DB'));

            mockRequest.params = { id_metodo_envio: 1 };
            await deleteSendMethod(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
        });
    });
});