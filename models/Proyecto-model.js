const mongoose = require('mongoose');

const ProyectoSchema = mongoose.Schema({
	nombre: {
		type: String,
		required: true,
		trim: true,
	},
	creador: {
		//Le pasa el Id del usuario que lo creo como si fuera un inner join
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Usuario',
	},
	creado: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model('Proyecto', ProyectoSchema);
