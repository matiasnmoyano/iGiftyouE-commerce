import React from "react";
import { Card } from "react-bootstrap";
import Axios from "axios";
import swal from "sweetalert";
import "./CardInfoCompras.css";
import { Link } from "react-router-dom";
export default function CardInfoCompras({
  dataUserCompras,
  SumaTotal,
  id,
  setModalCompras,
}) {
  const orden = dataUserCompras.find((o) => id === o.id);
  const handleStatus = (id) => {
    swal({
      title: "Cancelar orden",
      text: "Estas seguro que deseas cancelar esta orden?",
      icon: "info",
      buttons: ["No", "Si"],
    }).then((respuesta) => {
      if (respuesta) {
        Axios.put(`${process.env.REACT_APP_API_URL}/orders/${id}`, {
          status: "cancelado",
        });
        Axios.get(`${process.env.REACT_APP_API_URL}/orders/${id}`) // me traigo el carrito
          .then((shoppingcart) => {
            shoppingcart.data.products.forEach((product) => {
              let stock = product.lineorder.quantity;
              //para cada producto del carrito, le vuelvo a poner el stock
              Axios.put(
                `${process.env.REACT_APP_API_URL}/products/modifystock/${product.id}`,
                {
                  stock: 0 - stock,
                }
              );
            });
          });
        swal({
          title: "Cambio exitoso",
          text: `se ha cancelado la orden`,
          icon: "success",
          button: "Aceptar",
        }).then(() => window.location.reload());
      }
    });
  };

  var arrsubtotal = orden.products.map(
    (p) =>
      (arrsubtotal = +(parseInt(p.lineorder.price, 10) * p.lineorder.quantity))
  );

  var subtotal = arrsubtotal.reduce((a, b) => a + b, 0);

  return (
    <>
      <div className="CardInfoCompras__Container">
        <div /* className="Text__Info__MisCompras" */>
          {orden && orden.status !== "vacio" ? (
            <div key={orden.id}>
              <h4>Estado de la orden: {orden.status}</h4>
              <p>Fecha: {orden.createdAt}</p>
              <div>
                {orden.products &&
                  orden.products.map((p) => {
                    return (
                      <div key={p.id} style={{ marginBottom: "30px" }}>
                        <Link
                          to={`/product/${p.id}`}
                          className="Link__MisCompras"
                        >
                          <h5>
                            x{p.lineorder.quantity} {p.name}
                          </h5>
                        </Link>
                        <h5>
                          Precio: {p.lineorder.price * p.lineorder.quantity}
                        </h5>
                      </div>
                    );
                  })}
                <h5>Subtotal: {subtotal}</h5>
              </div>
              <button
                className="button-home"
                onClick={() => setModalCompras(false)}
              >
                Cerrar
              </button>
              {orden.status === "creado" && (
                <button
                  className="button-home"
                  onClick={() => handleStatus(orden.id)}
                >
                  Cancelar orden
                </button>
              )}
            </div>
          ) : (
            <h5>No hay datos</h5>
          )}
        </div>
      </div>
    </>
  );
}
