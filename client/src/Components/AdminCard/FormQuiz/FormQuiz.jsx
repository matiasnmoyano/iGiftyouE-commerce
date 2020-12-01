import React, { useState, useEffect } from "react";
import "./FormQuiz.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import { faGift } from "@fortawesome/free-solid-svg-icons";
import {
  getAllQuestions,
  getProductsOfAnswer,
} from "../../../Redux/actions.js";
import MiniProducts from "./MiniProducts/MiniProducts.jsx";
import QuestionCard from "./QuestionCard.jsx";
import swal from "sweetalert";

export default function FormQuiz() {
  const [edit, setEdit] = useState({}); // [{1:false}. {2:false}]
  const [questions, setQuestions] = useState({});
  const [oldQuestions, setOldQuestions] = useState({});
  const [input, setInput] = useState();
  const [inputAddQuestion, setInputAddQuestion] = useState();
  const [showProducts, setShowProducts] = useState(false);
  const [goAhead, setGoAhead] = useState(false);
  const [products, setProducts] = useState([]);

  //-----------------HELPER FUNCTION PARA COPIAR RECURSIVAMENTE UN OBJETO POR VALOR-----------------

  //de esta manera podemos hacer un solo getAllQuestions y guardar en oldQuestions el estado original sin que se vea modificado por acciones del usuario

  const deepCopy = (inObject) => {
    let outObject, value, key;

    if (typeof inObject !== "object" || inObject === null) {
      return inObject; // si no es objeto, devolvé el valor
    }

    // crea array u objeto para guardar los valores
    outObject = Array.isArray(inObject) ? [] : {};

    for (key in inObject) {
      value = inObject[key];

      //copiá recursivamente
      outObject[key] = deepCopy(value);
    }

    return outObject;
  };

  //-----------------USE EFFECT-----------------

  //-----------------GET ALL QUESTIONS----------------------
  useEffect(() => {
    getAllQuestions(true).then((arrayQuestions) => {
      arrayQuestions &&
        arrayQuestions.forEach((q) => {
          //habíamos intentado usar setQuestions pero daba problemas porque cuando quería agregar el valor nuevo al valor viejo
          //todavía no había "llegado" el valor viejo a estado, así que se pisaban

          questions[q.id] = q;
          oldQuestions[q.id] = deepCopy(q);

          //usamos la helper function para guardar el estado original de preguntas tal como viene de la base de datos
        });
      //-----------------GET PRODUCTS----------------------
      Axios.get(`${process.env.REACT_APP_API_URL}/products/`).then(
        (arrayProducts) => {
          var arr = [...arrayProducts.data];
          setProducts(arr);
        }
      );
      setGoAhead(true);
    });
  }, []);

  //-----------------AGREGAR VINCULACIÓN ENTRE PRODUCTO Y PREGUNTA----------------------

  const addProductToQuestion = (questionId, productId, booleanAnswer) => {
    Axios.post(
      `${process.env.REACT_APP_API_URL}/question/${questionId}/products/${productId}`,
      {
        booleanAnswer,
      }
    );
  };

  //-----------------ELIMINAR VINCULACIÓN ENTRE PRODUCTO Y PREGUNTA----------------------
  const removeProductFromQuestion = (questionId, productId) => {
    Axios.delete(
      `${process.env.REACT_APP_API_URL}/question/${questionId}/products/${productId}`
    );
  };

  //-----------------MODIFICAR VINCULACIÓN ENTRE PRODUCTO Y PREGUNTA----------------------
  const modifyProductFromQuestion = (questionId, productId, booleanAnswer) => {
    Axios.put(
      `${process.env.REACT_APP_API_URL}/question/${questionId}/products/${productId}`,
      {
        booleanAnswer,
      }
    );
  };

  //-----------------MODIFICAR LAS VINCULACIONES DE CADA PREGUNTA CON CADA PRODUCTO----------------------

  const updateProductBindings = (questionId, product) => {
    let newBooleanAnswer = product.questionproduct.booleanAnswer;
    //agarramos el nuevo dato de vinculación (true, false o null)

    let oldProduct = oldQuestions[questionId].products.find(
      (prod) => prod.id === product.id
    );
    //nos fijamos si el producto que ahora está vinculado antes también estaba vinculado con esta pregunta (con true o false)
    let oldBooleanAnswer = null;
    if (oldProduct) oldBooleanAnswer = oldProduct.questionproduct.booleanAnswer;
    //si ya estaba vinculado, agarramos el booleano con el que estaba vinculado. Si no, sigue siendo null.

    if (newBooleanAnswer === oldBooleanAnswer) return;
    //si no hubo un cambio entre el estado original y el estado que incluye cambios del usuario
    //lógicamente no debería cambiarse nada en la base de datos

    if (oldBooleanAnswer === null)
      addProductToQuestion(questionId, product.id, newBooleanAnswer);
    //si las boolean answer no son las mismas *y* la vieja era null, entonces la nueva es true o false y en cualquier caso hay que crear una vinculación nueva
    else if (newBooleanAnswer === null)
      removeProductFromQuestion(questionId, product.id);
    //si las boolean answer no son las mismas *y* la nueva es null, entonces hay que borrar la vinculación
    else {
      modifyProductFromQuestion(questionId, product.id, newBooleanAnswer);
      //el único caso que quedaría es que haya un cambio de true a false y viceversa, así que hay que modificar la vinculación
    }
  };

  //-----------------MODIFICAR LAS VINCULACIONES DE CADA PREGUNTA CON SUS PRODUCTOS----------------------

  const updateQuestionBindings = (questionId) => {
    questions[questionId].products.forEach((product) =>
      updateProductBindings(questionId, product)
    );
  };

  //-----------------MODIFICAR LAS VINCULACIONES DE TODAS LAS PREGUNTAS CON SUS PRODUCTOS----------------------
  const handleSubmit = () => {
    swal({
      title: "Guardar cambios",
      text: "Estas seguro que deseas guardar los cambios?",
      icon: "info",
      buttons: ["No", "Si"],
    }).then((respuesta) => {
      if (respuesta) {
        Object.keys(questions).forEach((questionId) =>
          updateQuestionBindings(questionId)
        );
        setShowProducts(false);
        //delete questions[id];

        swal({
          title: "Cambio exitoso",
          text: `Se han guardado los cambios!`,
          icon: "success",
          button: "Aceptar",
        });
      }
    });
  };

  //-----------------AGREGAR PREGUNTA----------------------
  const addQuestion = () => {
    if (inputAddQuestion) {
      Axios.post(`${process.env.REACT_APP_API_URL}/question/`, {
        question: inputAddQuestion,
      })
        .then(() => {
          getAllQuestions(true).then((objQuestions) => {
            setQuestions(objQuestions);
          });
        })
        .then(() => window.location.reload());
      setInputAddQuestion("");
    }
  };
  //------------------MODIFICAR PREGUNTA-------------------
  const saveChange = (id) => {
    setEdit({});
    if (input) {
      Axios.put(`${process.env.REACT_APP_API_URL}/question/${id}`, {
        question: input,
      });
      questions[id].question = input;
    }
  };

  //-----------------ELIMINAR PREGUNTA---------------------
  const deleteCurrentQuestion = (id, setDeleted) => {
    swal({
      title: "Eliminar pregunta",
      text: "Estas seguro que deseas eliminar esta pregunta?",
      icon: "info",
      buttons: ["No", "Si"],
    }).then((respuesta) => {
      if (respuesta) {
        Axios.delete(`${process.env.REACT_APP_API_URL}/question/${id}`);
        //delete questions[id];
        questions[id].id = -1;
        setDeleted(true);
        /*     setDeleted(false); */
        swal({
          title: "Cambio exitoso",
          text: `Se ha eliminado la pregunta`,
          icon: "success",
          button: "Aceptar",
        });
      }
    });
  };

  //-----------------MODIFICAR VINCULACIÓN ENTRE PREGUNTA Y PRODUCTO EN ESTADO---------------------
  const setBooleanAnswers = (idProduct, idQuestion, newAnswer) => {
    //si el producto ya está vinculado con la pregunta alcanza con encontrarlo y cambiar su booleanAnswer
    //para eso es el código de acá abajo

    //let questionProducts = [...products];

    let productIndex;

    if (questions && questions[idQuestion] && questions[idQuestion].products)
      productIndex = questions[idQuestion].products.findIndex(
        (p) => p.id === idProduct
      );
    //ahí arriba simplemente intentamos encontrar el índice del producto dentro de los ya vinculados con la pregunta, si se puede, tratanoo de no romper todo

    //SI NO ESTABA VINCULADO EL PRODUCTO CON LA QUESTION ENTONCES NO ENTRA AL IF!
    if (productIndex >= 0) {
      let currentProduct = { ...questions[idQuestion].products[productIndex] };
      if (currentProduct.questionproduct.booleanAnswer === newAnswer)
        newAnswer = null;
      //lo de acá arriba es importante para que el usuario pueda "destildar" ambos checks, o sea, desvincular un producto de una pregunta
      //(si no, siempre quedaría como true o como false)
      currentProduct.questionproduct.booleanAnswer = newAnswer;
      //ahí cambiamos la respuesta por true, false o null, según corresponda

      setQuestions({
        ...questions,
        [idQuestion]: {
          ...questions[idQuestion],
          products: [
            ...questions[idQuestion].products.slice(0, productIndex),
            currentProduct,
            ...questions[idQuestion].products.slice(productIndex + 1),
          ],
        },
      });
    } else {
      let productIndex = products.findIndex((p) => p.id === idProduct);
      let newProduct = { ...products[productIndex] };
      newProduct.questionproduct = {
        booleanAnswer: newAnswer,
      };
      //en este caso, entonces, el producto que queremos vincular va a estar en el array de products pero no en questions[idQuestion].products
      //primero lo buscamos en "products"
      //después le seteamos true o false en la nueva propiedad booleanAnswer dentro de la nueva propiedad questionproduct
      //o sea, simulamos la estructura de un producto que viene incluido con el eager loading de sequelize al traernos las preguntas

      setQuestions({
        ...questions,
        [idQuestion]: {
          ...questions[idQuestion],
          products: [...questions[idQuestion].products, newProduct],
        },
      });

      //por último, lo agregamos al gran objeto "questions".
      //la próxima vez que el usuario quiera que esté tildado un check (o el otro, o ninguno) referido a este producto,
      //va a pasar por esta función y va a ingresar al if de arriba en vez de volver al else
      //porque no va a saber distinguir que no estaba vinculado de entrada con la question en cuestión
    }
  };
  //---------------------------------------------------------
  return (
    <>
      <h4 className="subtitle">
        We <FontAwesomeIcon icon={faGift} /> you... El cuestionario!
      </h4>
      <div className="Flex__Container__Question">
        <div className="Container__Questions">
          {goAhead &&
            Object.keys(questions).map((questionId, index) => {
              let { id, question } = questions[questionId];
              if (index < 0) return null;
              return (
                <QuestionCard
                  question={question}
                  key={id}
                  id={id}
                  setEdit={setEdit}
                  edit={edit}
                  saveChange={saveChange}
                  setShowProducts={setShowProducts}
                  deleteCurrentQuestion={deleteCurrentQuestion}
                  setInput={setInput}
                />
              );
            })}{" "}
          {/* ------------------------Fin del map--------------------------- */}
          {/* -----------------BUTTON ADD QUESTION---------------------------- */}
          <div className="button-plus-question animation">
            <input
              className="Input__Question"
              onChange={(e) => setInputAddQuestion(e.target.value)}
              value={inputAddQuestion}
            ></input>
            <button onClick={addQuestion} className="Button__AddQuestion">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-plus"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div>
          {showProducts && (
            <MiniProducts
              idQuestion={showProducts}
              question={questions[showProducts]}
              setBooleanAnswers={setBooleanAnswers}
              products={products}
            />
          )}
          {showProducts && (
            <div>
              <button className="Button__Save__Question" onClick={handleSubmit}>
                Guardar
              </button>
              <button
                className="Button__Save__Question"
                onClick={() => setShowProducts(false)}
              >
                Cerrar
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
