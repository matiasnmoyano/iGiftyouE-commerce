const { Shoppingcart, Lineorder, Product, User } = require("../../db.js");

//crear ruta para que retorne todas las ordenes
const getAllOrders = (req, res) => {
  const status = req.query.status;
  Shoppingcart.findAll({
    where: {
      status: status,
    },
    include: [{ model: Product }, { model: User }],
  })
    .then((orders) => res.json(orders))
    .catch((err) => res.send(err));
};
//ruta que retorne todas las ordenes de los usuarios
const getUserOrders = (req, res) => {
  const id = req.params.id;
  Shoppingcart.findAll({
    where: {
      userId: id,
    },
    include: [{ model: Product }, { model: User }],
  })
    .then((orders) => res.json(orders))
    .catch((err) => res.send(err));
};
//ruta para modificar una orden
const modifyOrder = (req, res) => {
  const id = req.params.id;
  Shoppingcart.findByPk(id)
    .then((o) => {
      if (req.body.status) o.status = req.body.status;
      o.save();
    })
    .then((o) => res.status(200).send(o))
    .catch((err) => res.send(err));
};

const getOrder = (req, res) => {
  const idCart = req.params.id;
  Shoppingcart.findOne({
    where: {
      id: idCart,
    },
    include: [{ model: Product }],
  }).then((order) => res.json(order));
};

module.exports = {
  getAllOrders,
  getUserOrders,
  modifyOrder,
  getOrder,
};