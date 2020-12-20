//Rutas para autenticar usuarios
const express = require('express');
const router = express.Router();

//Libreria para validar el request
const { check } = require('express-validator');

const authController = require('../controllers/auth-controller');
const auth = require('../middleware/auth');

// Login para usuario, Iniciar sesion
// api/auth
router.post('/', [
	check('email', 'Agrega un email valido').isEmail(),
	check('password', 'El password debe ser minimo de seis caracteres').isLength({
		min: 6,
	}),
	authController.autenticarUsuario,
]);

//Obtiene el usuario autenticado
router.get('/', auth, authController.usuarioAutenticado);

module.exports = router;
