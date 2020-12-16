const Proyecto = require('../models/Proyecto-model');

//Importamos el resultado de la validacion que esta en el modelo
const { check, validationResult } = require('express-validator');
exports.crearProyecto = async (req, res) => {
	//Revisar si hay errores de validacion
	const errores = validationResult(req);
	//Si la varible arreglo no esta vacia entonses
	if (!errores.isEmpty()) {
		//regresa un arreglo con los errores de validacion
		return res.status(400).json({ errores: errores.array() });
	}

	try {
		//Crear el nuevo proyecto
		const proyecto = new Proyecto(req.body);
		//Guardar el creador del registro con la inf. del token
		proyecto.creador = req.usuario.id;

		// Guardamos el proyecto
		proyecto.save();
		res.json({
			ok: true,
			proyecto,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send('Hubo un error');
	}
};

exports.obtenerProyectos = async (req, res) => {
	try {
		//Traemos todos los proyectos.
		//Short es para ordenar el resultado por orden de insercion
		const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({
			creado: -1,
		});
		res.json({ proyectos });
	} catch (error) {
		console.log(error);
		res.status(500).send('Hubo un error');
	}
};
