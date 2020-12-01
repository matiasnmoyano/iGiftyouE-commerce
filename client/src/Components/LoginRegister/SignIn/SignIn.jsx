
import React, { useState, useEffect } from 'react';
import ButtonHome from '../../ButtonHome.jsx';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOnlyUser } from '../../../Redux/actions';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Form, Button, Card, Modal } from 'react-bootstrap';
import './Signin.css';
import { addItemToCart } from '../../../Redux/actions.js';
import swal from 'sweetalert';
import OtherSignin from '../../OtherSignin/OtherSignin';

const SignIn = (props) => {
  const state = useSelector((state) => state);
  const { onlyUser } = state;
  const dispatch = useDispatch();
  const [modalEdit, setModalEdit] = useState(false);
  const [modalPass, setModalPass] = useState(false);
  const [userr, setUser] = useState({
    email: "",
    password: "",
  });
  const [input, setInputs] = useState({
    email: "",
  });
  const [change, setChange] = useState({
    codigo: "",
    nuevaPass: "",
  });
  const styles = {
    widthContent: {

      minHeight: "85vh",

    },
    textAling: {
      textAlign: "center",
    },
  };

  const [useremail, setUseremail] = useState({});
  let user = {};

  function redireccionar() {
    window.location = "http://localhost:3000/home";
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /\S+@\S+/;
    if (!emailRegex.test(userr.email)) {
      alert("Ingrese datos válidos");
      return;
    }
    Axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, userr, {
      headers: {
        "Content-Type": "application/json",
      },
      Authorization: {
        email: userr.email,
        password: userr.password,
      },
      withCredentials: true,
    })
      .then((user) => {
        /* localStorage.setItem('User', JSON.stringify(user.data))
      console.log(user) */
        //setTimeout (redireccionar(), 5000)

        if (user.data === "false") {
          swal({
            title: "Error",
            text: "El usuario o la contraseña no son validos",
            icon: "warning",
            button: "Aceptar",
          });
        } else if (userr.email === user.data.email) {
          swal({
            title: `Bienvenido ${user.data.name}`,
            text: "LogIn exitoso!",
            icon: "success",
            button: "Aceptar",
          }).then((e) => {
            redireccionar();
          });
          localStorage.setItem("User", JSON.stringify(user.data));
          //dispatch(sendTempCartToDatabase(user.data.id));
          dispatch(getOnlyUser(user.data.id));
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

            dispatch(addItemToCart(user.data.id, product));
          }

          localStorage.removeItem("Producto");

        } else {
          swal({
            title: "Error",
            text: "El usuario o la contrasenia no son validos",
            icon: "warning",
            button: "Aceptar",
          });
        }
      })

      .catch((err) => {
        swal({
          title: "Error",
          text: "El usuario o la contrasenia no son validos",
          icon: "warning",
          button: "Aceptar",
        });
        window.location.reload();
        console.log(err);
        console.log("SOY LA PROMESA ERROR");
      });
  };
  const sendEmail = function (email) {
    Axios.get(`${process.env.REACT_APP_API_URL}/users/getuser?email=` + email)
      .then((user) => {
        console.log(user);
        setUseremail(user.data);
        console.log(user.data, "soy useremail");
        Axios.post(
          `${process.env.REACT_APP_API_URL}/users/password`,
          user.data
        );
      })
      .then(
        swal({
          title: "Se envio un email a tu correo",
          text:
            "en el proximo formulario tendras que enviar el codigo que tiene el email",
          icon: "info",
          button: "Aceptar",
        }).then(setModalPass(!modalPass))
      );
  };
  const cambiarPass = function () {
    console.log(change.codigo, "soy codigo");
    console.log(useremail.updatedAt, "soy change");
    if (useremail.updatedAt !== change.codigo) {
      swal({
        title: "El codigo ingresado es incorrecto",
        text: "revisa bien el codigo, esta mal ingresado",
        icon: "warning",
        button: "Aceptar",
      });
    } else {
      Axios.put(
        `${process.env.REACT_APP_API_URL}/users/newpassemail/${useremail.id}`,
        change
      ).then(
        swal({
          title: "Cambio exitoso",
          text: "te redireccionaremos a home",
          icon: "success",
          button: "Aceptar",
        })
      );
    }
  };
  const dataInputs = (e) => {
    console.log(input);
    setInputs({
      email: e.target.value,
    });
  };
  const dataChange = (e) => {
    setChange({
      ...change,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("User")));
  }, [onlyUser]);

  return (
    <>
      <Container className="signin-container" style={styles.widthContent}>
        <Row>
          <Col md={12}>
            <Col className="justify-content-center">
              <Card className="card-style">
                {/* 								<Card.Header>
									<h5>Iniciar Session</h5>
								</Card.Header> */}
                <span className="icon-signin">
                  i<FontAwesomeIcon className="iconGift" icon={faGift} />
                  You
                </span>

                <Card.Body className="card-body-style">
                  <Form className="form-signin" style={styles.textAling}>
                    <Form.Group className="input-signin">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese su email"
                        value={userr.email}
                        onChange={(e) => {
                          setUser({
                            ...userr,
                            email: e.target.value,
                          });
                        }}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="input-signin">
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Ingrese su contraseña"
                        value={userr.password}
                        onChange={(e) => {
                          setUser({
                            ...userr,
                            password: e.target.value,
                          });
                        }}
                        required
                      />
                    </Form.Group>
                  </Form>
                </Card.Body>
                <Card.Body>
                  <Col className="olvide">
                    <Link
                      onClick={() => {
                        setModalEdit(!modalEdit);
                      }}
                      className="black"
                    >
                      Olvide mi contraseña
                    </Link>
                  </Col>
                </Card.Body>
                <Modal show={modalEdit}>
                  <Modal.Header>
                    <Modal.Title>Olvide mi contraseña</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Col>
                      <Form>
                        <Form.Group>
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Ingrese Email"
                            name="email"
                            id="email"
                            onChange={dataInputs}
                          />
                          <Modal.Footer>
                            <Button
                              variant="secondary"
                              onClick={() => setModalEdit(!modalEdit)}
                            >
                              Cerrar
                            </Button>
                            <Button
                              variant="success"
                              onClick={() => sendEmail(input.email)}
                            >
                              Enviar
                            </Button>
                          </Modal.Footer>
                        </Form.Group>
                      </Form>
                    </Col>
                  </Modal.Body>
                </Modal>
                <Modal show={modalPass}>
                  <Modal.Header>
                    <Modal.Title>Olvide mi contraseña</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Col>
                      <Form>
                        <Form.Group>
                          <Form.Label>Codigo</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Ingrese Codigo"
                            name="codigo"
                            id="codigo"
                            onChange={dataChange}
                          />
                          <Form.Label>Nueva contraseña</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Ingrese Codigo"
                            name="nuevaPass"
                            id="codigo"
                            onChange={dataChange}
                          />
                          <Modal.Footer>
                            <Button
                              variant="secondary"
                              onClick={() => setModalPass(!modalPass)}
                            >
                              Cerrar
                            </Button>
                            <Button
                              variant="success"
                              onClick={() => cambiarPass()}
                            >
                              Guardar
                            </Button>
                          </Modal.Footer>
                        </Form.Group>
                      </Form>
                    </Col>
                  </Modal.Body>
                </Modal>
                <Col className="d-flex button-signin">
                  <Link to={"/signup"}>
                    <Col>
                      <ButtonHome className="button-home" name="Registrarse">
                        Registrarse
                      </ButtonHome>
                    </Col>
                  </Link>
                  <div>
                    <Col>
                      <div type="submit" onClick={handleSubmit}>
                        <ButtonHome
                          className="button-home"
                          name="Iniciar sesion"
                        />
                      </div>
                    </Col>
                  </div>
                </Col>
                <OtherSignin />
              </Card>
            </Col>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default SignIn;
