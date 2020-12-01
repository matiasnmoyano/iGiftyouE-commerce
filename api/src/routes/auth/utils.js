const { User } = require('../../db');
const passport = require('passport');

// user login
const login = (req, res, next) => {
  // console.log(req.user, 'SOY REQ.USER POST');
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send(user);
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.send(user);
    });
  })(req, res, next);
};

// // Verifica si el usuario esta logeado
const me = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.status(200).send(req.user);
  } else {
    return res.status(401).send('No estas logueado Rei');
  }
};
// // Verifica si el user esta logeado --> lo desloguea , si no avisamos que no se logueo
const userLogout = (req, res) => {
  req.logout();
  return res.status(200).send('Deslogueado con exito :)');
};
// Verifica si el user esta logueado y le otorga accesos de admin
const adminAccess = (req, res) => {
  const { id } = req.params;
  console.log(req.user, 'soy el console.log de req');
  // Si el usuario no esta autenticado retornamos un status (401) y avisamos que no esta logueado.
  /* if (!req.isAuthenticated()) return res.status(401).send("No estás logueado"); */
  // Si el rol del usuario es diferente de Admin , retornamos un 401 y avisamos que no es admin
  if (req.isAuthenticated() && req.user.rol === 'Admin') {
    // Si no entra en ninguno entonces va a buscar el id del user en la base de datos y pregunta:
    User.findByPk(id).then((user) => {
      // si el usuario no existe status 404
      if (!user) return res.status(404).send('No se encontró el usuario.');
      // si el usuario existe y su rol es Cliente ---> cambiara a Admin
      else if (user.rol === 'Client') user.rol = 'Admin';
      // guarda los datos cambiados en db
      user.save();
      // devuelve mensaje
      return res.status(200).send(`${user.name} ahora tenes el poder, no rompas Todo.  `);
    });
  } else {
    return res.status(401).send('No estas logueado o no eres admin');
  }
};
// verifica si el user esta logueado y le elimina el acceso a admin
const adminDelete = (req, res) => {
  const { id } = req.params;

  // Si el rol del usuario es igual a Cliente , retornamos un 401 y avisamos que ya es client
  if (req.isAuthenticated() && req.user.rol === 'Admin') {
    // Si no entra en ninguno entonces va a buscar el id del user en la base de datos y pregunta:
    User.findByPk(id).then((user) => {
      // si el usuario no existe status 404
      if (!user) return res.status(404).send('No se encontró el usuario.');
      // si el usuario existe y su rol es Admin ---> cambiara a Client
      else if (user.rol === 'Admin') user.rol = 'Client';
      // guarda los datos cambiados en db
      user.save();
      // devuelve mensaje
      return res
        .status(200)
        .send(`${user.name} te quitamos tus poderes de admin, vuelves a ser Cliente `);
    });
  } else {
    return res.status(401).send('No estas logueado o no eres admin');
  }
};

module.exports = {
  login,
  me,
  userLogout,
  adminAccess,
  adminDelete,
};
