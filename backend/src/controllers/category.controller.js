// Importar el modelo de categorías
const categoryModel = require('../models/category.model');

///////////////// C ****** R ****** U ****** D /////////////////

// Buscar una categoría en la base de datos
const readCategory = async (req, res) => {
    try {
        const { id_categoria } = req.params;

        // Validar que el ID de la categoría esté presente
        if (!id_categoria) {
            return res.status(400).json({ message: 'El ID de la categoría es obligatorio' });
        }

        // Llamar al modelo para obtener la categoría
        const [result] = await categoryModel.readCategory(id_categoria);

        // Verificar si se encontró la categoría
        if (result[0]) {
            res.json(result[0]);
        } else {
            res.status(404).json({ message: 'Categoría no encontrada :(' });
        }
    } catch (err) {
        console.error('Error en readCategory:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Crear una categoría en la base de datos
const createCategory = async (req, res) => {
    try {
        const { id_categoria, nombre_categoria } = req.body;

        // Validar que los campos obligatorios estén presentes
        if (!id_categoria || !nombre_categoria) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Llamar al modelo para crear la categoría
        await categoryModel.createCategory(id_categoria, nombre_categoria);

        // Enviar respuesta de éxito
        res.json({ message: 'Categoría creada con éxito' });
    } catch (err) {
        console.error('Error en createCategory:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Actualizar una categoría en la base de datos
const updateCategory = async (req, res) => {
    try {
        const { id_categoria } = req.params;
        const { nombre_categoria } = req.body;

        // Validar que los campos obligatorios estén presentes
        if (!id_categoria || !nombre_categoria) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Llamar al modelo para actualizar la categoría
        await categoryModel.updateCategory(id_categoria, nombre_categoria);

        // Enviar respuesta de éxito
        res.json({ message: 'Categoría actualizada con éxito' });
    } catch (err) {
        console.error('Error en updateCategory:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Eliminar una categoría en la base de datos
const deleteCategory = async (req, res) => {
    try {
        const { id_categoria } = req.params;

        // Validar que el ID de la categoría esté presente
        if (!id_categoria) {
            return res.status(400).json({ message: 'El ID de la categoría es obligatorio' });
        }

        // Llamar al modelo para eliminar la categoría
        await categoryModel.deleteCategory(id_categoria);

        // Enviar respuesta de éxito
        res.json({ message: 'Categoría eliminada con éxito' });
    } catch (err) {
        console.error('Error en deleteCategory:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Exportar las funciones para usarlas en otros archivos
module.exports = {
    readCategory,
    createCategory,
    updateCategory,
    deleteCategory,
};