const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tarea-controller');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

//crear una tarea
// api/tareas
router.post(
	'/',
	auth,
	[
		check('nombre', 'El nombre de la tarea es obligatorio').not().isEmpty(),
		check('proyecto', 'El nombre del proyecto es obligatorio').not().isEmpty(),
	],
	tareaController.createTarea
);

module.exports = router;
