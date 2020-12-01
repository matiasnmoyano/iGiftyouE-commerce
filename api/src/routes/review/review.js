const server = require("express").Router();

const {
    createReview,
    modifyReview,
    deleteReview,
    getAllReviewsOfProduct,
    createReviewNameProduct,
} = require("./utils.js");

// ------------------- ROUTE REVIEWS ------------------

//Post --> Crear review
server.post('/:id/review', createReview);

//Post --> Crear review con nombre de producto (para PostMan)
server.post('/:nombreProducto/reviewName', createReviewNameProduct);

//Put --> Modificar review
server.put('/:id/review/:idReview', modifyReview)

//DELETE --> /product/:id/review/:idReview
server.delete("/:id/review/:idReview", deleteReview);

//GET --> /product/:id/review/
server.get("/:id/review", getAllReviewsOfProduct);

module.exports = server;

