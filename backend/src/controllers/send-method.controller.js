// Importar el modelo de métodos de envío
const sendMethodModel = require('../models/send-method.model');

///////////////// C ****** R ****** U ****** D /////////////////

// Buscar un método de envío en la base de datos
const readSendMethod = async (req, res) => {
    try {
        const { id_metodo_envio } = req.params;

        // Validar que el ID del método de envío esté presente
        if (!id_metodo_envio) {
            return res.status(400).json({ message: 'El ID del método de envío es obligatorio' });
        }

        // Llamar al modelo para obtener el método de envío
        const [result] = await sendMethodModel.readSendMethod(id_metodo_envio);

        // Verificar si se encontró el método de envío
        if (result[0]) {
            res.json(result[0]);
        } else {
            res.json({ message: 'Método de envío no encontrado :(' });
        }
    } catch (err) {
        console.error('Error en readSendMethod:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Crear un método de envío en la base de datos
const createSendMethod = async (req, res) => {
    try {
        const { id_metodo_envio, nombre_m_envio } = req.body;

        // Validar que los campos obligatorios estén presentes
        if (!id_metodo_envio || !nombre_m_envio) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Llamar al modelo para crear el método de envío
        await sendMethodModel.createSendMethod(id_metodo_envio, nombre_m_envio);

        // Enviar respuesta de éxito
        res.json({ message: 'Método de envío creado con éxito' });
    } catch (err) {
        console.error('Error en createSendMethod:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Actualizar un método de envío en la base de datos
const updateSendMethod = async (req, res) => {
    try {
        const { id_metodo_envio } = req.params;
        const { nombre_m_envio } = req.body;

        // Validar que los campos obligatorios estén presentes
        if (!id_metodo_envio || !nombre_m_envio) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Llamar al modelo para actualizar el método de envío
        await sendMethodModel.updateSendMethod(id_metodo_envio, nombre_m_envio);

        // Enviar respuesta de éxito
        res.json({ message: 'Método de envío actualizado con éxito' });
    } catch (err) {
        console.error('Error en updateSendMethod:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Eliminar un método de envío en la base de datos
const deleteSendMethod = async (req, res) => {
    try {
        const { id_metodo_envio } = req.params;

        // Validar que el ID del método de envío esté presente
        if (!id_metodo_envio) {
            return res.status(400).json({ message: 'El ID del método de envío es obligatorio' });
        }

        // Llamar al modelo para eliminar el método de envío
        await sendMethodModel.deleteSendMethod(id_metodo_envio);

        // Enviar respuesta de éxito
        res.json({ message: 'Método de envío eliminado con éxito' });
    } catch (err) {
        console.error('Error en deleteSendMethod:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Exportar las funciones para usarlas en otros archivos
module.exports = {
    readSendMethod,
    createSendMethod,
    updateSendMethod,
    deleteSendMethod,
};