import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift } from "@fortawesome/free-solid-svg-icons";
import { getUserOrders } from "../../Redux/actions";
import CardMisCompras from "./CardMisCompras";
import "./MisCompras.css";

export default function MisCompras() {
  const dispatch = useDispatch();
  // let sumTotal= localStorage.setItem('SumaTotal', JSON.stringify(sumTotal));
  let user = JSON.parse(localStorage.getItem("User"));
  let SumaTotal = JSON.parse(localStorage.getItem("SumaTotal"));
  const [modalCompras, setModalCompras] = useState(false);

  useEffect(() => {
    dispatch(getUserOrders(user.id));
  }, []);
  const userOrders = useSelector((state) => state.userOrders);

  return (
    <div className="Container__Mis__Compras">
      <div className="Container__Title__MisCompras">
        <span className="icon-signin__miPerfil">
          i<FontAwesomeIcon icon={faGift} />
          You
        </span>
        <div className="card__content__miPerfil ">
          <h1>Mis compras </h1>
        </div>
      </div>

      {userOrders && (
        <CardMisCompras
          dataUserCompras={userOrders}
          modalCompras={modalCompras}
          setModalCompras={setModalCompras}
          userOrders={userOrders}
          SumaTotal={SumaTotal}
        />
      )}
    </div>
  );
}
