const Usuario = require('../models/Usuario-model');
//Libreria para encriptar el password
const bcryptjs = require('bcryptjs');

//Resultado de las validaciones en router/usuario
const { validationResult } = require('express-validator');

//Libreria para generar el JWT
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {
	//Revisar si hay errores
	const errores = validationResult(req);
	if (!errores.isEmpty()) {
		//Respondemos los errores que se ejecutaron
		res.status(400).json({ ok: false, errores: errores.array() });
	}
	//extraer email y password con object destructuring
	const { email, password } = req.body;

	try {
		//Revisar que el usuario registrado sea unico
		let usuario = await Usuario.findOne({ email });

		if (usuario) {
			return res.status(400).json({
				ok: false,
				msg: 'El usuario ya existe',
			});
		}

		//Crea el nuevo usuario
		usuario = new Usuario(req.body);

		//Hashear el password
		//Salt es el numero de vueltas que se va a encriptar
		const salt = await bcryptjs.genSalt(10);
		usuario.password = await bcryptjs.hash(password, salt);

		//Guardar usuario
		await usuario.save();

		//Crear y formar el JWT
		const payload = {
			usuario: {
				id: usuario.id,
			},
		};

		//firmar el token
		//Expira en 1 hrs
		jwt.sign(
			payload,
			process.env.JWT_SECRET,
			{
				expiresIn: 432000, //Expira en 5 dias
			},
			(error, token) => {
				if (error) throw error;

				//Mensaje de confirmacion
				res.status(201).json({ ok: true, token });
			}
		);
	} catch (error) {
		console.log(error);
		res.status(400).json({ ok: false, error });
	}
};
