import React, { useEffect, useState } from "react";
import { Button, Card, Col, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { getUserOrders } from "../../Redux/actions";
import Axios from "axios";
import './CardOrders.css'
import swal from "sweetalert";
/* {key, status, id, userId, user,products,createdAt} */
const CardOrders = ({ onDataUser, IdUser, idCart, statusReal }) => {
  const dispatch = useDispatch();
  const [modalEdit, setModalEdit] = useState(false);
  const [modalCancel, setModalCancel] = useState(false);
  const [status, setStatus] = useState({
    status: "creado",
  });
  const [cancel, setCancel] = useState({
    description: "",
  });
  useEffect(() => {
    dispatch(getUserOrders(IdUser));
  }, []);
  function redireccionar() {
    window.location = "http://localhost:3000/orders";
  }

  const userOrders = useSelector((state) => state.userOrders);
  console.log(userOrders, "Datos de los users en cardOrders");
  function modifyStatus(status, id) {
    swal({
      title: "Cambiar status",
      text: "Estas seguro que deseas cambiar el status de esta orden?",
      icon: "info",
      buttons: ["No", "Si"],
    }).then((respuesta) => {
      if (respuesta) {
        Axios.put(`${process.env.REACT_APP_API_URL}/orders/${id}`, status);
        swal({
          title: "Cambio exitoso",
          text: `se ha cambiado el status de la orden a ${status.status}`,
          icon: "success",
          button: "Aceptar",
        }).then((e) => {
          redireccionar();
        });
      }
    });

    setModalEdit(!modalEdit);
    //redireccionar()
  }
  const statusEdit = (e) => {
    setStatus({
      status: e.target.value,
    });
  };
  //despachar y enviar email
  let input = {
    email: "",
    msj: "",
    problem: "",
  };
  function sendEmail(email, id) {
    input.email = email;
    let statuss = {
      status: "procesado",
    };
    swal({
      title: "enviar email",
      text:
        "Estas seguro que deseas enviar un email y cambiar el status a procesado?",
      icon: "info",
      buttons: ["No", "Si"],
    }).then((respuesta) => {
      if (respuesta) {
        Axios.post(
          `${process.env.REACT_APP_API_URL}/users/emailProcess`,
          input
        );
        Axios.put(`${process.env.REACT_APP_API_URL}/orders/${id}`, statuss);
        swal({
          title: "Cambio exitoso",
          text: `se ha cambiado el status de la orden a procesado`,
          icon: "success",
          button: "Aceptar",
        }).then((e) => {
          redireccionar();
        });
      }
    });
  }
  console.log(cancel);
  function sendCancel(email, id) {
    input.email = email;
    input.problem = cancel.description;
    let statuss = {
      status: "cancelado",
    };
    swal({
      title: "Cancelar pedido",
      text: "Estas seguro que deseas enviar un email y cancelar el pedido?",
      icon: "warning",
      buttons: ["No", "Si"],
    }).then((respuesta) => {
      if (respuesta) {
        Axios.post(`${process.env.REACT_APP_API_URL}/users/emailCancel`, input);
        Axios.put(`${process.env.REACT_APP_API_URL}/orders/${id}`, statuss);
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
          text: `se ha cambiado el status de la orden a cancelado`,
          icon: "success",
          button: "Aceptar",
        }).then((e) => {
          redireccionar();
        });
      }
    });
  }
  function Created({ status, email, id }) {
    if (status === "creado") {
      return (
        <div className=" btnadmnd-flex">
          <button
            className="button-home"
            onClick={() => {
              console.log(email, "soy email de onclick");
              sendEmail(email, id);
            }}
          >
            Procesar
          </button>
          <button
            className=" btnadmn button-home"
            onClick={() => {
              setModalCancel(!modalCancel);
            }}
          >
            Cancelar
          </button>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
  // RENDER
  return (
    <Col>
      <Card>
        <Card.Header>
          <Col>
            <div>
              <FontAwesomeIcon icon={faUserCircle} size="3x" />
            </div>
          </Col>
        </Card.Header>
        <Card.Body>
          <Col className="text-left">
            <Col>
              {userOrders &&
                userOrders.map((u) => {
                  if (statusReal === u.status) {
                    return (
                      <div key={u.id}>
                        <h6 className="d-flex">
                          Nombre de usuario:
                          <p className="ml-2 text-muted">{u.user.name}</p>
                        </h6>
                        <h6 className="d-flex">
                          Email:
                          <p className="ml-2 text-muted">{u.user.email}</p>
                        </h6>
                        <h6 className="d-flex">
                          Detalle de los productos: {"\n"}
                          <p className="ml-2 text-muted">
                            {u.products &&
                              u.products.map((p) => (
                                <div key={p.id}>
                                  <p>producto: {p.name}</p>
                                  <p>cantidad: {p.lineorder.quantity}</p>
                                  <p>precio: {p.lineorder.price}</p>
                                </div>
                              ))}
                          </p>
                        </h6>
                        <h6 className="d-flex">
                          Status:
                          <p className="ml-2 text-muted">{u.status}</p>
                        </h6>
                        <div className="d-flex">
                          <button
                            className=" btnadmn button-home"
                            onClick={() => {
                              setModalEdit(!modalEdit);
                            }}
                          >
                            Cambiar status
                          </button>

                          <Created
                            status={u.status}
                            email={u.user.email}
                            id={u.id}
                          ></Created>
                        </div>
                        <Modal show={modalCancel}>
                          <Modal.Header>
                            <Modal.Title>Cancelar pedido</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Form.Control
                              as="textarea"
                              placeholder="Cuentale al cliente por que cancelas tu pedido"
                              rows={3}
                              onChange={(e) => {
                                setCancel({
                                  description: e.target.value,
                                });
                              }}
                            />
                            <Modal.Footer>
                              <Button
                                onClick={() => setModalCancel(!modalCancel)}
                                variant="secondary"
                              >
                                Cerrar
                              </Button>
                              <Button
                                variant="success"
                                onClick={() => sendCancel(u.user.email, u.id)}
                              >
                                Guardar
                              </Button>
                            </Modal.Footer>
                          </Modal.Body>
                        </Modal>
                        <Modal show={modalEdit}>
                          <Modal.Header>
                            <Modal.Title>Camiar status</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Col>
                              <Form.Control
                                as="select"
                                defaultValue="Choose..."
                                required
                                onChange={statusEdit}
                              >
                                <option value={u.status}>
                                  Seleccione status
                                </option>
                                <option value="procesado">Procesado</option>
                                <option value="completado">Completado</option>
                                <option value="cancelado">Cancelado</option>
                                
                              </Form.Control>

                              <Modal.Footer>
                                <Button
                                  onClick={() => setModalEdit(!modalEdit)}
                                  variant="secondary"
                                >
                                  Cerrar
                                </Button>
                                <Button
                                  variant="success"
                                  onClick={() => modifyStatus(status, u.id)}
                                >
                                  Guardar
                                </Button>
                              </Modal.Footer>
                            </Col>
                          </Modal.Body>
                        </Modal>
                      </div>
                    );
                  }
                })}
              {userOrders.length === 0 && (
                <div>
                  <h6>No hay datos</h6>
                </div>
              )}
            </Col>
          </Col>
        </Card.Body>
        <Card.Footer>
          <div>
            {/* SETEA(OCULTA) EL CARD  CON LOS DATOS DEL USUARIO */}
            <Button onClick={() => onDataUser(false)}>Cerrar</Button>
          </div>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default CardOrders;
