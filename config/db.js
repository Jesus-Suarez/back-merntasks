const mongoose = require('mongoose');

//Importamos el archivo variables.env
require('dotenv').config({ path: 'variables.env' });

const conectarDB = async () => {
	try {
		await mongoose.connect(process.env.DB_MONGO, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		});
		console.log('BD Conectada');
	} catch (error) {
		console.log(error);
		process.exit(1); //Detiene la app en caso de que haya un error
	}
};

module.exports = conectarDB;
