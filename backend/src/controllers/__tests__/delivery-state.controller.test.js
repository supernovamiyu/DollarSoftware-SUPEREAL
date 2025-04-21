const deliveryStateController = require('../delivery-state.controller');
const deliveryStateModel = require('../../models/delivery-state.model');

// Mock del modelo
jest.mock('../../models/delivery-state.model', () => ({
    readDeliveryState: jest.fn(),
    createDeliveryState: jest.fn(),
    updateDeliveryState: jest.fn(),
    deleteDeliveryState: jest.fn(),
}));

describe('DeliveryState Controller', () => {
    let mockReq, mockRes, mockNext;

    beforeEach(() => {
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

    // Pruebas para readDeliveryState
    describe('readDeliveryState', () => {
        it('debería devolver 400 si no se proporciona id_estado_envio', async () => {
            await deliveryStateController.readDeliveryState(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'El ID del estado de pedido es obligatorio'
            });
        });

        it('debería devolver 404 si el estado no existe', async () => {
            mockReq.params.id_estado_envio = '1';
            deliveryStateModel.readDeliveryState.mockResolvedValue([[]]);

            await deliveryStateController.readDeliveryState(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Estado de envío no encontrado :('
            });
        });

        it('debería devolver el estado si existe', async () => {
            const mockState = { id_estado_envio: '1', denominacion: 'En camino' };
            mockReq.params.id_estado_envio = '1';
            deliveryStateModel.readDeliveryState.mockResolvedValue([[mockState]]);

            await deliveryStateController.readDeliveryState(mockReq, mockRes);

            expect(mockRes.json).toHaveBeenCalledWith(mockState);
        });

        it('debería devolver 500 si hay un error en el modelo', async () => {
            mockReq.params.id_estado_envio = '1';
            deliveryStateModel.readDeliveryState.mockRejectedValue(new Error('DB Error'));

            await deliveryStateController.readDeliveryState(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Error interno del servidor'
            });
        });
    });

    // Pruebas para createDeliveryState
    describe('createDeliveryState', () => {
        it('debería devolver 400 si faltan campos obligatorios', async () => {
            await deliveryStateController.createDeliveryState(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Todos los campos son obligatorios'
            });
        });

        it('debería crear el estado y devolver mensaje de éxito', async () => {
            mockReq.body = {
                id_estado_envio: '1',
                denominacion: 'Nuevo estado'
            };

            await deliveryStateController.createDeliveryState(mockReq, mockRes);

            expect(deliveryStateModel.createDeliveryState).toHaveBeenCalledWith('1', 'Nuevo estado');
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Estado de envío creado con éxito'
            });
        });

        it('debería devolver 500 si hay un error en el modelo', async () => {
            mockReq.body = {
                id_estado_envio: '1',
                denominacion: 'Nuevo estado'
            };
            deliveryStateModel.createDeliveryState.mockRejectedValue(new Error('DB Error'));

            await deliveryStateController.createDeliveryState(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Error interno del servidor'
            });
        });
    });

    // Pruebas para updateDeliveryState
    describe('updateDeliveryState', () => {
        it('debería devolver 400 si faltan campos obligatorios', async () => {
            await deliveryStateController.updateDeliveryState(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Todos los campos son obligatorios'
            });
        });

        it('debería actualizar el estado y devolver mensaje de éxito', async () => {
            mockReq.params.id_estado_envio = '1';
            mockReq.body.denominacion = 'Estado actualizado';

            await deliveryStateController.updateDeliveryState(mockReq, mockRes);

            expect(deliveryStateModel.updateDeliveryState).toHaveBeenCalledWith('1', 'Estado actualizado');
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Estado de envío actualizado con éxito'
            });
        });

        it('debería devolver 500 si hay un error en el modelo', async () => {
            mockReq.params.id_estado_envio = '1';
            mockReq.body.denominacion = 'Estado actualizado';
            deliveryStateModel.updateDeliveryState.mockRejectedValue(new Error('DB Error'));

            await deliveryStateController.updateDeliveryState(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Error interno del servidor'
            });
        });
    });

    // Pruebas para deleteDeliveryState
    describe('deleteDeliveryState', () => {
        it('debería devolver 400 si no se proporciona id_estado_envio', async () => {
            await deliveryStateController.deleteDeliveryState(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'El ID del estado de pedido es obligatorio'
            });
        });

        it('debería eliminar el estado y devolver mensaje de éxito', async () => {
            mockReq.params.id_estado_envio = '1';

            await deliveryStateController.deleteDeliveryState(mockReq, mockRes);

            expect(deliveryStateModel.deleteDeliveryState).toHaveBeenCalledWith('1');
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Estado de envío eliminado con éxito'
            });
        });

        it('debería devolver 500 si hay un error en el modelo', async () => {
            mockReq.params.id_estado_envio = '1';
            deliveryStateModel.deleteDeliveryState.mockRejectedValue(new Error('DB Error'));

            await deliveryStateController.deleteDeliveryState(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Error interno del servidor'
            });
        });
    });
});