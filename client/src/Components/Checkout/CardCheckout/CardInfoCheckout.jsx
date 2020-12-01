import React from 'react';
import '../ContanienerCheckout/ContainerCheckout.css';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';

const CardInfoCheckout = ({ Suma, ProductAConfirmar }) => {
  return (
    <Card className="Card__Shopping__Price">
      <Card.Header className="style-card-shop Card__Shopping__Price">
        Detalles de tu compra
      </Card.Header>
      <Card.Body className="style-card-shop Card__Shopping__Price">
        <div className="Products-Checkout scroll-style mb-4 p-1">
          {ProductAConfirmar ? (
            Object.values(ProductAConfirmar).map((pro) => (
              <div key={pro.id} className="d-flex justify-content-between">
                <Link to={`/product/${pro.id}`}>
                  <p>{pro.name}</p>
                </Link>
                <p>x{pro.lineorder.quantity}</p>
              </div>
            ))
          ) : (
            <p>No hay productos</p>
          )}
        </div>
        <hr />
        <div className="p-1">
          <p>Envio: Gratis</p>
          <p>Cupon: Sin cupon</p>
          <p>Total : ${Suma ? Suma : 0}</p>
        </div>
      </Card.Body>
      {
        <Card.Footer className="style-card-shop Card__Footer__Price">
          <p className="text-muted text-center">Ingrese sus datos, para finalizar la compra!</p>
          {/*<Link to={'/signup'}>
					<div className="ButtonRegisterCheckout">
						<button className="button-card-price">Registrarme</button>
					</div>
					</Link>*/}
        </Card.Footer>
      }
    </Card>
  );
};

export default CardInfoCheckout;
