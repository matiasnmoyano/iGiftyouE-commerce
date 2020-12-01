const server = require("express").Router();

const {
  getAllOrders,
  getUserOrders,
  modifyOrder,
  getOrder,
} = require("./utils.js");

//ruta que retorne todas las ordenes
server.get("/status", getAllOrders);

//ruta que retorne todas las ordenes de los usuarios
server.get("/users/:id/orders", getUserOrders);

//ruta para modificar una orden
server.put("/:id", modifyOrder);

//ruta que retorne una orden en particular
server.get("/:id", getOrder);

module.exports = server;
