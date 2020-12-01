import React, { useState, useEffect } from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import ButtonPromote from './ButtonPromote';
import ButtonDemote from './ButtonDemote';
import './CardDataUser.css';
// MUESTRA LOS DATOS DE UN SOLO USUARIO
const CardDataUser = ({ onDataUser, Reload }) => {
  const state = useSelector((state) => state);
  const { onlyUser } = state;
  return (
    <Card className="Card__Data__User">
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
            {/* EVALUA SI HAY DATOS INGRESADOS */}
            {!!Object.keys(onlyUser).length ? (
              <div>
                <h6 className="d-flex">
                  Nombre: <p className="ml-2 text-muted">{onlyUser.name}</p>
                </h6>
                <h6 className="d-flex">
                  Nombre de usuario: <p className="ml-2 text-muted">{onlyUser.username}</p>
                </h6>
                <h6 className="d-flex">
                  Email: <p className="ml-2 text-muted">{onlyUser.email}</p>
                </h6>
                <h6 className="d-flex">
                  Fecha: <p className="ml-2 text-muted">{onlyUser.createdAt.substring(0, 10)}</p>
                </h6>

                {onlyUser && onlyUser.rol === 'Client' && (
                  <ButtonPromote id={onlyUser.id} Reload={Reload} onDataUser={onDataUser} />
                )}
                {onlyUser && onlyUser.rol === 'Admin' && (
                  <ButtonDemote id={onlyUser.id} Reload={Reload} onDataUser={onDataUser} />
                )}
              </div>
            ) : (
              <div>
                <h6>Aqui se mostraran los datos del usuario</h6>
              </div>
            )}
          </Col>
        </Col>
      </Card.Body>
      <Card.Footer>
        <div>
          {/* SETEA(OCULTA) EL CARD  CON LOS DATOS DEL USUARIO */}
          <button className="button-home" onClick={() => onDataUser(false)}>
            Cerrar
          </button>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default CardDataUser;
