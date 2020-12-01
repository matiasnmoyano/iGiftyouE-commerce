import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getOnlyUser, deleteUser } from '../../Redux/actions';
import swal from 'sweetalert';
import './CardDeleteUser.css';

// MUESTRA EL EMAIL DE CADA USER REGISTRADO
const CardUser = ({ id, email, onDataUser, rol }) => {
  const dispatch = useDispatch();
  // RENDER
  return (
    <Card className="Card__Delete__User mb-2 p-1">
      <Col className="Card__Flex__Delete__User d-flex justify-content-between">
        <Col className=" d-flex align-items-center">
          {/* MUESTRA EMAIL */}
          <h6 className="nombreCardInfo">{email}</h6>
          <Button variant={rol === 'Admin' ? 'dark' : 'info'} className="rol">
            {rol}
          </Button>
        </Col>
        <Col className="d-flex justify-content-end">
          {/* NOS LLEVA AL COMPONENTE INFO DEL USER, CON DATOS DE UN SOLO USUARIO REGISTRADO */}
          <Button
            variant="success"
            onClick={() => {
              onDataUser(id, true);
              dispatch(getOnlyUser(id));
            }}
          >
            Info
          </Button>
          {/* ELIMINA UN USUARIO DE LA DB */}
          <Button
            variant="danger"
            className="ml-1"
            onClick={() => {
              swal({
                title: 'Eliminar',
                text: 'Estas seguro que deseas eliminar el usuario?',
                icon: 'warning',
                buttons: ['No', 'Si'],
              }).then((respuesta) => {
                if (respuesta) {
                  swal({
                    text: 'El usuario se eliminó con exito',
                    icon: 'success',
                  });
                  dispatch(deleteUser(id));
                }
              });
            }}
          >
            Delete
          </Button>
        </Col>
      </Col>
    </Card>
  );
};

export default CardUser;
