import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ButtonAddCard.css";
//import Axios from "axios"
import swal from "sweetalert";
import { useSelector, useDispatch } from "react-redux";
import { getProduct, addItemToCart } from "../Redux/actions.js";

export default function ButtonQuantity({
  name,
  price,
  quantity,
  id,
  stock,
  actualizarPrecio,
  checkIfCartIsEmpty,
}) {
  let [count, setCount] = useState(quantity);

  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  //Agarramos lo que esta en Local Storage

  let tempCart = JSON.parse(localStorage.getItem("Product"));

  function decrement() {
    if (count < 2) return;
    let countG = count - 1;
    actualizarPrecio(countG);
    setCount(countG);

    const userActive = JSON.parse(localStorage.getItem("User"));
    let userId;

    if (userActive) {
      userId = userActive.id;

      let newProduct = {
        productId: id,
        price,
        quantity: countG,
      };

      dispatch(addItemToCart(userId, newProduct));
      //return
    } else {
      if (tempCart && tempCart.hasOwnProperty([id])) {
        count -= 1;
      }
      tempCart[id] = {
        name,
        price,
        quantity: countG,
      };
      checkIfCartIsEmpty();

      localStorage.setItem("Product", JSON.stringify(tempCart));
    }
  }
  function increment() {
    if (count < stock) {
      let countG = count + 1;
      actualizarPrecio(countG);
      setCount(countG);

      const userActive = JSON.parse(localStorage.getItem("User"));
      let userId;

      if (userActive) {
        userId = userActive.id;

        let newProduct = {
          productId: id,
          price,
          quantity: countG,
        };

        dispatch(addItemToCart(userId, newProduct));
        //return;
      } else {
        if (tempCart.hasOwnProperty([id])) {
          count += 1;
        }
        tempCart[id] = {
          name,
          price,
          quantity: countG,
        };

        localStorage.setItem("Product", JSON.stringify(tempCart));
      }
    }
  }
  function handleChange(e) {
    const newCount = parseInt(e.target.value);
    if (newCount > stock) {
      //swal!
      return;
    }
    if (!newCount || Number.isNaN(newCount) || newCount < 1) return;
    setCount(newCount);
  }

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
    </div>
  );
}
