import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const CheckoutCompleted = () => {
  return (
    <Container style={{ minHeight: "85vh" }}>
      <Row>
        <Col md={12} className="mt-5">
          <Card>
            <Card.Header className="pl-3">
              <h1>FELICIDADES! TU COMPRA SE REALIZO CON EXITO </h1>
            </Card.Header>
            <Card.Body className="pl-3">
              <div>
                <h5>Te avisaremos por email el estado de tu pedido</h5>
              </div>

              {/* <div className="d-flex">
                <div style={{ width: '300px' }}>
                  <h5>Detalles de tu compra : </h5>
                </div>
                <div>
                  <div>
                    <h5>Producto : blabla bla bla bla x1 $13213</h5>
                    <h5>Producto : blabla bla bla bla x2 $13213</h5>
                    <h5>Producto : blabla bla bla bla x4 $13213</h5>
                    <h5>Producto : blabla bla bla bla x2 $13213</h5>
                    <h5>Producto : blabla bla bla bla x1 $13213</h5>
                  </div>
                </div>
              </div> */}
            </Card.Body>
            {/* <hr />
            <Card.Body className="pl-3">
              <div className="d-flex">
                <div style={{ width: '300px' }}>
                  <h5>Detalles de Facturacion/Envio : </h5>
                </div>
                <div
                  className="d-flex justify-content-around"
                  style={{ width: '100%', textAlign: 'start' }}
                >
                  <div>
                    <h5>Nombre : Franco@gmail.com</h5>
                    <h5>Email 1: Franco@gmail.com</h5>
                    <h5>Direccion : Franco@gmail.com</h5>
                    <h5>Horarios 6: Franco@gmail.com</h5>
                    <h5>Provincia 6: Franco@gmail.com</h5>
                  </div>
                  <div>
                    <h5>Apellido : Franco@gmail.com</h5>
                    <h5>Celular : Franco@gmail.com</h5>
                    <h5>Numero 6: Franco@gmail.com</h5>
                    <h5>Dto | casa : Franco@gmail.com</h5>
                    <h5>Localidad : Franco@gmail.com</h5>
                  </div>
                </div>
              </div>
            </Card.Body> */}
            <Card.Footer className="pl-3"></Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutCompleted;
