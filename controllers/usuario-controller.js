const Usuario = require('../models/Usuario-model');
//Libreria para encriptar el password
const bcryptjs = require('bcryptjs');

const { validationResult } = require('express-validator');

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
		res.status(201).json({ ok: true, message: 'Usuario creado correctamente' });
	} catch (error) {
		console.log(error);
		res.status(400).json({ ok: false, error });
	}
};
