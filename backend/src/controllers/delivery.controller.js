// Importar el modelo de pedidos
const deliveryModel = require('../models/delivery.model');

///////////////// C ****** R ****** U ****** D /////////////////

// Buscar un pedido en la base de datos
const readUserDelivery = async (req, res) => {
    try {
        const { id_pedido } = req.params;

        // Validar que el ID del pedido esté presente
        if (!id_pedido) {
            return res.status(400).json({ message: 'El ID del pedido es obligatorio' });
        }

        // Llamar al modelo para obtener el pedido
        const [result] = await deliveryModel.readUserDelivery(id_pedido);

        // Verificar si se encontró el pedido
        if (result[0]) {
            res.json(result[0]);
        } else {
            res.status(404).json({ message: 'Pedido no encontrado :(' });
        }
    } catch (err) {
        console.error('Error en readUserDelivery:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Crear un pedido en la base de datos
const createUserDelivery = async (req, res) => {
    try {
        const { fk_id_usuario, fk_id_metodo_envio, fecha_de_pedido, fk_id_ciudad, direccion, fk_id_estado_envio, subtotal, impuesto, total, vigencia_factura } = req.body;

        // Validar que los campos obligatorios estén presentes
        if (!fk_id_usuario || !fk_id_metodo_envio || !fecha_de_pedido || !fk_id_ciudad || !direccion || !fk_id_estado_envio || !subtotal || !impuesto || !total || !vigencia_factura) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Llamar al modelo para crear el pedido
        await deliveryModel.createUserDelivery(fk_id_usuario, fk_id_metodo_envio, fecha_de_pedido, fk_id_ciudad, direccion, fk_id_estado_envio, subtotal, impuesto, total, vigencia_factura);

        // Enviar respuesta de éxito
        res.json({ message: 'Pedido creado con éxito' });
    } catch (err) {
        console.error('Error en createUserDelivery:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Actualizar un pedido en la base de datos
const updateUserDelivery = async (req, res) => {
    try {
        const { id_pedido } = req.params;
        const { fk_id_metodo_envio, fecha_de_pedido, fk_id_ciudad, direccion, fk_id_estado_envio, subtotal, impuesto, total, vigencia_factura } = req.body;

        // Validar que los campos obligatorios estén presentes
        if (!fk_id_metodo_envio || !fecha_de_pedido || !fk_id_ciudad || !direccion || !fk_id_estado_envio || !subtotal || !impuesto || !total || !vigencia_factura) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Llamar al modelo para actualizar el pedido
        await deliveryModel.updateUserDelivery(id_pedido, fk_id_metodo_envio, fecha_de_pedido, fk_id_ciudad, direccion, fk_id_estado_envio, subtotal, impuesto, total, vigencia_factura);

        // Enviar respuesta de éxito
        res.json({ message: 'Pedido actualizado con éxito' });
    } catch (err) {
        console.error('Error en updateUserDelivery:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Eliminar un pedido en la base de datos
const deleteUserDelivery = async (req, res) => {
    try {
        const { id_pedido } = req.params;

        // Validar que el ID del pedido esté presente
        if (!id_pedido) {
            return res.status(400).json({ message: 'El ID del pedido es obligatorio' });
        }

        // Llamar al modelo para eliminar el pedido
        await deliveryModel.deleteUserDelivery(id_pedido);

        // Enviar respuesta de éxito
        res.json({ message: 'Pedido eliminado con éxito' });
    } catch (err) {
        console.error('Error en deleteUserDelivery:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Exportar las funciones para usarlas en otros archivos
module.exports = {
    readUserDelivery,
    createUserDelivery,
    updateUserDelivery,
    deleteUserDelivery,
};