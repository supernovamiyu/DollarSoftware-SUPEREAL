// Importar el modelo de las opiniones

const opinionsModel = require('../models/opinions.model');

///////////////// C ****** R ****** U ****** D /////////////////

// Buscar una opinión en la base de datos
const readOpinion = async (req, res) => {
    try {
        const { id_opinion } = req.params;

        // Validar que el ID de la opinión esté presente
        if (!id_opinion) {
            return res.status(400).json({ message: 'El ID de la opinión es obligatorio' });
        }

        // Llamar al modelo para obtener la opinión
        const [result] = await opinionsModel.readOpinion(id_opinion);

        // Verificar si se encontró la opinión
        if (result[0]) {
            res.json(result[0]);
        } else {
            res.status(404).json({ message: 'Opinión no encontrada :(. Por favor verifica el id de la opinión en la base de datos' });
        }
    } catch (err) {
        console.error('Error en readOpinion:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Crear una opinión en la base de datos
const createOpinion = async (req, res) => {
    try {
        const { es_anonimo, opinion } = req.body;

        // Validar que los campos obligatorios estén presentes
        if (!es_anonimo || !opinion) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }
        // Llamar al modelo para crear la opinión
        await opinionsModel.createOpinion(es_anonimo, opinion);
        
        // Enviar respuesta de éxito
        res.json({ message: 'Opinión creada exitosamente' });
    } catch (err) {
        console.error('Error en createOpinion:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }

};

// Actualizar una opinión en la base de datos

const updateOpinion = async (req, res) => {
    try {
        const { id_opinion } = req.params;
        const { es_anonimo, opinion } = req.body;

        // Validar que los campos obligatorios estén presentes
        if (!id_opinion || !es_anonimo || !opinion) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Llamar al modelo para actualizar la opinión
        await opinionsModel.updateOpinion(id_opinion, es_anonimo, opinion);

        // Enviar respuesta de éxito
        res.json({ message: 'Opinión actualizada exitosamente' });
    } catch (err) {
        console.error('Error en updateOpinion:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Eliminar una opinión de la base de datos
const deleteOpinion = async (req, res) => {
    try{
        const { id_opinion } = req.params;
        // Llamar al modelo para eliminar la opinión
        await opinionsModel.deleteOpinion(id_opinion);
        
        // Enviar respuesta de éxito
        res.json({ message: 'Opinión eliminada exitosamente' });

    } catch (err) {
        console.error('Error en deleteOpinion:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Exportar las funciones para usarlas en otros archivos
module.exports = {
    readOpinion,
    createOpinion,
    updateOpinion,
    deleteOpinion,
};