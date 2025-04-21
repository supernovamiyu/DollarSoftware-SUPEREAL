const controller = require('../opinions.controller');

// Mockear el modelo completo
jest.mock('../../models/opinions.model', () => ({
    readOpinionProduct: jest.fn(),
    createOpinionProduct: jest.fn(),
    updateOpinionProduct: jest.fn(),
    deleteOpinionProduct: jest.fn(),
}));

const opinionsModel = require('../../models/opinions.model');

describe('Opinions Controller', () => {
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

        jest.clearAllMocks();
    });

    describe('readOpinionProduct', () => {
        it('debería devolver 400 si falta el ID del producto', async () => {
            await controller.readOpinionProduct(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'El ID del producto es obligatorio'
            });
        });

        it('debería devolver la opinión si se encuentra', async () => {
            const mockOpinion = [{ id: 1, opinion: 'Excelente producto' }];
            mockReq.params.fk_id_productos = '1';
            opinionsModel.readOpinionProduct.mockResolvedValue([mockOpinion]);

            await controller.readOpinionProduct(mockReq, mockRes);

            expect(opinionsModel.readOpinionProduct).toHaveBeenCalledWith('1');
            expect(mockRes.json).toHaveBeenCalledWith(mockOpinion);
        });
    });

    describe('createOpinionProduct', () => {
        it('debería crear la opinión correctamente', async () => {
            mockReq.body = {
                es_anonimo: true,
                opinion: 'Muy buen producto',
                fk_id_productos: 1
            };

            await controller.createOpinionProduct(mockReq, mockRes);

            expect(opinionsModel.createOpinionProduct).toHaveBeenCalledWith(
                true, 'Muy buen producto', 1
            );
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Opinión del producto creada exitosamente'
            });
        });
    });

    describe('updateOpinionProduct', () => {
        it('debería actualizar la opinión correctamente', async () => {
            mockReq.params = { id_opinion: '1' };
            mockReq.body = {
                es_anonimo: true,
                opinion: 'Producto actualizado',
                fk_id_productos: 1
            };

            await controller.updateOpinionProduct(mockReq, mockRes);

            expect(opinionsModel.updateOpinionProduct).toHaveBeenCalledWith(
                '1', true, 'Producto actualizado', 1
            );
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Opinión del producto actualizada exitosamente'
            });
        });
    });

    describe('deleteOpinionProduct', () => {
        it('debería eliminar la opinión correctamente', async () => {
            mockReq.params = { id_opinion: '1', fk_id_productos: '1' };

            await controller.deleteOpinionProduct(mockReq, mockRes);

            expect(opinionsModel.deleteOpinionProduct).toHaveBeenCalledWith('1');
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Opinión del producto eliminada exitosamente'
            });
        });
    });
});