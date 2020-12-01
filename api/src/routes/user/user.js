const server = require('express').Router();
const {
	getAllUser,
	getOnlyUser,
	createUser,
	deleteUser,
	modifyUser,
	addItemToCart,
	getAllItemsToCart,
	deleteItemFromCart,
	emptyCart,
	getCart,
	modifyQuantityItem,
	resetPassword,
	emailPassword,
	getUser,
	sendEmailCheckout,
	sendEmailProcess,
	createCart,
	resetPasswordEmail,
	sendEmailCancel,
} = require('./utils.js');
const { isAdmin } = require('../auth/Midlewares');

// ------------------- ROUTE PRODUCTOS ------------------

//Get --> Mostrar todos los users
server.get('/', getAllUser);
//
server.get('/getuser', getUser);

// Get --> Muestra los datos de un solo user
server.get('/:id', getOnlyUser);

//Post --> Crear user
server.post('/', createUser);

//Put --> Modificar un user
server.put('/:id', modifyUser);

//Delete --> Eliminar un user
server.delete('/:id', deleteUser);

//-------CARRRITO DE USUARIO--------
///--crear un carrito----
server.post('/cart/:idUser', createCart)
//Post ----> Agregar item al carrito
server.post('/:idUser/cart', addItemToCart);
//---Traeme el carrito del user
server.get('/cart/:idUser', getCart)
//Get ----->traeme los items del carrito
server.get('/:idUser/cart', getAllItemsToCart);
//delete ------> elimina los items del carrito
server.delete('/:idUser/cart', emptyCart);

server.delete('/:idUser/cart/:idProduct', deleteItemFromCart);
//Put --------> modifica la cantidad de productos
server.put('/:idUser/cart', modifyQuantityItem);

//--------Reset Password---------
server.put('/:id/newpass', resetPassword);

//----olvide mi contrasenia
server.post('/password', emailPassword)
///enviar email de cualquier lado
server.post ('/emailCheckout', sendEmailCheckout)
server.post ('/emailProcess', sendEmailProcess)
server.post ('/emailCancel', sendEmailCancel)

server.put('/newpassemail/:id' , resetPasswordEmail)
module.exports = server;
