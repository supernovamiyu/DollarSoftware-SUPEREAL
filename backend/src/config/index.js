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

main();