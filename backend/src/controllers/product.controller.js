// Importar el modelo de productos
const productModel = require('../models/product.model');

///////////////// C ****** R ****** U ****** D /////////////////

// Buscar todos los productos en la base de datos
const getAllProducts = async (req, res) => {
    try {
        const [result] = await productModel.getAllProducts();
        res.json(result);
    } catch (err) {
        console.error('Error en getAllProducts:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Buscar productos similares en la base de datos
const getSimilarProducts = async (req, res) => {
    try {
        const searchTerm = req.params.searchTerm;
        const [result] = await productModel.getSimilarProducts(searchTerm);
        res.json(result);
    } catch (err) {
        console.error('Error en getSimilarProducts:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Buscar productos destacados en la base de datos
const getFeaturedProducts = async (req, res) => {
    try {
        const [result] = await productModel.getFeaturedProducts();
        if (result.length === 0) {
            res.json({ message: 'No se encontraron productos destacados' });
        } else {
            res.json(result);
        }
    } catch (err) {
        console.error('Error en getFeaturedProducts:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Buscar productos por categoría en la base de datos
const getProductCategory = async (req, res) => {
    try {
        const { fk_id_categoria } = req.params;
        const [result] = await productModel.getProductCategory(fk_id_categoria);
        if (result.length > 0) {
            res.json(result);
        } else {
            res.json({ message: 'No han sido encontrados productos con esta categoría :(' });
        }
    } catch (err) {
        console.error('Error en getProductCategory:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Buscar un producto en la base de datos
const readProduct = async (req, res) => {
    try {
        const { id_productos } = req.params;
        const [result] = await productModel.readProduct(id_productos);
        if (result[0]) {
            res.json(result[0]);
        } else {
            res.json({ message: 'Producto no encontrado :(' });
        }
    } catch (err) {
        console.error('Error en readProduct:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Crear un producto en la base de datos
const createProduct = async (req, res) => {
    try {
        const { id_productos, nombre_producto, unidades_stock, unidades_disponibles, fk_id_categoria, precio, imagen_url } = req.body;

        // Validar que los campos obligatorios estén presentes
        if (!id_productos || !nombre_producto || !unidades_stock || !unidades_disponibles || !fk_id_categoria || !precio || !imagen_url) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Llamar al modelo para crear el producto
        await productModel.createProduct(id_productos, nombre_producto, unidades_stock, unidades_disponibles, fk_id_categoria, precio, imagen_url);

        // Enviar respuesta de éxito
        res.json({ message: 'Producto creado con éxito' });
    } catch (err) {
        console.error('Error en createProduct:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Actualizar un producto en la base de datos
const updateProduct = async (req, res) => {
    try {
        const { id_productos } = req.params;
        const { nombre_producto, unidades_stock, unidades_disponibles, fk_id_categoria, precio } = req.body;

        // Validar que los campos obligatorios estén presentes
        if (!nombre_producto || !unidades_stock || !unidades_disponibles || !fk_id_categoria || !precio) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Llamar al modelo para actualizar el producto
        await productModel.updateProduct(id_productos, nombre_producto, unidades_stock, unidades_disponibles, fk_id_categoria, precio);

        // Enviar respuesta de éxito
        res.json({ message: 'Producto actualizado con éxito' });
    } catch (err) {
        console.error('Error en updateProduct:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Eliminar un producto en la base de datos
const deleteProduct = async (req, res) => {
    try {
        const { id_productos } = req.params;

        // Validar que el ID del producto esté presente
        if (!id_productos) {
            return res.status(400).json({ message: 'El ID del producto es obligatorio' });
        }

        // Llamar al modelo para eliminar el producto
        await productModel.deleteProduct(id_productos);

        // Enviar respuesta de éxito
        res.json({ message: 'Producto eliminado con éxito' });
    } catch (err) {
        console.error('Error en deleteProduct:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Función para manejar errores
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ message: 'Error interno del servidor' });
};

// Exportar las funciones para usarlas en otros archivos
module.exports = {
    getAllProducts,
    getSimilarProducts,
    getFeaturedProducts,
    getProductCategory,
    readProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    errorHandler
};