const deliveryController = require('../delivery.controller');
const deliveryModel = require('../../models/delivery.model');

// Mockear el modelo completo
jest.mock('../../models/delivery.model', () => ({
    readIdDelivery: jest.fn(),
    readUserDelivery: jest.fn(),
    createUserDelivery: jest.fn(),
    updateUserDelivery: jest.fn(),
    deleteUserDelivery: jest.fn(),
}));

describe('Delivery Controller', () => {
    let mockReq, mockRes, mockNext;

    beforeEach(() => {
        // Resetear los mocks antes de cada prueba
        jest.clearAllMocks();

        // Configurar objetos mock de request, response y next
        mockReq = {
            params: {},
            body: {}
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        mockNext = jest.fn();
    });

    describe('readIdDelivery', () => {
        it('debe retornar 400 si no se proporciona id_pedido', async () => {
            mockReq.params = {};
            
            await deliveryController.readIdDelivery(mockReq, mockRes);
            
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'El ID del pedido es obligatorio' });
        });

        it('debe retornar 404 si el pedido no existe', async () => {
            mockReq.params = { id_pedido: '123' };
            deliveryModel.readIdDelivery.mockResolvedValue([[]]);
            
            await deliveryController.readIdDelivery(mockReq, mockRes);
            
            expect(deliveryModel.readIdDelivery).toHaveBeenCalledWith('123');
            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'Pedido con el id del pedido no encontrado :(' });
        });

        it('debe retornar el pedido si existe', async () => {
            const mockPedido = { id_pedido: '123', estado: 'pendiente' };
            mockReq.params = { id_pedido: '123' };
            deliveryModel.readIdDelivery.mockResolvedValue([[mockPedido]]);
            
            await deliveryController.readIdDelivery(mockReq, mockRes);
            
            expect(deliveryModel.readIdDelivery).toHaveBeenCalledWith('123');
            expect(mockRes.json).toHaveBeenCalledWith(mockPedido);
        });

        it('debe manejar errores internos', async () => {
            mockReq.params = { id_pedido: '123' };
            deliveryModel.readIdDelivery.mockRejectedValue(new Error('Error de DB'));
            
            await deliveryController.readIdDelivery(mockReq, mockRes);
            
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'Error interno del servidor' });
        });
    });

    describe('readUserDelivery', () => {
        it('debe retornar 400 si no se proporciona fk_id_usuario', async () => {
            mockReq.params = {};
            
            await deliveryController.readUserDelivery(mockReq, mockRes);
            
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'El ID del usuario es obligatorio' });
        });

        it('debe retornar 404 si no hay pedidos para el usuario', async () => {
            mockReq.params = { fk_id_usuario: '456' };
            deliveryModel.readUserDelivery.mockResolvedValue([[]]);
            
            await deliveryController.readUserDelivery(mockReq, mockRes);
            
            expect(deliveryModel.readUserDelivery).toHaveBeenCalledWith('456');
            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'No hay pedidos asociados a este usuario :(' });
        });

        it('debe retornar los pedidos del usuario si existen', async () => {
            const mockPedidos = [{ id: 1 }, { id: 2 }];
            mockReq.params = { fk_id_usuario: '456' };
            deliveryModel.readUserDelivery.mockResolvedValue([mockPedidos]);
            
            await deliveryController.readUserDelivery(mockReq, mockRes);
            
            expect(deliveryModel.readUserDelivery).toHaveBeenCalledWith('456');
            expect(mockRes.json).toHaveBeenCalledWith(mockPedidos);
        });

        it('debe manejar errores internos', async () => {
            mockReq.params = { fk_id_usuario: '456' };
            deliveryModel.readUserDelivery.mockRejectedValue(new Error('Error de DB'));
            
            await deliveryController.readUserDelivery(mockReq, mockRes);
            
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'Error interno del servidor' });
        });
    });

    describe('createUserDelivery', () => {
        const validBody = {
            fk_id_usuario: '456',
            fk_id_metodo_envio: '1',
            fecha_de_pedido: '2023-01-01',
            fk_id_ciudad: '2',
            direccion: 'Calle 123',
            fk_id_estado_envio: '1',
            subtotal: 100,
            impuesto: 19,
            total: 119,
            vigencia_factura: '2023-12-31'
        };

        it('debe retornar 400 si faltan campos obligatorios', async () => {
            mockReq.body = { ...validBody, fk_id_usuario: undefined };
            
            await deliveryController.createUserDelivery(mockReq, mockRes);
            
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'Todos los campos son obligatorios' });
            expect(deliveryModel.createUserDelivery).not.toHaveBeenCalled();
        });

        it('debe crear el pedido si todos los campos son válidos', async () => {
            mockReq.body = validBody;
            deliveryModel.createUserDelivery.mockResolvedValue([{ affectedRows: 1 }]);
            
            await deliveryController.createUserDelivery(mockReq, mockRes);
            
            expect(deliveryModel.createUserDelivery).toHaveBeenCalledWith(
                '456', '1', '2023-01-01', '2', 'Calle 123', '1', 100, 19, 119, '2023-12-31'
            );
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'Pedido creado con éxito' });
        });

        it('debe manejar errores internos', async () => {
            mockReq.body = validBody;
            deliveryModel.createUserDelivery.mockRejectedValue(new Error('Error de DB'));
            
            await deliveryController.createUserDelivery(mockReq, mockRes);
            
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'Error interno del servidor' });
        });
    });

    describe('updateUserDelivery', () => {
        const validBody = {
            fk_id_metodo_envio: '1',
            fecha_de_pedido: '2023-01-01',
            fk_id_ciudad: '2',
            direccion: 'Calle 123',
            fk_id_estado_envio: '1',
            subtotal: 100,
            impuesto: 19,
            total: 119,
            vigencia_factura: '2023-12-31'
        };

        it('debe retornar 400 si faltan campos obligatorios', async () => {
            mockReq.params = { id_pedido: '123' };
            mockReq.body = { ...validBody, fk_id_metodo_envio: undefined };
            
            await deliveryController.updateUserDelivery(mockReq, mockRes);
            
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'Todos los campos son obligatorios' });
            expect(deliveryModel.updateUserDelivery).not.toHaveBeenCalled();
        });

        it('debe actualizar el pedido si todos los campos son válidos', async () => {
            mockReq.params = { id_pedido: '123' };
            mockReq.body = validBody;
            deliveryModel.updateUserDelivery.mockResolvedValue([{ affectedRows: 1 }]);
            
            await deliveryController.updateUserDelivery(mockReq, mockRes);
            
            expect(deliveryModel.updateUserDelivery).toHaveBeenCalledWith(
                '123', '1', '2023-01-01', '2', 'Calle 123', '1', 100, 19, 119, '2023-12-31'
            );
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'Pedido actualizado con éxito' });
        });

        it('debe manejar errores internos', async () => {
            mockReq.params = { id_pedido: '123' };
            mockReq.body = validBody;
            deliveryModel.updateUserDelivery.mockRejectedValue(new Error('Error de DB'));
            
            await deliveryController.updateUserDelivery(mockReq, mockRes);
            
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'Error interno del servidor' });
        });
    });

    describe('deleteUserDelivery', () => {
        it('debe retornar 400 si no se proporciona id_pedido', async () => {
            mockReq.params = {};
            
            await deliveryController.deleteUserDelivery(mockReq, mockRes);
            
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'El ID del pedido es obligatorio' });
            expect(deliveryModel.deleteUserDelivery).not.toHaveBeenCalled();
        });

        it('debe eliminar el pedido si el ID es válido', async () => {
            mockReq.params = { id_pedido: '123' };
            deliveryModel.deleteUserDelivery.mockResolvedValue([{ affectedRows: 1 }]);
            
            await deliveryController.deleteUserDelivery(mockReq, mockRes);
            
            expect(deliveryModel.deleteUserDelivery).toHaveBeenCalledWith('123');
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'Pedido eliminado con éxito' });
        });

        it('debe manejar errores internos', async () => {
            mockReq.params = { id_pedido: '123' };
            deliveryModel.deleteUserDelivery.mockRejectedValue(new Error('Error de DB'));
            
            await deliveryController.deleteUserDelivery(mockReq, mockRes);
            
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'Error interno del servidor' });
        });
    });
});