import React, { useEffect } from "react";

import "./Oauth.css";
import ButtonHome from "./ButtonHome";
import { Link } from "react-router-dom";
import giftImg from "../Img/gift.png";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart } from "../Redux/actions";

export default function Oauth() {
  const dispatch = useDispatch();

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("User"));

    let tempCart = JSON.parse(localStorage.getItem("Product"));
    console.log(tempCart, "tempCartCompleto");
    //agarrar carrito de local storage

    if (!tempCart) return;

    for (const prop in tempCart) {
      let product = {
        productId: prop,
        price: tempCart[prop].price,
        quantity: tempCart[prop].quantity,
      };

      console.log(product, "producto actual");

      //para cada producto, hacerle un add to cart
      if (!user || !user.id) return;
      dispatch(
        addItemToCart(user.id, product)
      ); /* .then(() => {
        window.location.reload();
      }); */
    }

    localStorage.removeItem("Producto");
  }, []);

  return (
    <>
      <div className="container-home">
        <div className="flex-text">
          <h1 className="title">iGiftYou</h1>
          <h3 className="subtitle">
            ¿No sabés que regalar? Nosotros te ayudamos.{" "}
          </h3>
          <h5 className="subtitle">
            Contestá el cuestionario y encontrá el próximo regalo ideal.
          </h5>
        </div>
        <div className="button_home">
          <div className="flex-buttons-home">
            <div style={{ padding: "15px" }}>
              <Link to={"/quiz"}>
                <ButtonHome name="Contesta el cuestionario" />
              </Link>
            </div>
            <div style={{ padding: "15px" }}>
              {" "}
              <Link to={"/products"}>
                <ButtonHome name="Ir a tienda" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="gift_home">
        <img src={giftImg}></img>
        <img src={giftImg}></img>
        <img src={giftImg}></img>
        <img src={giftImg}></img>
        <img src={giftImg}></img>
        <img src={giftImg}></img>
        <img src={giftImg}></img>
        <img src={giftImg}></img>
        <img src={giftImg}></img>
      </div>
    </>
  );
}
