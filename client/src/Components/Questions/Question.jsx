import React, { useState, useEffect } from "react";
import "./QuestionCard.css";
import {
  getAllQuestions,
  getProductsOfAnswer,
  getProduct,
} from "../../Redux/actions.js";
import { useSelector, useDispatch } from "react-redux";
import ShowProducts from "./ShowProducts.jsx";

export default function Question({ checkIfCartIsEmpty }) {
  const [questions, setQuestions] = useState([]);
  const [productAnswer, setProductAnswer] = useState({});
  const [nohover, setNoHover] = useState(true);
  const [contador, setContador] = useState(1);
  const dispatch = useDispatch();
  //Funcion que mapea los productos una vez que fue finalizado el cuestionario

  const handleHover = () => {
    setNoHover(true);
    console.log("--------------------------------------");
  };
  const handleAnswer = (answer) => {
    let body = { answerBoolean: answer };
    setNoHover(false);
    setContador(contador + 1);
    setTimeout(handleHover, 2000);
    questions[0] &&
      /* dispatch(getProductsOfAnswer(questions[0].id, body)).then((products) => {
        var productObj = [...productAnswer];
        var bool = true;
        products.forEach((idProduct) => {
          productObj.forEach((objProduct) => {
            if (objProduct.hasOwnProperty(idProduct)) {
              objProduct[idProduct] = objProduct[idProduct] + 1;
              bool = false;
            }
          });
          if (bool) productObj.push({ [idProduct]: 0 });
          bool = true;
        });
        setProductAnswer(productObj);
      }); */

      dispatch(getProductsOfAnswer(questions[0].id, body)).then((products) => {
        var productObj = { ...productAnswer };
        products.forEach((idProduct) => {
          if (!productObj.hasOwnProperty(idProduct)) {
            productObj[idProduct] = 1;
          } else {
            productObj[idProduct]++;
          }
        });
        setProductAnswer(productObj);
      });

    var questionArray = [...questions];
    questionArray.shift();
    setQuestions([...questionArray]);
  };

  useEffect(() => {
    getAllQuestions(true).then((arrayQuestions) => {
      var arr = [...arrayQuestions]
        .sort(() => {
          return Math.random() - 0.5;
        })
        .map((x) => {
          return { id: x.id, question: x.question };
        });
      setQuestions(arr.slice(0, 10));
    });
  }, []);

  /* useEffect(() => {
    if (questions.length === 0 && productAnswer.length > 0) {
      //funcion que mapee los productos que estan dentro de productAnswer pero solo los de mayor puntaje
      ShowProducts();
    }
  }, [questions]); */

  return (
    <>
      {questions[0] && (
        <div className="contenedor__Question">
          <h2 className="Question__Number">Pregunta Nº {contador} de 10!</h2>
          <div className={nohover ? "carta" : "carta nohover"}>
            <div className="lado frente">
              <div className="pregunta">
                {questions[0] && questions[0].question}
              </div>
              <div style={{ position: "absolute" }}>
                <img
                  className="Question__Card__Image"
                  src={require("../../Img/questioncard.png")}
                />
              </div>
            </div>
            <div className="lado atras">
              <img
                src={require("../../Img/giftSi.png")}
                onClick={() => handleAnswer(true)}
                className="respuesta"
                style={{ marginRight: "20px" }}
              />

              <img
                src={require("../../Img/giftNo.png")}
                onClick={() => handleAnswer(false)}
                className="respuesta"
                style={{ marginLeft: "20px" }}
              />
              <div style={{ position: "absolute" }}>
                <img
                  className="Question__Card__Image"
                  src={require("../../Img/questioncard.png")}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {/* {questions.length === 0 && productAnswer.length > 0 && showProducts()} */}
      {questions.length === 0 && Object.keys(productAnswer).length > 0 && (
        <ShowProducts
          productAnswer={productAnswer}
          checkIfCartIsEmpty={checkIfCartIsEmpty}
        />
      )}
    </>
  );
}
