import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from '../../Redux/actions';
import { Col, Container, Row } from 'react-bootstrap';
import CardDeleteUser from './CardDeleteUser';
import CardDataUser from './CardDataUser';

// LISTA TODOS LOS USUARIOS REGISTRADOS EN LA BASE DE DATOS
const GetUsers = () => {
  const { allUsers } = useSelector((state) => state);
  const dispatch = useDispatch();
  // STATE QUE MOSTRARA Y OCULTARA LA CARD QUE CONTIENE LOS DATOS DE CADA USUARIO
  const [onUserData, setonUserData] = useState(true);
  // GUARDAMOS EN STATE EL ID DE CADA USUARIO
  const [IdUser, setIdUser] = useState(0);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [reload]);

  const Reload = () => {
    setReload(!reload);
  };
  // CAPTA EL ID Y SETEA EL CARD USER
  const onDataUser = (id, boolean) => {
    setIdUser(id);
    setonUserData(boolean);
  };
  // RENDER
  return (
    <Container style={{ minHeight: '95vh' }}>
      <Row>
        <Col className="mb-4">
          <h4>Lista de Usuarios registrados</h4>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          {/* LISTA DE USUARIOS */}
          {allUsers &&
            allUsers.map((u) => {
              return (
                <CardDeleteUser
                  key={u.id}
                  email={u.name}
                  rol={u.rol}
                  onDataUser={onDataUser}
                  id={u.id}
                />
              );
            })}
        </Col>
        <Col md={6}>
          {/* DATOS DE UN USUARIO CLICKEADO */}
          {onUserData && <CardDataUser onDataUser={onDataUser} IdUser={IdUser} Reload={Reload} />}
        </Col>
      </Row>
    </Container>
  );
};

export default GetUsers;
