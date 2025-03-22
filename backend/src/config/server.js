require('dotenv').config();

const app = require('./app');
const databaseConnection = require('./database');

const main = () => {

    // CONECTAR LA BASE DE DATOS
    databaseConnection.connect((err)=>{
        if(err) throw err;
        console.log('Conectado a la base de datos :D');
        // Inicio de la API RESTful
    });

    const port = 3000;
    // ENCENDER EL SERVIDOR 
    app.listen(port, () => {
        console.log(`Servidor encendido en el puerto 3000`);
    });

}
// Después de cargar dotenv
console.log('JWT_SECRET:', process.env.JWT_SECRET);
console.log('JWT_EXPIRES_IN:', process.env.JWT_EXPIRES_IN);

main();