import React, { useState, useEffect } from "react";
import "./ContainerCheckout.css";
import FormCheckout from "../FormCheckout/FormCheckout";
import CardInfoCheckout from "../CardCheckout/CardInfoCheckout";
import { Container, Row, Col, Card } from "react-bootstrap";
import { getUserOrders } from "../../../Redux/actions.js";
import { useSelector, useDispatch } from "react-redux";

const ContainerCheckout = (props) => {
  const dispatch = useDispatch();
  const [productUserCheckout, setProductUserCheckout] = useState([]);
  const [sumaTotalCheckout, setSumaTotalCheckout] = useState(0);

  useEffect(() => {
    if (productUserCheckout[0]) return;
    dispatch(getUserOrders(userActive.id)).then((orders) => {
      if (!orders) return;
      let curso = orders.find((order) => order.status === "curso");
      let sumaTotal = 0;

      if (!curso || !curso.products) return;

      for (let prod of curso.products) {
        let { price, quantity } = prod.lineorder;
        sumaTotal += price * quantity;
      }

      setSumaTotalCheckout(sumaTotal);

      setProductUserCheckout(curso.products);
    });
  }, []);

  let userActive = JSON.parse(localStorage.getItem("User"));
  if (!userActive) return;

  return (
    <>
      <Container className="Container-General-Checkout">
        <Row>
          <Col md={5} style={{ textAlign: "start" }} className="mt-2">
            {productUserCheckout && (
              <CardInfoCheckout
                Suma={sumaTotalCheckout}
                ProductAConfirmar={productUserCheckout}
              />
            )}
          </Col>
          <Col md={7} className="mt-2">
            <FormCheckout router={props} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ContainerCheckout;
