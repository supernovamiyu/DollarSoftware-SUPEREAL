const detailDeliveryController = require('../detail-delivery.controller');
const detailDeliveryModel = require('../../models/detail-delivery.model');

// Mockear el modelo completo
jest.mock('../../models/detail-delivery.model', () => ({
    readDeliveryDetails: jest.fn(),
    createDeliveryDetails: jest.fn(),
    updateDeliveryDetails: jest.fn(),
    deleteDeliveryDetails: jest.fn(),
}));

describe('Detail Delivery Controller', () => {
    let mockReq, mockRes;

    beforeEach(() => {
        mockReq = {
            params: {},
            body: {}
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('readDeliveryDetails', () => {
        it('debe retornar error 400 si fk_id_pedido falta', async () => {
            await detailDeliveryController.readDeliveryDetails(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'El ID del detalle del pedido es obligatorio'
            });
        });

        it('debe retornar error 404 si el detalle del pedido no se encuentra', async () => {
            mockReq.params.fk_id_pedido = '123';
            detailDeliveryModel.readDeliveryDetails.mockResolvedValue([[]]);

            await detailDeliveryController.readDeliveryDetails(mockReq, mockRes);

            expect(detailDeliveryModel.readDeliveryDetails).toHaveBeenCalledWith('123');
            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Detalle del pedido no encontrado :(. Por favor verifica el id del pedido en la base de datos'
            });
        });

        it('debe retornar el detalle del pedido si se encuentra', async () => {
            const mockDetail = [{ id: 1, fk_id_pedido: '123' }];
            mockReq.params.fk_id_pedido = '123';
            detailDeliveryModel.readDeliveryDetails.mockResolvedValue([mockDetail]);

            await detailDeliveryController.readDeliveryDetails(mockReq, mockRes);

            expect(detailDeliveryModel.readDeliveryDetails).toHaveBeenCalledWith('123');
            expect(mockRes.json).toHaveBeenCalledWith(mockDetail);
        });

        it('debe retornar error interno en el servidor', async () => {
            mockReq.params.fk_id_pedido = '123';
            detailDeliveryModel.readDeliveryDetails.mockRejectedValue(new Error('DB Error'));

            await detailDeliveryController.readDeliveryDetails(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Error interno del servidor'
            });
        });
    });

    describe('createDeliveryDetails', () => {
        it('debe retornar error 400 si un campo falta', async () => {
            mockReq.body = { fk_id_producto: '1', cantidad: 2 }; // Missing precio_unitario

            await detailDeliveryController.createDeliveryDetails(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Todos los campos son obligatorios'
            });
        });

        it('debe crear el detalle del pedido y mostrar un mensaje de éxito', async () => {
            mockReq.body = {
                fk_id_producto: '1',
                cantidad: 2,
                precio_unitario: 10.5
            };
            detailDeliveryModel.createDeliveryDetails.mockResolvedValue();

            await detailDeliveryController.createDeliveryDetails(mockReq, mockRes);

            expect(detailDeliveryModel.createDeliveryDetails).toHaveBeenCalledWith('1', 2, 10.5);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Detalle del pedido asignado con éxito'
            });
        });

        it('debe retornar error interno en el servidor', async () => {
            mockReq.body = {
                fk_id_producto: '1',
                cantidad: 2,
                precio_unitario: 10.5
            };
            detailDeliveryModel.createDeliveryDetails.mockRejectedValue(new Error('DB Error'));

            await detailDeliveryController.createDeliveryDetails(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Error interno del servidor'
            });
        });
    });

    describe('updateDeliveryDetails', () => {
        it('debe retornar error 400 si algún campo hace falta', async () => {
            mockReq.params.fk_id_pedido = '123';
            mockReq.body = { cantidad: 2, precio_unitario: 10.5 }; // Missing precio_total

            await detailDeliveryController.updateDeliveryDetails(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Todos los campos son obligatorios'
            });
        });

        it('debe actualizar el detalle del pedido y mostrar un mensaje de éxito', async () => {
            mockReq.params.fk_id_pedido = '123';
            mockReq.body = {
                cantidad: 3,
                precio_unitario: 11.5,
                precio_total: 34.5
            };
            detailDeliveryModel.updateDeliveryDetails.mockResolvedValue();

            await detailDeliveryController.updateDeliveryDetails(mockReq, mockRes);

            expect(detailDeliveryModel.updateDeliveryDetails).toHaveBeenCalledWith('123', 3, 11.5, 34.5);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Detalle del pedido actualizado con éxito'
            });
        });

        it('debe retornar error interno en el servidor', async () => {
            mockReq.params.fk_id_pedido = '123';
            mockReq.body = {
                cantidad: 3,
                precio_unitario: 11.5,
                precio_total: 34.5
            };
            detailDeliveryModel.updateDeliveryDetails.mockRejectedValue(new Error('DB Error'));

            await detailDeliveryController.updateDeliveryDetails(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Error interno del servidor'
            });
        });
    });

    describe('deleteDeliveryDetails', () => {
        it('retornar error 400 si fk_id_pedido falta', async () => {
            await detailDeliveryController.deleteDeliveryDetails(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'El ID del detalle del pedido es obligatorio'
            });
        });

        it('debe borrar el detalle del pedido y mostrar mensaje de éxito', async () => {
            mockReq.params.fk_id_pedido = '123';
            detailDeliveryModel.deleteDeliveryDetails.mockResolvedValue();

            await detailDeliveryController.deleteDeliveryDetails(mockReq, mockRes);

            expect(detailDeliveryModel.deleteDeliveryDetails).toHaveBeenCalledWith('123');
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Detalle del pedido eliminado con éxito'
            });
        });

        it('debe retornar error interno en el servidor', async () => {
            mockReq.params.fk_id_pedido = '123';
            detailDeliveryModel.deleteDeliveryDetails.mockRejectedValue(new Error('DB Error'));

            await detailDeliveryController.deleteDeliveryDetails(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Error interno del servidor'
            });
        });
    });
});