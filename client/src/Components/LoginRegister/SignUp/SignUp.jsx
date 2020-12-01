import React, { useState } from "react";
import ButtonHome from "../../ButtonHome.jsx";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { createNewUser } from "../../../Redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift } from "@fortawesome/free-solid-svg-icons";
import swal from 'sweetalert';

const SignUp = () => {
  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [warnings, setWarnings] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [validation, setValidation] = useState({
    email: false,
    password: false,
    repeatPassword: false,
  });

  const styles = {
    widthContent: {
      minHeight: "",
      padding: "0px"+" 0px "+"50px",
    },
    textAling: {
      textAlign: "center",
    },
    heightCard: {
      height: "100%",
    },
  };

  const handleSubmit = (e) => {
    if (
      validation.email === false ||
      validation.password === false ||
      validation.repeatPassword === false
    ) {
      e.preventDefault();
      return;
    }
    swal({
      title: `Registro exitoso!`,
      text: 'Te redireccionaremos para que inicies sesion',
      icon: 'success',
      button: 'Aceptar',
    })
    .then(() =>
    dispatch(createNewUser(newUser))
    );
    setNewUser({
      name: "",
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      <Container className="signin-container" style={styles.widthContent}>
        <Row>
          <Col md={12}>
            <Col className="justify-content-center">
              <Card className="card-style " style={styles.heightCard}>
                <span className="icon-signin">
                  i<FontAwesomeIcon icon={faGift} />
                  You
                </span>
                <Card.Body className="card-body-style">
                  <Form className="form-signin">
                    <Form.Group>
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese su nombre"
                        name="name"
                        value={newUser.name}
                        onChange={(e) => {
                          setNewUser({
                            ...newUser,
                            name: e.target.value,
                          });
                        }}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Nombre de usuario</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese su nombre de usuario"
                        name="username"
                        value={newUser.username}
                        onChange={(e) => {
                          setNewUser({
                            ...newUser,
                            username: e.target.value,
                          });
                        }}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={newUser.email}
                        onChange={(e) => {
                          const value = e.target.value;
                          const emailRegex = /\S+@\S+/;
                          if (!emailRegex.test(value)) {
                            if (value !== "") {
                              setWarnings({
                                ...warnings,
                                email: "Ingrese un e-mail válido",
                              });
                            }
                            setValidation({
                              ...validation,
                              email: false,
                            });
                          } else {
                            setWarnings({ ...warnings, email: "" });

                            setValidation({
                              ...validation,
                              email: true,
                            });
                          }
                          setNewUser({
                            ...newUser,
                            email: value,
                          });
                        }}
                        placeholder="Ingrese su email"
                        required
                      />
                      <Form.Text className="category-warnings">
                        {warnings.email}
                      </Form.Text>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={newUser.password}
                        placeholder="Ingrese su contraseña"
                        onChange={(e) => {
                          const value = e.target.value;
                          const passwordRegex = /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]+$/g;
                          if (!passwordRegex.test(value)) {
                            if (value !== "") {
                              setWarnings({
                                ...warnings,
                                password:
                                  "Caracteres inválidos en contraseña",
                              });
                            }
                            setValidation({
                              ...validation,
                              password: false,
                            });
                          } else {
                            setWarnings({ ...warnings, password: "" });
                            setValidation({
                              ...validation,
                              password: true,
                            });
                          }

                          if (value.length > 10) return;
                          setNewUser({
                            ...newUser,
                            password: value,
                          });
                        }}
                        required
                      />
                      <Form.Text className="category-warnings">
                        {warnings.password}
                      </Form.Text>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Repita su contraseña</Form.Label>
                      <Form.Control
                        type="password"
                        name="repeatPassword"
                        value={newUser.repeatPassword}
                        placeholder="Ingrese su contraseña"
                        onChange={(e) => {
                          let value = e.target.value;
                          if (value !== newUser.password) {
                            if (value !== "") {
                              setWarnings({
                                ...warnings,
                                repeatPassword: "Los inputs no coinciden",
                              });
                            }
                            setValidation({
                              ...validation,
                              repeatPassword: false,
                            });
                          } else {
                            setWarnings({ ...warnings, repeatPassword: "" });
                            setValidation({
                              ...validation,
                              repeatPassword: true,
                            });
                          }
                          setNewUser({
                            ...newUser,
                            repeatPassword: e.target.value,
                          });
                        }}
                        required
                      />
                      <Form.Text className="category-warnings">
                        {warnings.repeatPassword}
                      </Form.Text>
                    </Form.Group>

                    <Col className="d-flex justify-content-around">
                      <Link to={"/home"}>
                        <Col>
                          <div className="button-cancel">
                            <ButtonHome name="Cancelar" />
                          </div>
                        </Col>
                      </Link>
                      <Link to={"/signin"}>
                        <Col>
                          <div type="submit" onClick={handleSubmit}>
                            <ButtonHome name="Crear usuario" />
                          </div>
                        </Col>
                      </Link>
                    </Col>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default SignUp;
