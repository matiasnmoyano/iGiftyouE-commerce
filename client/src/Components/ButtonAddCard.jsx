import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ButtonAddCard.css";
import swal from "sweetalert";
//import Axios from "axios"
import { useSelector, useDispatch } from "react-redux";

import { getProduct, addItemToCart } from "../Redux/actions.js";

export default function ButtonAddCard({ price, checkIfCartIsEmpty }) {
  const { id } = useParams();
  let [count, setCount] = useState(1);
  let [stock, setStock] = useState();

  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  //const { currentProduct } = state;
  function increment() {
    if (count < stock) {
      setCount(count + 1);
    }
  }
  function decrement() {
    if (count !== 1) {
      setCount(count - 1);
    }
  }

  function handleChange(e) {
    const newCount = parseInt(e.target.value);
    if (!newCount || Number.isNaN(newCount) || newCount < 1 || newCount > stock)
      return;
    setCount(newCount);
  }

  function addToCart() {
    let quantity = count;

    const userActive = JSON.parse(localStorage.getItem("User"));
    let userId;

    if (userActive) {
      userId = userActive.id;

      let newProduct = {
        productId: id,
        price,
        quantity,
      };
      dispatch(addItemToCart(userId, newProduct)).then(() => {
        checkIfCartIsEmpty();
      });
    } else {
      let tempCart = JSON.parse(localStorage.getItem("Product"));

      if (!tempCart) tempCart = {};

      if (tempCart.hasOwnProperty([id])) {
        quantity += tempCart[id].quantity;
      }
      tempCart[id] = {
        price,
        quantity,
      };

      localStorage.setItem("Product", JSON.stringify(tempCart));

      checkIfCartIsEmpty();
    }

    swal({
      title: "Se agrego al carrito",
      text: "podras ver tu articulo en el carrito",
      icon: "success",
      button: "Aceptar",
    });
  }

  useEffect(() => {
    getProduct(id, true).then(({ stock }) => setStock(stock));
  }, []);

  if (stock === 0)
    return <button className="buttonOutOfStock">No hay stock :(</button>;

  return (
    <div className="container_button">
      <input
        className="inp"
        type="text"
        value={count}
        onChange={handleChange}
      ></input>

      <div className="arrowsContainer">
        <div className="arrowContainer">
          <button className="arrows" onClick={() => increment()}>
            <svg
              width="1em"
              height="10px"
              viewBox="0 0 16 16"
              className="bi bi-chevron-up"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
              />
            </svg>
          </button>
        </div>
        <div className="arrowContainer">
          <button className="arrows" onClick={() => decrement()}>
            <svg
              width="1em"
              height="10px"
              viewBox="0 0 16 16"
              className="bi bi-chevron-down"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </button>
        </div>
      </div>
      <button
        className="buttonSubmit"
        onClick={() => addToCart()}
        type="submit"
      >
        Añadir al carrito
      </button>
    </div>
  );
}
