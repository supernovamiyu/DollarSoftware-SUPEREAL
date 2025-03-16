// Importar el modelo de ciudades
const cityModel = require('../models/city.model');

///////////////// C ****** R ****** U ****** D /////////////////

// Buscar una ciudad en la base de datos
const readCity = async (req, res) => {
    try {
        const { id_ciudad } = req.params;

        // Validar que el ID de la ciudad esté presente
        if (!id_ciudad) {
            return res.status(400).json({ message: 'El ID de la ciudad es obligatorio' });
        }

        // Llamar al modelo para obtener la ciudad
        const [result] = await cityModel.readCity(id_ciudad);

        // Verificar si se encontró la ciudad
        if (result[0]) {
            res.json(result[0]);
        } else {
            res.status(404).json({ message: 'Ciudad no encontrada :(' });
        }
    } catch (err) {
        console.error('Error en readCity:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Crear una ciudad en la base de datos
const createCity = async (req, res) => {
    try {
        const { id_ciudad, nombre_ciudad } = req.body;

        // Validar que los campos obligatorios estén presentes
        if (!id_ciudad || !nombre_ciudad) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Llamar al modelo para crear la ciudad
        await cityModel.createCity(id_ciudad, nombre_ciudad);

        // Enviar respuesta de éxito
        res.json({ message: 'Ciudad creada con éxito' });
    } catch (err) {
        console.error('Error en createCity:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Actualizar una ciudad en la base de datos
const updateCity = async (req, res) => {
    try {
        const { id_ciudad } = req.params;
        const { nombre_ciudad } = req.body;

        // Validar que los campos obligatorios estén presentes
        if (!id_ciudad || !nombre_ciudad) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Llamar al modelo para actualizar la ciudad
        await cityModel.updateCity(id_ciudad, nombre_ciudad);

        // Enviar respuesta de éxito
        res.json({ message: 'Ciudad actualizada con éxito' });
    } catch (err) {
        console.error('Error en updateCity:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Eliminar una ciudad en la base de datos
const deleteCity = async (req, res) => {
    try {
        const { id_ciudad } = req.params;

        // Validar que el ID de la ciudad esté presente
        if (!id_ciudad) {
            return res.status(400).json({ message: 'El ID de la ciudad es obligatorio' });
        }

        // Llamar al modelo para eliminar la ciudad
        await cityModel.deleteCity(id_ciudad);

        // Enviar respuesta de éxito
        res.json({ message: 'Ciudad eliminada con éxito' });
    } catch (err) {
        console.error('Error en deleteCity:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Exportar las funciones para usarlas en otros archivos
module.exports = {
    readCity,
    createCity,
    updateCity,
    deleteCity,
};