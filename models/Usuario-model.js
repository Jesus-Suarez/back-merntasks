const mongoose = require('mongoose');

const UsuariosSchema = mongoose.Schema({
	nombre: {
		type: String,
		requires: true,
		trim: true, //Elimina los espacios en blanco el inicio y final del string que se insertara
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		trim: true,
	},
	registro: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model('Usuario', UsuariosSchema);
