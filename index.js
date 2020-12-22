const express = require('express');

//Importamos la funcion para conectar la BD
const conectarDB = require('./config/db');

const cors = require('cors');

//crear el servidor
const app = express();

//Conectar a la base de datos llamando a la funcion
conectarDB();

//Habilitamos el cors para intercambio de datos de un dominio a otro dominio diferente
app.use(cors());

// Habilitar express.json ---para recibir las peticiones como json
app.use(express.json({ extended: true }));

//Puerto de la app
const port = process.env.port || 4000;

//Importar las rutas de los endpoints
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

//Deficnir la página principal
app.get('/', (req, res) => {
	res.send('hola mundo');
});

//arrancar la app
app.listen(port, '0.0.0.0', () => {
	console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});
