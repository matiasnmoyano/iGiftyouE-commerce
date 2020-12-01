const { Router } = require("express");
// import all routers;
const productRouter = require("./product/product.js");
const userRouter = require("./user/user.js");
const shoppingRouter = require("./shoppingcart/shoppingcart.js");
const reviewRouter = require("./review/review.js");
const auth = require("./auth/auth");
const question = require("./question/question.js");
const router = Router();
const { User } = require('../db');
const nodemailer = require ('nodemailer')
// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use("/products", productRouter);
router.use("/products", reviewRouter);
router.use("/users", userRouter);
router.use("/orders", shoppingRouter);
router.use("/auth", auth);
router.use("/question", question);
router.post("/admincreate", (req, res) => {
  User.create({
    name: "Admin",
    username: "Admin",
    rol: "Admin",
    email: "admin@admin.com",
    password: "admin",
  })
    .then((admin) => {
      return res.send("Admin Creado");
    })
    .catch((error) => res.status(400).send("Ya existe un admin"));
});
module.exports = router;
