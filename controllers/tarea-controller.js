const Tarea = require('../models/Tarea-model');
const Proyecto = require('../models/Proyecto-model');
const { validationResult } = require('express-validator');

//Crea una nueva tarea
exports.createTarea = async (req, res) => {
	//Revisar si hay errores de validacion
	const errores = validationResult(req);
	if (!errores.isEmpty()) {
		return res.status(400).json({
			ok: false,
			errores: errores.array(),
		});
	}

	try {
		//Extraer el proyecto y comprobar que si existe
		const { proyecto } = req.body;

		const existeProyecto = await Proyecto.findById(proyecto);

		if (!existeProyecto) {
			return res.status(404).json({
				ok: false,
				error: 'El proyecto no existe',
			});
		}

		//Revisar si el proyecto actual pertenece al usuario autenticado
		if (
			existeProyecto.creador.toString() !== existeProyecto.creador.toString()
		) {
			return res.status(401).json({
				ok: false,
				error: {
					msg: 'Usuario no autorizado',
				},
			});
		}

		//Creamos la tarea
		const tarea = new Tarea(req.body);
		await tarea.save();
		res.json({
			ok: true,
			tarea,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send;
	}
};

// Obotener las tareas del proyecto
exports.getTareas = async (req, res) => {
	try {
		//extraemos el proyecto
		const { proyecto } = req.body;
		const existeProyecto = await Proyecto.findById(proyecto);
		if (!existeProyecto) {
			return res.status(404).json({
				ok: false,
				error: {
					msg: 'Proyecto no encontrado',
				},
			});
		}

		if (existeProyecto.creador.toString() !== req.usuario.id) {
			return res.status(401).json({
				ok: false,
				error: {
					msg: 'No autorizado',
				},
			});
		}

		//Obtener todas las tareas por proyecto
		const tareas = await Tarea.find({ proyecto });
		res.json({
			ok: true,
			tareas,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send('Hubo un error');
	}
};
