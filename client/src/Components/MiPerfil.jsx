import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Miperfil.css';

import { FaRegUserCircle } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
import { Col, Button, Modal, Form, FormControl, InputGroup } from 'react-bootstrap';
import Axios from 'axios';

//---Lo traigo del LocalStorage---//

export default function MiPerfil({ logout }) {
  let user = JSON.parse(localStorage.getItem('User'));
  const [modalEdit, setModalEdit] = useState(false);
  const [modalPassword, setModalPassword] = useState(false);
  /* const [usuario, setUsuario] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    password: user.password,
  }); */

  const [input, setInputs] = useState({
    password: '',
    oldpassword: '',
  });
  const [edit, setEdit] = useState({
    name: '',
    username: '',
    email: '',
  });

  console.log(edit);

  const dispatch = useDispatch();
  const history = useHistory();

  function redireccionar() {
    window.location = 'http://localhost:3000/home';
  }
  function logout() {
    Axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`, {
      headers: {
        'Content-Type': 'application/json',
      },
      Authorization: {
        user: user,
      },
      withCredentials: true,
    });
    localStorage.removeItem('User');
    redireccionar();
  }

  //Guardar
  // const handleUpdate = function () {
  //   /*  if (validation.password === false) {
  //     return;
  //   }  */
  //   Axios.put(
  //     `${process.env.REACT_APP_API_URL}/users{${user.id}/newpass`,
  //     input
  //   );
  //   /*  .then(() => {
  //     /* history.pushState("${process.env.REACT_APP_API_URL}/auth/logout");
  //     window.location.reload();
  //     console.log('se cambio la contra')
  //   }); */
  // };
  const handleUpdate = function () {
    swal({
      title: 'Cambiar contraseña',
      text: 'Estas seguro que deseas cambiar tu contraseña?',
      icon: 'info',
      buttons: ['No', 'Si'],
    }).then((respuesta) => {
      if (respuesta) {
        Axios.put(`${process.env.REACT_APP_API_URL}/users/${user.id}/newpass`, input);
        swal({
          title: 'Cambio exitoso',
          text: 'te redireccionaremos a home',
          icon: 'success',
          button: 'Aceptar',
        }).then((e) => {
          logout();
          redireccionar();
        });
      }
    });
  };

  const userUpdate = function () {
    swal({
      title: 'Editar',
      text: 'Estas seguro que deseas editar su perfil?',
      icon: 'info',
      buttons: ['No', 'Si'],
    }).then((respuesta) => {
      if (respuesta) {
        Axios.put(`${process.env.REACT_APP_API_URL}/users/${user.id}`, edit);
        swal({
          title: `Se cambiaron los datos`,
          text: 'Te redireccionaremos a home',
          icon: 'success',
          button: 'Aceptar',
        }).then((e) => {
          logout();
          redireccionar();
        });
      }
    });
  };
  const deleteUser = function () {
    swal({
      title: 'Eliminar',
      text: 'Estas seguro que deseas eliminar tu usuario?',
      icon: 'warning',
      buttons: ['No', 'Si'],
    }).then((respuesta) => {
      if (respuesta) {
        Axios.delete(`${process.env.REACT_APP_API_URL}/users/${user.id}`);
        swal({
          title: `Se elimino tu usuario `,
          text: 'te redireccionaremos a home',
          icon: 'success',
          button: 'Aceptar',
        }).then((e) => {
          logout();
          redireccionar();
        });
      }
    });
  };
  const dataInputs = (e) => {
    setInputs({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const dataEdit = (e) => {
    setEdit({
      ...edit,
      [e.target.name]: e.target.value,
    });
  };
  console.log(input);

  //   setInputs({

  //       password:e.target.value,
  //       oldpassword

  //   })
  //   console.log(input)
  // }
  // const handleInputChange2 = function(e) {

  //   setInputs({
  //       password,
  //       oldpassword:e.target.value,

  //   })
  //   console.log(input)
  // }

  return (
    <div class="container__miPerfil">
      <div class="Miperfil__card">
        <span className="icon-signin__miPerfil">
          i<FontAwesomeIcon icon={faGift} />
          You
        </span>
        <div class="card__content__miPerfil ">
          <h1>¡Hola, {user.name}! </h1>
          <div className="info_miperfil">
            <h1>Mi cuenta</h1>
            <h4>Usuario: {user.username}</h4>
            {user.email && <h4>Email: {user.email}</h4>}
          </div>
          <div className="buttons__miPerfil d-flex">
            <button className="button-home" onClick={() => deleteUser()}>
              Eliminar Cuenta
            </button>

            <button
              className="button-home"
              onClick={() => {
                setModalEdit(!modalEdit);
              }}
            >
              Editar Usuario
            </button>
            <Modal show={modalEdit}>
              <Modal.Header>
                <Modal.Title>Editar usuario</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Col>
                  <Form>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        placeholder="Nuevo nombre"
                        name="name"
                        onChange={dataEdit}
                      />
                      <Form.Control
                        type="text"
                        placeholder="Nuevo usuario"
                        name="username"
                        onChange={dataEdit}
                      />
                      <Form.Control
                        type="text"
                        placeholder="Nuevo email"
                        name="email"
                        onChange={dataEdit}
                      />

                      <Modal.Footer>
                        <Button onClick={() => setModalEdit(!modalEdit)} variant="secondary">
                          Cerrar
                        </Button>
                        <Button variant="success" onClick={() => userUpdate()}>
                          Guardar
                        </Button>
                      </Modal.Footer>
                    </Form.Group>
                  </Form>
                </Col>
              </Modal.Body>
            </Modal>

            <button
              className="button-home"
              onClick={() => {
                setModalPassword(!modalPassword);
              }}
            >
              Cambiar Contraseña
            </button>
            <Modal show={modalPassword}>
              <Modal.Header>
                <Modal.Title>Cambiar contraseña</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Col>
                  <Form>
                    <Form.Group>
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Ingrese password actual"
                        name="oldpassword"
                        id="pass0"
                        onChange={dataInputs}
                      />
                      <Form.Control
                        type="password"
                        placeholder="Ingrese nueva password"
                        name="password"
                        id="pass1"
                        onChange={dataInputs}
                      />
                      <Modal.Footer>
                        <Button
                          variant="secondary"
                          onClick={() => setModalPassword(!modalPassword)}
                        >
                          Cerrar
                        </Button>
                        <Button variant="success" onClick={() => handleUpdate()}>
                          Guardar
                        </Button>
                      </Modal.Footer>
                    </Form.Group>
                  </Form>
                </Col>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
