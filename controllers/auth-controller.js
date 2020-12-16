const Usuario = require('../models/Usuario-model');
//Libreria para encriptar el password
const bcryptjs = require('bcryptjs');

//Resultado de las validaciones en router/usuario
const { validationResult } = require('express-validator');

//Libreria para verificar el JWT
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {
	//REvisamos si hay errores
	const errores = validationResult(req);
	if (!errores.isEmpty()) {
		return res.status(400).json({
			ok: false,
			errores,
		});
	}

	//extraer el email y password
	const { email, password } = req.body;

	try {
		//REvisar que sea un usuario registrado
		const usuario = await Usuario.findOne({ email });
		if (!usuario) {
			res.status(400).json({
				ok: false,
				error: { msg: 'El usuario no existe' },
			});
		}

		//Revisar si el pasword coincide con el password de la BD
		const passCorrecto = await bcryptjs.compare(password, usuario.password);

		if (!passCorrecto) {
			return res.status(400).json({
				ok: false,
				error: {
					msg: "Email o 'contraseña' incorrectos",
				},
			});
		}

		//Si el password y el email es correcto entonses crear y firmar el JWT
		const payload = {
			usuario: { id: usuario.id },
		};

		//firma del JWT
		jwt.sign(
			payload,
			process.env.JWT_SECRET,
			{
				expiresIn: 432000, //Expira en 5 dias
			},
			(error, token) => {
				if (error) throw error;

				//Mensaje de confirmacion
				res.json({
					ok: true,
					token,
				});
			}
		);
	} catch (error) {
		console.log(error);
	}
};
