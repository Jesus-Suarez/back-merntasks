const Proyecto = require('../models/Proyecto-model');

//Importamos el resultado de la validacion que esta en el modelo
const { validationResult } = require('express-validator');

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
		res.status(500).send({ msg: 'Hubo un error' });
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

//Actualizar los
exports.updateProject = async (req, res) => {
	//Revisar si hay errores de validacion
	const errores = validationResult(req);
	if (!errores.isEmpty()) {
		return res.status(400).json({
			errores: errores.array(),
		});
	}

	// Extraer la informacion del proyecto
	const { nombre } = req.body;
	const nuevoProyecto = {};

	//Verificamos que el cliente nos haya enviado el nombre del proyecto y lo pasamos al nuevo proyecto
	if (nombre) {
		nuevoProyecto.nombre = nombre;
		console.log(nuevoProyecto);
	}

	try {
		//revisar el si el proyecto existe consultandolo con el ID
		//Siempre utilizar await cuando hacemos cosultas a la base de datos
		let proyecto = await Proyecto.findById(req.params.id);

		//Revidar si el proyecto existe o no
		if (!proyecto) {
			return res.status(404).json({
				ok: false,
				error: {
					msg: 'Proyecto no encontrado',
				},
			});
		}
		//Verificar si el creador del proyecto
		//console.log(typeof proyecto.creador.toString());
		//console.log(typeof req.usuario.id);
		if (proyecto.creador.toString() !== req.usuario.id) {
			return res.status(401).json({
				ok: false,
				error: {
					msg: 'No autorizado',
				},
			});
		}
		//Actualizar
		proyecto = await Proyecto.findByIdAndUpdate(
			{ _id: req.params.id },
			{ $set: nuevoProyecto },
			{ new: true }
		);

		res.json({
			ok: true,
			proyecto,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ msg: 'Error en el Servidor' });
	}
};

//Elimina un proyecto por su ID
exports.deleteProject = async (req, res) => {
	try {
		//Consultamos el proyecto en la DB con el id de la url
		let proyecto = await Proyecto.findById(req.params.id);
		//Revisamos que el proyecto exista
		if (!proyecto) {
			return res.status(404).json({
				ok: false,
				error: {
					msg: 'Proyecto no encontrado',
				},
			});
		}

		//Verificar que el usuario concuerde con el creador del proyecto
		//console.log(typeof proyecto.creador.toString());
		//console.log(typeof req.params.id);
		if (proyecto.creador.toString() !== req.usuario.id) {
			return res.status(401).json({
				ok: false,
				error: {
					msg: 'No autorizado',
				},
			});
		}

		//Eliminamos el proyecto
		await Proyecto.findByIdAndRemove({ _id: req.params.id });
		res.json({
			ok: true,
			msg: 'Proyecto eliminado',
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ msg: 'Upps... Error en el servidor' });
	}
};
