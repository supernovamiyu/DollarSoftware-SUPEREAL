const database = require('../config/database');
const mysql2 = require('mysql2');

///////////////// C ****** R ****** U ****** D /////////////////

/////////////// CIUDADES /////////////////

// Buscar una ciudad en la base de datos

const readCity = (req, res) => { 

    const { id_ciudad } = req.params;

    const readQuery = `SELECT * FROM ciudades WHERE id_ciudad=?;`;

    const query = mysql2.format(readQuery, [id_ciudad]);

    database.query(query, (err, result) => {
        if (err) throw err;
        console.log(typeof result[0]);
        if (result[0] !== undefined) {
            res.json(result[0]);
        } else {
            res.json({message: 'Ciudad no encontrada :('});
        }
    });

};


// Crear una ciudad en la tabla de ciudades en la base de datos


const createCity = (req, res) => {
    const { id_ciudad, nombre_ciudad } = req.body;

    const createQuery = `INSERT INTO ciudades (id_ciudad, nombre_ciudad) VALUES (?,?);`;
    
    const query = mysql2.format(createQuery, [id_ciudad, nombre_ciudad]);

    database.query(query, (err, result) => {
        if (err) throw err;
        // console.log(result);
        res.json({message: 'Ciudad creada con éxito'});
    });
};


// Actualizar una ciudad en la tabla de ciudades en la base de datos

const updateCity = (req, res) => {
    const { id_ciudad } = req.params;
    const { nombre_ciudad } = req.body;

    const updateQuery = `UPDATE ciudades SET nombre_ciudad=? WHERE id_ciudad=?;`;

    const query = mysql2.format(updateQuery, [nombre_ciudad, id_ciudad]);

    database.query(query, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.json({message: 'Ciudad actualizada con éxito'});
    });
};

// Eliminar una ciudad en la tabla de ciudades en la base de datos

const deleteCity = (req, res) => {
    const { id_ciudad } = req.params;
    
    const deleteQuery = `DELETE FROM ciudades WHERE id_ciudad=?;`;
    
    const query = mysql2.format(deleteQuery, [id_ciudad]);
    
    database.query(query, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.json({message: 'Ciudad eliminada con éxito'});
    });
};

// Exportar las funciones para usarlas en otros archivos

module.exports = {
    readCity,
    createCity,
    updateCity,
    deleteCity, 
};