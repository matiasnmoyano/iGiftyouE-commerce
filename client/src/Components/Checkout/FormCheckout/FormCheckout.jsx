import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Button, Col, Image } from "react-bootstrap";
import swal from "sweetalert";
import Visa from "./cc-visa-brands.svg";
import Axios from "axios";

const FormCheckout = ({ router }) => {
  const userActive = JSON.parse(localStorage.getItem("User"));
  const [numRandom, setnumRandom] = useState(0);

  if (userActive === null) {
    var userRol = undefined;
  } else {
    var userRol = userActive.rol;
  }
  function NumRandom() {
    let num = Math.random() * (10000000000000 - 10);
    let redondeo = Math.floor(num + 10);
    return setnumRandom(redondeo);
  }
  // AcA SE GUARDAN TODOS LOS DATOS DE LOS INPUTS
  const [dataFormCheckout, setdataFormCheckout] = useState({});
  // GUARDA LOS DATOS DE CADA INPUTS SEGUN SU NAME
  const OndataInputs = (e) => {
    NumRandom();
    setdataFormCheckout({
      ...dataFormCheckout,
      [e.target.name]: e.target.value,
    });
  };
  const status = {
    status: "creado",
  };
  let input = {
    email: dataFormCheckout.email,
    celular: dataFormCheckout.celular,
    nombre: dataFormCheckout.nombre,
    apellido: dataFormCheckout.apellido,
    direccion: dataFormCheckout.direccion,
    numero: dataFormCheckout.numero,
    horarios: dataFormCheckout.horarios,
    descrip: dataFormCheckout.descrip,
    provincia: dataFormCheckout.provincia,
    localidad: dataFormCheckout.localidad,
    codigo: dataFormCheckout.codigo,
    products: [],
    total: 0,
  };

  const trueUser = () => {
    if (
      dataFormCheckout.email &&
      dataFormCheckout.celular &&
      dataFormCheckout.nombre &&
      dataFormCheckout.apellido &&
      dataFormCheckout.direccion &&
      dataFormCheckout.numero &&
      dataFormCheckout.horarios &&
      dataFormCheckout.descrip &&
      dataFormCheckout.provincia &&
      dataFormCheckout.localidad &&
      dataFormCheckout.codigo
    ) {
      swal({
        title: "FELICIDADES TU PEDIDO FUE REALIZADO!",
        text: "Tu pedido se realizo correctamente",
        icon: "success",
        button: "Ok!",
      }).then((res) => {
        Axios.get(
          `${process.env.REACT_APP_API_URL}/users/cart/${userActive.id}`
        ) // me traigo el carrito del usuario
          .then((shoppingcart) => {
            if (!shoppingcart) return;
            shoppingcart.data.products.forEach((product) => {
              let stock = product.lineorder.quantity;
              input.products.push(product);
              input.total +=
                product.lineorder.quantity * product.lineorder.price;
              Axios.put(
                `${process.env.REACT_APP_API_URL}/products/modifystock/${product.id}`,
                {
                  stock,
                }
              );
            });

            Axios.post(
              `${process.env.REACT_APP_API_URL}/users/cart/${userActive.id}`
            ); //creo un carrito nuevo para el user que va a estar vacio

            Axios.put(
              `${process.env.REACT_APP_API_URL}/orders/${shoppingcart.data.id}`,
              status
            );
            //para cada producto en el shopping cart ir a la lineorder y fijarse la cantidad y bajarle el stock a cada producto
            Axios.post(
              `${process.env.REACT_APP_API_URL}/users/emailCheckout`,
              input
            ); //envio un email al correo que ingreso

            localStorage.removeItem("Product"); //elimino los productos de localstorage

            return (window.location = `http://localhost:3000/carrito/checkout/pedido/${userActive.id}/${numRandom}`);

            /* return router.history.push(
              `/carrito/checkout/pedido/${userActive.id}/${numRandom}`
            ); */
          });
      });
    } else {
      swal({
        title: "Debes completar todos los campos",
        icon: "warning",
      });
    }
  };
  const falseUser = () => {
    if (
      dataFormCheckout.email &&
      dataFormCheckout.celular &&
      dataFormCheckout.nombre &&
      dataFormCheckout.apellido &&
      dataFormCheckout.direccion &&
      dataFormCheckout.numero &&
      dataFormCheckout.horarios &&
      dataFormCheckout.descrip &&
      dataFormCheckout.provincia &&
      dataFormCheckout.localidad &&
      dataFormCheckout.codigo
    ) {
      swal({
        title: "Ups! Debes Iniciar session para completar el pedido",
        text: "OH noo!, inicia session pliz",
        icon: "warning",
        buttons: true,
      }).then((res) => {
        if (res) {
          return (window.location = "http://localhost:3000/signin");
          // return router.history.push('/signin');
        } else {
          swal("Okey sigue agregando más productos a tu carrito!");
        }
      });
    } else {
      swal({
        title: "Debes completar todos los campos",
        icon: "warning",
      });
    }
  };

  return (
    <>
      <Form
        style={{
          background: "rgba(238, 238, 238, 0.349)",
          padding: "30px 40px",
          borderRadius: "15px",
          textAlign: "start",
        }}
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="d-flex justify-content-around mb-4">
          <Image src={Visa} alt="LOGO VISA" style={{ width: "80px" }} />
          <Image src={Visa} alt="LOGO VISA" style={{ width: "80px" }} />
          <Image src={Visa} alt="LOGO VISA" style={{ width: "80px" }} />
          <Image src={Visa} alt="LOGO VISA" style={{ width: "80px" }} />
        </div>
        <Form.Group className="mb-4">
          <Form.Label>Datos de contacto</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            required
            onChange={OndataInputs}
          />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Control
            type="number"
            placeholder="Celular"
            name="celular"
            required
            onChange={OndataInputs}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword" className="mb-4">
          <Form.Label>Datos de Facturacion/Envio</Form.Label>
          <Form.Row>
            <Col sm={6}>
              <Form.Control
                type="text"
                placeholder="Nombre"
                name="nombre"
                required
                onChange={OndataInputs}
              />
            </Col>
            <Col sm={6}>
              <Form.Control
                type="text"
                placeholder="Apellido"
                name="apellido"
                required
                onChange={OndataInputs}
              />
            </Col>
          </Form.Row>
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Row>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="Dirección"
                required
                name="direccion"
                onChange={OndataInputs}
              />
            </Col>
            <Col sm={2}>
              <Form.Control
                type="number"
                placeholder="Numero"
                name="numero"
                required
                onChange={OndataInputs}
              />
            </Col>
          </Form.Row>
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Row>
            <Col sm={6}>
              <Form.Control
                type="text"
                placeholder="Horarios"
                name="horarios"
                required
                onChange={OndataInputs}
              />
            </Col>
            <Col sm={6}>
              <Form.Control
                type="text"
                placeholder="Dto | piso | casa"
                name="descrip"
                required
                onChange={OndataInputs}
              />
            </Col>
          </Form.Row>
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Row>
            <Col sm={4}>
              <Form.Control
                type="text"
                required
                placeholder="Provincia"
                name="provincia"
                onChange={OndataInputs}
              />
            </Col>
            <Col sm={4}>
              <Form.Control
                type="text"
                placeholder="Localidad"
                required
                name="localidad"
                onChange={OndataInputs}
              />
            </Col>
            <Col sm={4}>
              <Form.Control
                type="number"
                placeholder="Codigo Postal"
                name="codigo"
                required
                onChange={OndataInputs}
              />
            </Col>
          </Form.Row>
          <p className="mt-3 text-muted">
            Utilizaremos los datos ingresado para avisarle el estado de su
            pedido
          </p>
        </Form.Group>
        <Form.Group className="mt-5">
          <Form.Row>
            <Col sm={6}>
              <Link to={"/carrito"}>
                <Button type="submit" className="mr-4 button-card-price">
                  Cancerla Pedido
                </Button>
              </Link>
            </Col>
            <Col sm={6}>
              <Button
                type="submit"
                className="mr-4 button-card-price"
                onClick={userRol === "Client" ? trueUser : falseUser}
              >
                Confirmar Pedido
              </Button>
            </Col>
          </Form.Row>
        </Form.Group>
      </Form>
    </>
  );
};

export default FormCheckout;
