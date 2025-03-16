// Importar el modelo de estado de pedido
const deliveryStateModel = require('../models/delivery-state.model');

///////////////// C ****** R ****** U ****** D /////////////////

// Buscar un estado de pedido en la base de datos
const readDeliveryState = async (req, res) => {
    try {
        const { id_estado_envio } = req.params;

        // Validar que el ID del estado de pedido esté presente
        if (!id_estado_envio) {
            return res.status(400).json({ message: 'El ID del estado de pedido es obligatorio' });
        }

        // Llamar al modelo para obtener el estado de pedido
        const [result] = await deliveryStateModel.readDeliveryState(id_estado_envio);

        // Verificar si se encontró el estado de pedido
        if (result[0]) {
            res.json(result[0]);
        } else {
            res.status(404).json({ message: 'Estado de envío no encontrado :(' });
        }
    } catch (err) {
        console.error('Error en readDeliveryState:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Crear un estado de pedido en la base de datos
const createDeliveryState = async (req, res) => {
    try {
        const { id_estado_envio, denominacion } = req.body;

        // Validar que los campos obligatorios estén presentes
        if (!id_estado_envio || !denominacion) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Llamar al modelo para crear el estado de pedido
        await deliveryStateModel.createDeliveryState(id_estado_envio, denominacion);

        // Enviar respuesta de éxito
        res.json({ message: 'Estado de envío creado con éxito' });
    } catch (err) {
        console.error('Error en createDeliveryState:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Actualizar un estado de pedido en la base de datos
const updateDeliveryState = async (req, res) => {
    try {
        const { id_estado_envio } = req.params;
        const { denominacion } = req.body;

        // Validar que los campos obligatorios estén presentes
        if (!id_estado_envio || !denominacion) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Llamar al modelo para actualizar el estado de pedido
        await deliveryStateModel.updateDeliveryState(id_estado_envio, denominacion);

        // Enviar respuesta de éxito
        res.json({ message: 'Estado de envío actualizado con éxito' });
    } catch (err) {
        console.error('Error en updateDeliveryState:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Eliminar un estado de pedido en la base de datos
const deleteDeliveryState = async (req, res) => {
    try {
        const { id_estado_envio } = req.params;

        // Validar que el ID del estado de pedido esté presente
        if (!id_estado_envio) {
            return res.status(400).json({ message: 'El ID del estado de pedido es obligatorio' });
        }

        // Llamar al modelo para eliminar el estado de pedido
        await deliveryStateModel.deleteDeliveryState(id_estado_envio);

        // Enviar respuesta de éxito
        res.json({ message: 'Estado de envío eliminado con éxito' });
    } catch (err) {
        console.error('Error en deleteDeliveryState:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Exportar las funciones para usarlas en otros archivos
module.exports = {
    readDeliveryState,
    createDeliveryState,
    updateDeliveryState,
    deleteDeliveryState,
};