const express = require('express');

//Importamos la funcion para conectar la BD
const conectarDB = require('./config/db');

//crear el servidor
const app = express();

//Conectar a la base de datos llamando a la funcion
conectarDB();

// Habilitar express.json ---para recibir las peticiones como json
app.use(express.json({ extended: true }));

//Puerto de la app
const PORT = process.env.PORT || 4000;

//Importar las rutas de los endpoints
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));

//Deficnir la página principal
app.get('/', (req, res) => {
	res.send('hola mundo');
});

//arrancar la app
app.listen(PORT, () => {
	console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});
