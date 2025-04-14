// Importar el modelo de pedidos
const deliveryModel = require('../models/delivery.model');

///////////////// C ****** R ****** U ****** D /////////////////

// Buscar un pedido en la base de datos
const readIdDelivery = async (req, res) => {
    try {
        const { id_pedido } = req.params;

        // Validar que el ID del pedido esté presente
        if (!id_pedido) {
            return res.status(400).json({ message: 'El ID del pedido es obligatorio' });
        }

        // Llamar al modelo para obtener el pedido
        const [result] = await deliveryModel.readIdDelivery(id_pedido);

        // Verificar si se encontró el pedido
        if (result[0]) {
            res.json(result[0]);
        } else {
            res.status(404).json({ message: 'Pedido con el id del pedido no encontrado :(' });
        }
    } catch (err) {
        console.error('Error en readIdDelivery:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Buscar los pedidos asociados a un usuario
const readUserDelivery = async (req, res) => {
    try {
        const { fk_id_usuario } = req.params;

        // Validar que el ID del usuario esté presente

        if (!fk_id_usuario) {
            return res.status(400).json({ message: 'El ID del usuario es obligatorio'});
        }

        // Llamar al modelo para obtener los pedidos del usuario
        const [result] = await deliveryModel.readUserDelivery(fk_id_usuario);

        // Verificar si se encontraron pedidos asociados al usuario
        if (result[0]) {
            res.json(result[0]);
        } else {
            res.status(404).json({ message: 'No hay pedidos asociados a este usuario :(' });
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
    readIdDelivery,
    readUserDelivery,
    createUserDelivery,
    updateUserDelivery,
    deleteUserDelivery,
};