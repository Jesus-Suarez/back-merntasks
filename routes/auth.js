//Rutas para autenticar usuarios
const express = require('express');
const router = express.Router();

//Libreria para validar el request
const { check } = require('express-validator');

const authController = require('../controllers/auth-controller');
// Login para usuario
// api/auth
router.post('/', [
	check('email', 'Agrega un email valido').isEmail(),
	check('password', 'El password debe ser minimo de seis caracteres').isLength({
		min: 6,
	}),
	authController.autenticarUsuario,
]);

module.exports = router;
