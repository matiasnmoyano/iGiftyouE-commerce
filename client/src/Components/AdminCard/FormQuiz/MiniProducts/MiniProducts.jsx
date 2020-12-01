import React, { useState, useEffect } from "react";
import "./MiniProducts.css";
import Axios from "axios";
import MiniProductCard from "./MiniProductCard.jsx";

export default function MiniProducts({
  idQuestion,
  question,
  setBooleanAnswers,
  products,
}) {
  //pasé products para arriba porque lo necesito para poder usar la función de setBooleanAnswers

  //const [bindings, setBindings] = useState({});

  if (!question) return null;

  return (
    <>
      <div className="Mini__Products__Container">
        <h4 style={{ fontFamily: "Poppins, sans serif" }}>
          {question && question.question}
        </h4>
        {products &&
          products.map((p, i) => {
            return (
              <MiniProductCard
                name={p.name}
                id={p.id}
                qProduct={question.products.find((prod) => prod.id === p.id)}
                idQuestion={idQuestion}
                setBooleanAnswers={setBooleanAnswers}
              />
            );
          })}
      </div>
    </>
  );
}
