//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
	server.listen(process.env.PORT || 3001, () => {
		console.log('%s listening at ' + process.env.PORT || 3001); // eslint-disable-line no-console
	});
});

// PORT:
// El puerto donde se monta el servidor debe de estar definida
// en una variable de entorno PORT
// ya que heroku o el servidor de deploy debe de poder asignar
// dinamicamente el puerto disponible

// DATABASE_URL:
// La connexion a la base de datos tambien debe de estar definida
// en un variable de entorno DATABASE_URL
// ya que una vez heroku implemente su base de datos nos la da disponible
// con una variable de entorno con ese nombre

// FRONT_URL:
// Y el el front url debe indicar desde que urls pueden venir las request,
// esto es mas que nada por un tema de las cookies

// quedando de la siguiente manera:
/*
PORT=3001
DATABASE_URL=postgres://postgres:xxxxxxxxxxx@localhost:5432/development
FRONT_URL=http://localhost:3000 ip:3000
*/
