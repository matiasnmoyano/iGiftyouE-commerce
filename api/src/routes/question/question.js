const server = require("express").Router();

const {
  getAllQuestions,
  getSingleQuestion,
  createQuestion,
  modifyQuestion,
  deleteQuestion,
  addProductToQuestion,
  addProductToQuestionByName,
  removeProductFromQuestion,
  modifyProductFromQuestion,
  answerBoolean,
  createQuestionName,
} = require("./utils.js");

// ------------------- ROUTE QUESTION ------------------

//Get --> Mostrar todos las question
server.get("/", getAllQuestions);

//Get --> Mostrar una sola question por su id
server.get("/:id", getSingleQuestion);
//Get --> Mostrar la respuesta(productos asociados) de una question por su id y
//por la answer si es true o false
server.post("/answer/:id", answerBoolean);
//Post --> Crear question 
server.post("/", createQuestion);
//Post --> Crear question name product
server.post("/nameProducts", createQuestionName);
//Post --> Asociar producto a question
server.post("/:idQuestion/products/:idProduct", addProductToQuestion);
//Delete --> Desvincular producto de question
server.delete("/:idQuestion/products/:idProduct", removeProductFromQuestion);
//Put --> Modificar producto de question
server.put("/:idQuestion/products/:idProduct", modifyProductFromQuestion);
//Post --> Asociar producto a question en base al nombre del producto
server.post("/:idQuestion/productsbyname/:nameProduct", addProductToQuestionByName);
//Put --> Modificar un question
server.put("/:id", modifyQuestion);
//Delete --> Eliminar una question
server.delete("/:id", deleteQuestion);

module.exports = server;
