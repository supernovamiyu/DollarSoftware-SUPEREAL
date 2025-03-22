// Importar el modelo de las opiniones

const opinionsModel = require('../models/opinions.model');

///////////////// C ****** R ****** U ****** D /////////////////

// Buscar la opinion de un producto en la base de datos

const readOpinionProduct = async (req, res) => {
    try {
        const { fk_id_productos } = req.params;

        // Validar que el ID de la opinión esté presente
        if (!fk_id_productos) {
            return res.status(400).json({ message: 'El ID del producto es obligatorio' });
        }

        // Llamar al modelo para obtener la opinión
        const [result] = await opinionsModel.readOpinionProduct(fk_id_productos);

        // Verificar si se encontró la opinión
        if (result.length > 0) {
            res.json(result);
        } else {
            res.status(404).json({ message: 'Opinión del producto no encontrada :(. Por favor verifica el id de la opinión en la base de datos' });
        }
    } catch (err) {
        console.error('Error en readOpinionProduct:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Crear una nueva opinión de un producto en la base de datos

const createOpinionProduct = async (req, res) => {
    try {
        const { es_anonimo, opinion, fk_id_productos } = req.body;

        // Validar que los campos obligatorios estén presentes
        if (!es_anonimo || !opinion || !fk_id_productos) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Llamar al modelo para crear la opinión del producto
        await opinionsModel.createOpinionProduct(es_anonimo, opinion, fk_id_productos);

        // Enviar respuesta de éxito
        res.json({ message: 'Opinión del producto creada exitosamente' });
    } catch (err) {
        console.error('Error en createOpinionProduct:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Actualizar una opinión de un producto en la base de datos

const updateOpinionProduct = async (req, res) => {
    try {
        const { id_opinion } = req.params;
        const { es_anonimo, opinion, fk_id_productos } = req.body;

        // Validar que el ID de la opinión esté presente
        if (!id_opinion || !es_anonimo || !opinion || !fk_id_productos) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Llamar al modelo para actualizar la opinión del producto
        await opinionsModel.updateOpinionProduct(id_opinion, es_anonimo, opinion, fk_id_productos);

        // Enviar respuesta de éxito
        res.json({ message: 'Opinión del producto actualizada exitosamente' });

    } catch (err) {
        console.error('Error en updateOpinionProduct:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Eliminar una opinión de un producto de la base de datos

const deleteOpinionProduct = async (req, res) => {
    try {
        const { id_opinion, fk_id_productos } = req.params;

        // Validar que el ID de la opinión y el ID del producto estén presentes
        if (!id_opinion || !fk_id_productos) {
            return res.status(400).json({ message: 'El ID de la opinión es obligatorio' });
        }

        // Llamar al modelo para eliminar la opinión del producto
        await opinionsModel.deleteOpinionProduct(id_opinion);

        // Enviar respuesta de éxito
        res.json({ message: 'Opinión del producto eliminada exitosamente' });

    } catch (err) {
        console.error('Error en deleteOpinionProduct:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
// Exportar las funciones para usarlas en otros archivos
module.exports = {
    readOpinionProduct,
    createOpinionProduct,
    updateOpinionProduct,
    deleteOpinionProduct
};