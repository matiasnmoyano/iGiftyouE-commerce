import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import CardShop from "./CardShop";
import {
  deleteItemFromCart,
  emptyCart,
  getUserOrders,
} from "../../Redux/actions.js";
import { useSelector, useDispatch } from "react-redux";
import "./ShoppingCart.css";
import swal from "sweetalert";
const Style = {
  text: {
    textAlign: "start",
  },
};

const ShoppingCart = ({ checkIfCartIsEmpty }) => {
  const dispatch = useDispatch();
  const [act, setAct] = useState(0);
  let [sumTotal, setsumTotal] = useState(0);
  const [activeOrder, setActiveOrder] = useState({});
  const [userId, setUserId] = useState();

  const state = useSelector((state) => state);
  const { userOrders } = state;

  let tempCart = JSON.parse(localStorage.getItem("Product"));

  if (!tempCart) tempCart = {};

  const renderProducts = () => {
    let userActive = JSON.parse(localStorage.getItem("User"));
    if (!userActive) return;
    setUserId(userActive.id);
    dispatch(getUserOrders(userActive.id)).then((orders) => {
      if (!orders) return;
      let curso = orders.find((order) => order.status === "curso");
      console.log(orders, "orders");
      console.log(curso, "curso");
      setActiveOrder(curso);
      checkIfCartIsEmpty();
    });
  };

  useEffect(() => {
    renderProducts();
  }, []);

  //Esta funcion iba cuando apretabas el boton Finalizar Compra ¿Que deberia pasar si apretamos Finalizar compra siendo guest?
  /* function buy (){
    if(!user){
      swal({
        title: 'No estas logueado',
        text:'Te redireccionaremos a Login',
        icon:'info',
        button:'Aceptar',
      })
      window.location.href = "http://localhost:3000/signin"
    }else{
      Object.keys(tempCart).map(id => {
        const product = {
          productId: id,
          price: tempCart[id].price,
          quantity: tempCart[id].quantity,
        }
        dispatch(addItemToCart(user.id, product))
      })
      swal({
        title: 'Excelente',
        text:'Tenes las cosas de invitado en tu carrito',
        icon:'success',
        button:'Aceptar',
    })
    dispatch(getAllItemsToCart(user.id))
    .then(user => console.log(user))
    
    console.log('soy items de user')
  }
} */

  /*const priceTotal = () => {
		var sum = 0;
		if (Object.keys(tempCart).length !== 0) {
			for (const key in tempCart) {
				var num = new Number(tempCart[key].price * tempCart[key].quantity);
				sum = num + sum;
			}
		}
		localStorage.setItem('SumaTotal', JSON.stringify(sumTotal));
		setsumTotal(sum);
	};*/
  function emptyUserCart() {
    swal({
      title: "Eliminar",
      text: "Estas seguro que deseas eliminar todos los productos?",
      icon: "warning",
      buttons: ["No", "Si"],
    }).then((respuesta) => {
      if (respuesta) {
        const userActive = JSON.parse(localStorage.getItem("User"));
        if (userActive && userActive.id) {
          setUserId(userActive.id);
          dispatch(emptyCart(userActive.id));
        } else localStorage.removeItem("Product");
        priceTotal(-sumTotal);
        swal({
          text: "Los producto se eliminaro con exito",
          icon: "success",
          timer: 950,
          button: false,
        }).then(() => {
          setActiveOrder({});
          window.location.reload();
        });
      }
    });
  }

  const updateCart = (productId) => {
    swal({
      title: "Eliminar",
      text: "Estas seguro que deseas eliminar el producto del carrito?",
      icon: "warning",
      buttons: ["No", "Si"],
    }).then((respuesta) => {
      if (respuesta) {
        const userActive = JSON.parse(localStorage.getItem("User"));
        if (!userActive) {
          priceTotal(
            -(tempCart[productId].price * tempCart[productId].quantity)
          );
          delete tempCart[productId];
          localStorage.setItem("Product", JSON.stringify(tempCart));
        } else if (userActive && userActive.id) {
          setUserId(userActive.id);
          let currentProduct;
          if (activeOrder && activeOrder.products)
            currentProduct = activeOrder.products.find(
              (p) => p.id === productId
            );
          let price;
          let quantity;
          //let {price, quantity} = currentProduct.lineorder;
          if (currentProduct && currentProduct.lineorder) {
            price = currentProduct.lineorder.price;
            quantity = currentProduct.lineorder.quantity;
            priceTotal(-price);
          }
          //productId === 2
          //activeOrder.products = [..., ..., id: , lineorder: {
          //price
          //quantity
          dispatch(deleteItemFromCart(userActive.id, productId)).then(() =>
            renderProducts()
          );
        }
        setAct(act + 1);
        swal({
          text: "El producto se elimino con exito",
          icon: "success",
          timer: 1000,
          button: false,
        }).then(() => {
          window.location.reload();
        });
      }
    });

    //setCambiado(!cambiado)
  };

  /*useEffect(() => {
		//priceTotal();
	}, [tempCart]);*/

  const priceTotal = (x) => {
    var num1 = new Number(x);
    var num2 = new Number(sumTotal);
    setsumTotal(num1 + num2);
    localStorage.setItem("SumaTotal", JSON.stringify(num1 + num2));
  };

  const minProduct = () => {
    swal({
      icon: "error",
      title: "Recuerde!",
      text: "Agregue minimo un producto al carrito de compras",
      dangerMode: true,
    }).then(() => {});
  };

  const sesion = () => {
    swal({
      icon: "info",
      title: "Antes de seguir",
      text: "debes iniciar seción antes de finalizar la compra",
    }).then(() => {});
  };

  return (
    <>
      <Container style={{ minHeight: "85vh" }}>
        <Row>
          <Col md={8} style={Style.text}>
            <Card className="mb-4">
              <Card.Header
                style={{
                  background: "rgba(227, 215, 207, 0.88)",
                  border: "none",
                }}
              >
                Productos en tu carrito{" "}
              </Card.Header>
              {/* <Card.Body>
                Eliminar todos los productos
                <div className="Button__Container__Shop">
                  <button
                    style={{ width: "10%" }}
                    className="btnEditDelete"
                    onClick={() => emptyUserCart()}
                  >
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="bi bi-trash-fill"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        width: "25px",
                        height: "25px",
                        margin: "5px",
                        color: "#AA123D",
                      }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"
                      />
                    </svg>
                  </button>
                </div>
              </Card.Body> */}
            </Card>
            {!userId &&
              Object.keys(tempCart).map((key) => (
                <CardShop
                  price={tempCart[key].price}
                  quantity={tempCart[key].quantity}
                  productId={key}
                  updateCart={updateCart}
                  addToSumTotal={priceTotal}
                  notUpdate={act}
                />
              ))}
            {userId &&
              activeOrder &&
              activeOrder.products &&
              activeOrder.products.map((product, i, o) => {
                return (
                  <CardShop
                    price={product.lineorder.price}
                    quantity={product.lineorder.quantity}
                    productId={product.id}
                    updateCart={updateCart}
                    addToSumTotal={priceTotal}
                    notUpdate={act}
                    userId={userId}
                  />
                );
              })}
          </Col>
          <Col md={4} style={Style.text}>
            <Card className="Card__Shopping__Price">
              <Card.Header className="style-card-shop Card__Shopping__Price">
                Precio Total
              </Card.Header>
              <Card.Body className="style-card-shop Card__Shopping__Price">
                <p>Subtotal : ${sumTotal}</p>
                <p>Envio: Gratis</p>
                <p>Cupon: Sin cupon</p>
              </Card.Body>
              <Card.Footer className="style-card-shop Card__Footer__Price">
                <Link
                  to={
                    ((activeOrder &&
                      activeOrder.products &&
                      !activeOrder.products[0]) ||
                      (!userId && !Object.keys(tempCart)[0])) &&
                    "/products"
                  }
                  onClick={
                    (((activeOrder &&
                      activeOrder.products &&
                      !activeOrder.products[0]) ||
                      (!userId && !Object.keys(tempCart)[0])) &&
                      minProduct) ||
                    (() => emptyUserCart())
                  }
                >
                  <button className="mr-4 button-card-price">
                    Vaciar Carrito
                  </button>
                </Link>
                <Link
                  to={
                    (userId &&
                      activeOrder &&
                      ((activeOrder.products &&
                        !activeOrder.products[0] &&
                        "/products") ||
                        "/carrito/checkout")) ||
                    "/signin"
                  }
                  onClick={
                    (activeOrder &&
                      activeOrder.products &&
                      !activeOrder.products[0] &&
                      minProduct) ||
                    (!userId && sesion)
                  }
                >
                  <button className="button-card-price">
                    Finalizar Compra
                  </button>
                </Link>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ShoppingCart;
