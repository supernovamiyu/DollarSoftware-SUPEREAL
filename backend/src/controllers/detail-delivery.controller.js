// Importar el modelo de detalle de pedido
const detailDeliveryModel = require('../models/detail-delivery.model');

///////////////// C ****** R ****** U ****** D /////////////////

// Buscar el detalle de un pedido en la base de datos
const readDeliveryDetails = async (req, res) => {
    try {
        const { fk_id_pedido } = req.params;

        // Validar que el ID del detalle del pedido esté presente
        if (!fk_id_pedido) {
            return res.status(400).json({ message: 'El ID del detalle del pedido es obligatorio' });
        }

        // Llamar al modelo para obtener el detalle del pedido
        const [result] = await detailDeliveryModel.readDeliveryDetails(fk_id_pedido);

        // Verificar si se encontró el detalle del pedido
        if (result && result.length > 0) {
            res.json(result);
        } else {
            res.status(404).json({ message: 'Detalle del pedido no encontrado :(. Por favor verifica el id del pedido en la base de datos' });
        }
    } catch (err) {
        console.error('Error en readDeliveryDetails:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Crear el detalle de un pedido en la base de datos
const createDeliveryDetails = async (req, res) => {
    try {
        const { fk_id_producto, cantidad, precio_unitario } = req.body;

        // Validar que los campos obligatorios estén presentes
        if (!fk_id_producto || !cantidad || !precio_unitario) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Llamar al modelo para crear el detalle del pedido
        await detailDeliveryModel.createDeliveryDetails(fk_id_producto, cantidad, precio_unitario);

        // Enviar respuesta de éxito
        res.json({ message: 'Detalle del pedido asignado con éxito' });
    } catch (err) {
        console.error('Error en createDeliveryDetails:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Actualizar el detalle de un pedido en la base de datos
const updateDeliveryDetails = async (req, res) => {
    try {
        const { fk_id_pedido } = req.params;
        const { cantidad, precio_unitario, precio_total } = req.body;

        // Validar que los campos obligatorios estén presentes
        if (!cantidad || !precio_unitario || !precio_total) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Llamar al modelo para actualizar el detalle del pedido
        await detailDeliveryModel.updateDeliveryDetails(fk_id_pedido, cantidad, precio_unitario, precio_total);

        // Enviar respuesta de éxito
        res.json({ message: 'Detalle del pedido actualizado con éxito' });
    } catch (err) {
        console.error('Error en updateDeliveryDetails:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Eliminar el detalle de un pedido en la base de datos
const deleteDeliveryDetails = async (req, res) => {
    try {
        const { fk_id_pedido } = req.params;

        // Validar que el ID del detalle del pedido esté presente
        if (!fk_id_pedido) {
            return res.status(400).json({ message: 'El ID del detalle del pedido es obligatorio' });
        }

        // Llamar al modelo para eliminar el detalle del pedido
        await detailDeliveryModel.deleteDeliveryDetails(fk_id_pedido);

        // Enviar respuesta de éxito
        res.json({ message: 'Detalle del pedido eliminado con éxito' });
    } catch (err) {
        console.error('Error en deleteDeliveryDetails:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Exportar las funciones para usarlas en otros archivos
module.exports = {
    readDeliveryDetails,
    createDeliveryDetails,
    updateDeliveryDetails,
    deleteDeliveryDetails,
};