const { Review, Product, Lineorder, Shoppingcart } = require("../../db.js");
const { Op } = require("sequelize");

// ruta para un nuevo Review y despues guardarlo en la base de datos
const createReview = (req, res) => {
  const { id } = req.params;
  const { description, rating, userId } = req.body;

/*   let dbSearch = {
    idsOfShoppingCartsBelongingToUser: [],
  };

  console.log(description, ":descripción");
  console.log(rating, ":rating");
  console.log(userId, ":userId");
  console.log(id, ":ProductId"); */

  

  const checkUserReview = Review.findOne({
    where: {
      userId,
      productId: id,
    },
  });

  checkUserReview.then(previousReview => {
    console.log(previousReview, "previousReview")
    if (previousReview) return;
    console.log("si llego hasta acá debería estar la review :(")
    //que solo cree una review si no había otra antes

    Review.create({ rating, description, userId, productId: id })
    .then(review => res.status(201).send(review))
    .catch(err => res.send(err));
  });

  /* const userShoppingCarts = Shoppingcart.findAll({
    where: {
      userId,
      //status: ... (creado? completado?)
      //chequear que la compra haya sido completada (con status)!
    },
  });

  userShoppingCarts
    .then((shoppingcartsFound) =>
      shoppingcartsFound.forEach((cart) => {
        dbSearch.idsOfShoppingCartsBelongingToUser.push(cart.id);
      })
    )
    .then(() => {
      dbSearch.idsOfShoppingCartsBelongingToUser.forEach((cartId) => {
        Lineorder.findOne({
          where: {
            productId: id,
            shoppingcartId: cartId,
          },
        }).then(userMadePurchase => {
          //dbSearch.userMadePurchase = true;
          if(userMadePurchase) {
            checkUserReview.then(review => {
              if (review) return;
          
              Review.create({ rating, description, userId, productId: id })
              .then((review) => res.status(201).send(review))
              .catch((err) => res.send(err));
          
            })
          }})
        });
      }); */
      

  /* Review.findOrCreate({
    where: {
      productId: id,
      userId,
    }, // buscamos si el usuario ya hizo una review de este producto
    defaults: {
      description,
      rating,
    }, // si no la hizo, la creamos ahora con los datos enviados desde el cliente
  }) */
  };

//ruta para crear review con nombre de producto (para PostMan)
const createReviewNameProduct = (req,res) =>{
  const { nombreProducto } = req.params;
  const { rating , descriptionAndRating } = req.body;
  var  ratingF=rating;
  Product.findOne({ where: { name: nombreProducto } })
  .then((product) =>{
    var id = product.id;
    for (let i = 0; i < descriptionAndRating.length; i++) {
      var userId=i+1;
      var description=descriptionAndRating[i].des;

      if(rating===0) ratingF=descriptionAndRating[i].rat
    Review.create({ rating: ratingF, description, userId, productId: id })
    .catch(err => res.send(err));
    }
  })
  .then(() => res.status(201).send("Se pudieron mandar las reviews"))
  .catch((err) => res.send(err));
}
  

//ruta para Modificar Review con su id
const modifyReview = (req, res) => {
  const { id, idReview } = req.params;
  Review.findByPk(idReview)
    .then((review) => {
      if (req.body.description) {
        review.description = req.body.description;
        review.save();
      }
      if (req.body.rating) {
        review.rating = req.body.rating;
        review.save();
      }
      return review.save();
    })
    .then((review) => res.status(200).send(review))
    .catch((err) => res.send(err));
};

//DELETE /product/:id/review/:idReview
const deleteReview = (req, res) => {
  const { id, idReview } = req.params;
  Review.findOne({
    where: {
      id: idReview,
      productId: id,
    },
  })
    .then((review) => review.destroy())
    .then((review) => res.status(200).send(review))
    .catch((err) => res.send(err));
};

//GET /product/:id/review/
const getAllReviewsOfProduct = (req, res) => {
  const productId = req.params.id;
  Review.findAll({
    where: {
      productId,
    },
    include: [{ model: Product }],
    //incluimos datos de los productos
  })
    .then((review) => res.status(200).send(review))
    .catch((err) => res.send(err));
};

module.exports = {
  createReview,
  modifyReview,
  deleteReview,
  getAllReviewsOfProduct,
  createReviewNameProduct,
};
