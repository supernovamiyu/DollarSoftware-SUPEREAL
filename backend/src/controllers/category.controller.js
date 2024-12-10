const database = require('../config/database');
const mysql2 = require('mysql2');

///////////////// C ****** R ****** U ****** D /////////////////

/////////////// CATEGORIAS /////////////////

// Buscar una categoría en la base de datos

const readCategory = (req, res) => { 

    const { id_categoria } = req.params;

    const readQuery = `SELECT * FROM categorias WHERE id_categoria=?;`;

    const query = mysql2.format(readQuery, [id_categoria]);

    database.query(query, (err, result) => {
        if (err) throw err;
        console.log(typeof result[0]);
        if (result[0] !== undefined) {
            res.json(result[0]);
        } else {
            res.json({message: 'Categoría no encontrada :('});
        }
    });

};


// Crear una categoria en la tabla de categorias en la base de datos


const createCategory = (req, res) => {
    const { id_categoria, nombre_categoria } = req.body;

    const createQuery = `INSERT INTO categorias (id_categoria, nombre_categoria) VALUES (?,?);`;
    
    const query = mysql2.format(createQuery, [id_categoria, nombre_categoria]);

    database.query(query, (err, result) => {
        if (err) throw err;
        // console.log(result);
        res.json({message: 'Categoría creada con éxito'});
    });
};


// Actualizar una categoria en la tabla de categorias en la base de datos

const updateCategory = (req, res) => {
    const { id_categoria } = req.params;
    const { nombre_categoria } = req.body;

    const updateQuery = `UPDATE categorias SET nombre_categoria=? WHERE id_categoria=?;`;

    const query = mysql2.format(updateQuery, [nombre_categoria, id_categoria]);

    database.query(query, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.json({message: 'Categoría actualizada con éxito'});
    });
};

// Eliminar una categoria en la tabla de usuarios en la base de datos

const deleteCategory = (req, res) => {
    const { id_categoria } = req.params;
    
    const deleteQuery = `DELETE FROM categorias WHERE id_categoria=?;`;
    
    const query = mysql2.format(deleteQuery, [id_categoria]);
    
    database.query(query, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.json({message: 'Categoría eliminada con éxito'});
    });
};

// Exportar las funciones para usarlas en otros archivos

module.exports = {
    readCategory,
    createCategory,
    updateCategory,
    deleteCategory, 
};