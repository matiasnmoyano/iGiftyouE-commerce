import React, { useEffect } from "react";

import "./Home.css";
import ButtonHome from "./ButtonHome";
import { Link } from "react-router-dom";
import giftImg from "../Img/gift.png";

export default function Home() {
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
