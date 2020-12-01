import React from "react";
import { Card, Button } from "react-bootstrap";
import CardInfoCompras from "./CardInfoCompras";
import "./CardMisCompras.css";

const CardMisCompras = ({
  dataUserCompras,
  modalCompras,
  setModalCompras,
  userOrders,
  SumaTotal,
}) => {
  let carritos = {};

  dataUserCompras.forEach((carrito) => {
    let { status } = carrito;

    if (!carritos.hasOwnProperty([status])) carritos[status] = [];
    carritos[status].push(carrito);
  });

  return (
    <>
      <div className="Container__Flex__Info">
        <div className="Container__Info__MisCompras">
          {carritos.curso &&
            carritos.curso[0] &&
            carritos.curso[0].products &&
            carritos.curso[0].products[0] && (
              <div>
                <div className="Title_State_Card">
                  <div className="Title__And__Info">
                    <h3>Hey! Esto es lo que tienes en el carrito! </h3>
                  </div>
                  <Card>
                    <Card.Header>
                      <h5 style={{ color: "black" }}>Carrito activo</h5>
                      <Button
                        variant="info"
                        onClick={() => setModalCompras(carritos.curso[0].id)}
                      >
                        Más info
                      </Button>
                    </Card.Header>
                  </Card>
                </div>
              </div>
            )}
          {carritos.creado && carritos.creado[0] && (
            <div className="Title_State_Card">
              <div className="Title__And__Info">
                <h3>Comprado y esperando confirmacion!</h3>
              </div>
            </div>
          )}
          {carritos.creado &&
            carritos.creado.map((userComs, index) => {
              return (
                <div className="Title__And__Info">
                  <Card>
                    <Card.Header>
                      <h5>Compra en espera Nº {index + 1} </h5>
                      <Button
                        variant="info"
                        onClick={() => setModalCompras(userComs.id)}
                      >
                        Más info
                      </Button>
                    </Card.Header>
                  </Card>
                </div>
              );
            })}
          {carritos.procesado && carritos.procesado[0] && (
            <div className="Title_State_Card">
              <div className="Title__And__Info">
                <h3>Pronto te llegaran!</h3>
              </div>
            </div>
          )}
          {carritos.procesado &&
            carritos.procesado.map((userComs, index) => {
              return (
                <div className="Title__And__Info">
                  <Card>
                    <Card.Header>
                      <h5>Compra en camino Nº {index + 1} </h5>
                      <Button
                        variant="info"
                        onClick={() => setModalCompras(userComs.id)}
                      >
                        Más info
                      </Button>
                    </Card.Header>
                  </Card>
                </div>
              );
            })}{" "}
          {carritos.cancelado && carritos.cancelado[0] && (
            <div className="Title_State_Card">
              <div className="Title__And__Info">
                <h3>Oops! Esta cancelado :c</h3>
              </div>
            </div>
          )}
          {carritos.cancelado &&
            carritos.cancelado.map((userComs, index) => {
              return (
                <div className="Title__And__Info">
                  <Card>
                    <Card.Header>
                      <h5>Compra cancelada Nº {index + 1} </h5>
                      <Button
                        variant="info"
                        onClick={() => setModalCompras(userComs.id)}
                      >
                        Más info
                      </Button>
                    </Card.Header>
                  </Card>
                </div>
              );
            })}
          {carritos.completado && carritos.completado[0] && (
            <div className="Title_State_Card">
              <div className="Title__And__Info">
                <h3>Esperemos que estos productos te hayan gustado!</h3>
              </div>
            </div>
          )}
          {carritos.completado &&
            carritos.completado.map((userComs, index) => {
              return (
                <div className="Title__And__Info">
                  <Card>
                    <Card.Header>
                      <h5>Compra en historial Nº {index + 1} </h5>
                      <Button
                        variant="info"
                        onClick={() => setModalCompras(userComs.id)}
                      >
                        Más info
                      </Button>
                    </Card.Header>
                  </Card>
                </div>
              );
            })}
        </div>
        {modalCompras ? (
          <CardInfoCompras
            id={modalCompras}
            dataUserCompras={userOrders}
            SumaTotal={SumaTotal}
            setModalCompras={setModalCompras}
          />
        ) : null}
      </div>
    </>
  );
};
export default CardMisCompras;
//
