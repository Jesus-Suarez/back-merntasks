//Rutas para crear usuarios

const express = require('express');
const router = express.Router();

//Libreria para validar el request
const { check } = require('express-validator');

const usuarioController = require('../controllers/usuario-controller');
// Crea un usuario
// api/usuarios
router.post(
	'/',
	[
		check('nombre', 'El nombre es obligatorio').not().isEmpty(),
		check('email', 'Agrega un email valido').isEmail(),
		check(
			'password',
			'El password debe ser minimo de seis caracteres'
		).isLength({ min: 6 }),
	],
	usuarioController.crearUsuario
);

module.exports = router;
