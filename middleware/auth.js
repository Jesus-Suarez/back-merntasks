const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
	//Leer el token del header
	const token = req.header('x-auth-token');
	//console.log(token);
	//Rrevisar si no hay token
	if (!token) {
		return res.status(401).json({
			ok: false,
			error: {
				msg: 'No hay Token, Permiso no valido',
			},
		});
	}

	//Validar el token
	try {
		const tokenDescifrado = jwt.verify(token, process.env.JWT_SECRET);
		req.usuario = tokenDescifrado.usuario;
		//console.log(tokenDescifrado);
		next();
	} catch (error) {
		res.status(401).json({
			ok: false,
			error: { msg: 'Token no válido' },
		});
	}
};
