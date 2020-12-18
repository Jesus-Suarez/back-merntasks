const express = require('express');
const router = express.Router();

const proyectoController = require('../controllers/proyecto-controller');

//Importamos el middleware de autenticacion
const auth = require('../middleware/auth');

//Vvalidacion para los registros
const { check } = require('express-validator');

//Crear proyectos
//api/proyectos
router.post(
	'/',
	auth,
	[check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()],
	proyectoController.crearProyecto
);

//Obtener todos los proyectos
router.get('/', auth, proyectoController.obtenerProyectos);

//actualizar un proyecto con el ID
router.put(
	'/:id',
	auth,
	[check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()],
	proyectoController.updateProject
);

module.exports = router;
