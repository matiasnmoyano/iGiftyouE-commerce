import React, { useState, useEffect } from "react";
import { getProduct } from "../../Redux/actions.js";
import ProductCard from "../ProductCard.jsx";
import "./ShowProducts.css";
export default function ShowProducts({ productAnswer, checkIfCartIsEmpty }) {
  const [arrayProductsWin, setArrayProductsWin] = useState([]);

  useEffect(() => {
    var num = 1;
    let win = Object.keys(productAnswer).sort((a, b) => {
      return productAnswer[b] - productAnswer[a];
    });
    console.log(win, "----------------------------------");

    //el -2 es por -1 (posición máxima del array) -1 (le resto el mínimo)
    const rand1 = parseInt(Math.random() * (win.length - 2) + 1);
    const rand2 = parseInt(Math.random() * (win.length - 2) + 1);
    let randProd1 = win[rand1];
    let randProd2 = win[rand2];

    if (rand1 === rand2) {
      if (win[rand1 + 1]) {
        randProd2 = win[rand1 + 1];
      } else if (win[rand1 - 1]) {
        randProd2 = win[rand1 - 1];
      } else {
        randProd2 = null;
      }
    }
    //check de arriba es medio redundante, solo hay problema si el array es de 2 elementos

    let finalWin = [win[0]];

    if (randProd1) finalWin.push(randProd1);
    if (randProd2) finalWin.push(randProd2);

    console.log(rand1, "rand");
    console.log(randProd1, "randProd");
    console.log(rand2, "rand");
    console.log(randProd2, "randProd");
    //metele nomás
    //para testearlo mejor, poné todo que sí o todo que no, y después hacé lo mismo, a ver si es realmente random
    var arrayProducts = [];

    finalWin.forEach((idProduct) => {
      getProduct(idProduct, true)
        .then((product) => {
          arrayProducts.push(product);
        })
        .then(() =>
          setArrayProductsWin([...arrayProductsWin, ...arrayProducts])
        );
    });
  }, []);

  return (
    <>
      <div className="Container__Question__ProductCard">
        <h2 className="Title__Question__Products">
          Estos son tus regalos recomendados!
        </h2>
        <div style={{ display: "flex" }}>
          {arrayProductsWin[0] &&
            arrayProductsWin.map((product) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div className="Product__Card__Question__Flex">
                    <img
                      className="Question__Heart"
                      src={require("../../Img/heart.png")}
                    />
                    <ProductCard
                      product={product}
                      checkIfCartIsEmpty={checkIfCartIsEmpty}
                    />
                  </div>
                  <div>
                    <img
                      style={{ width: "390px", padding: 0 }}
                      src={require("../../Img/box.png")}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
