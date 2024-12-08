const app = require('./app');
const databaseConnection = require('./database');

const main = () => {

    // CONECTAR LA BASE DE DATOS
    databaseConnection.connect((err)=>{
        if(err) throw err;
        console.log('Conectado a la base de datos :D');
        // Inicio de la API RESTful
    });


    // ENCENDER EL SERVIDOR 
    app.listen(2000, () => {
        console.log('Servidor encendido en el puerto 2000');
    });

}

main();