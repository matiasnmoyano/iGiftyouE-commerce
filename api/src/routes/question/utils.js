const { Product, Question, Questionproduct } = require("../../db.js");
const { Op } = require("sequelize");

//Get --> Mostrar todos las question
const getAllQuestions = (req, res, next) => {
  Question.findAll({
    include: [{ model: Product }],
  })
    .then((questions) => {
      res.send(questions);
    })
    .catch(next);
};
//Get --> Mostrar una sola question por su id
const getSingleQuestion = (req, res, next) => {
  let { id } = req.params;
  Question.findOne({
    where: {
      id,
    },
    include: [{ model: Product }],
  })

    .then((question) => {
      res.status(200).send(question);
    })
    .catch(next);
};

//Post--> Mostrar la respuesta(productos asociados) de una question por su id y
//por la answer si es true o false

const answerBoolean = (req, res, next) => {
  let { id } = req.params;
  let { answerBoolean } = req.body;

  Questionproduct.findAll({
    where: {
      questionId: id,
      booleanAnswer: answerBoolean,
    },
    attributes: ["productId"],
  })
    .then((arrProducts) => {
      var arrId = arrProducts.map((produId) => produId.productId);
      return arrId;
    })
    .then((arrId) => {
      res.status(200).send(arrId);
    })
    .catch((err) => res.send(err));
};

//Post --> Crear question
const createQuestion = (req, res, next) => {
  const { question, productsIdTrue, productsIdFalse } = req.body;
  if (
    !question
    //|| !productsIdTrue[0] || !productsIdFalse[0]
  ) {
    return res.status(400).send("Faltan campos requeridos");
  }
  Question.create({
    question,
  })
    .then(function (question) {
      if (!productsIdTrue) productsIdTrue = [];
      productsIdTrue.map((proId) => {
        Questionproduct.create({
          productId: proId,
          questionId: question.id,
          booleanAnswer: true,
        });
      });
      if (!productsIdFalse) productsIdFalse = [];
      productsIdFalse.map((proId) => {
        Questionproduct.create({
          productId: proId,
          questionId: question.id,
          booleanAnswer: false,
        });
      });
      return question;
    })
    .then((question) => {
      res.status(201);
      res.send(question);
    })
    .catch((err) => res.send(err));
  //.catch(next);
};

//Post --> Crear question name
const createQuestionName = (req, res, next) => {
  const { question, productsTrue, productsFalse } = req.body;
  if (
    !question
    //|| !productsIdTrue[0] || !productsIdFalse[0]
  ) {
    return res.status(400).send("Faltan campos requeridos");
  }
  Question.create({
    question,
  })
    .then(function (question) {
      productsTrue.map((name)=>{
        Product.findOne({
          where: {
            name: name,
          }})
          .then((produ)=>{
            Questionproduct.create({
              productId: produ.id,
              questionId: question.id,
              booleanAnswer: true,
            });
          })
      })
      productsFalse.map((name)=>{
        Product.findOne({
          where: {
            name: name,
          }})
          .then((produ)=>{
            Questionproduct.create({
              productId: produ.id,
              questionId: question.id,
              booleanAnswer: false,
            });
          })
      })
     return question;
    })
    .then((question) => {
      res.status(201);
      res.send(question);
    })
    .catch((err) => res.send(err));
  //.catch(next);
};

//Post --> Asociar un producto a una question
const addProductToQuestion = (req, res, next) => {
  let { idQuestion, idProduct } = req.params;
  let { booleanAnswer } = req.body;
  Questionproduct.create({
    productId: idProduct,
    questionId: idQuestion,
    booleanAnswer: booleanAnswer,
  })
    .then((x) => res.status(201).json(x))
    .catch((err) => res.send(err));
};

const removeProductFromQuestion = (req, res, next) => {
  let { idQuestion, idProduct } = req.params;
  Question.findOne({
    where: {
      id: idQuestion,
    },
  })
    .then((question) => {
      question.removeProduct(idProduct);
    })
    .then(() =>
      res
        .status(201)
        .json(
          `El producto ${idProduct} y la pregunta ${idQuestion} fueron desvinculados con éxito`
        )
    )
    .catch((err) => res.send(err));
};

const modifyProductFromQuestion = (req, res, next) => {
  let { idQuestion, idProduct } = req.params;
  let { booleanAnswer } = req.body;
  Questionproduct.findOne({
    where: {
      productId: idProduct,
      questionId: idQuestion,
    },
  })
    .then((questionproduct) => {
      if (!questionproduct)
        return res
          .status(201)
          .json(
            `El producto ${idProduct} y la pregunta ${idQuestion} no estaban vinculadas`
          );
      if (typeof booleanAnswer === "boolean") {
        questionproduct.booleanAnswer = booleanAnswer;
        questionproduct.save();
      }
    })
    .then(() =>
      res
        .status(201)
        .json(
          `El producto ${idProduct} y la pregunta ${idQuestion} fueron revinculados a ${booleanAnswer} con éxito`
        )
    )
    .catch((err) => res.send(err));
};

const addProductToQuestionByName = (req, res, next) => {
  let { idQuestion, nameProduct } = req.params;
  let { booleanAnswer } = req.body;
  console.log(nameProduct, "nameProduct");

  Product.findOne({
    where: {
      name: nameProduct,
    },
  }).then((prod) => {
    Questionproduct.create({
      productId: prod.id,
      questionId: idQuestion,
      booleanAnswer: booleanAnswer,
    })
      .then((x) => res.status(201).json(x))
      .catch((err) => res.send(err));
  });
};

//Put --> Modificar un question
const modifyQuestion = (req, res, next) => {
  let { id } = req.params;
  Question.findByPk(id)
    .then((q) => {
      if (req.body.question) {
        q.question = req.body.question;
        q.save();
      }
      if (req.body.rating) {
        q.rating = parseInt(req.body.rating);
        q.save();
      }
      return q.save();
    })
    .then((q) => res.status(200).send(q))
    .catch(next);
};

//Delete --> Eliminar una question
const deleteQuestion = (req, res, next) => {
  Question.findByPk(req.params.id)
    .then((p) => p.destroy())
    .then((p) => res.status(200).send(p))
    .catch(next);
};

module.exports = {
  getAllQuestions,
  getSingleQuestion,
  createQuestion,
  addProductToQuestion,
  removeProductFromQuestion,
  modifyProductFromQuestion,
  addProductToQuestionByName,
  modifyQuestion,
  deleteQuestion,
  answerBoolean,
  createQuestionName,
};
