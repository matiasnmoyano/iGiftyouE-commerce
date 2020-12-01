import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Axios from "axios";
import Nav from "./Components/Nav";
import Product from "./Components/Product";
import Errorr from "./Components/Error";
import Catalogue from "./Components/Catalogue";
import FormProduct from "./Components/FormProduct/CreateReadProduct";
import FormCategory from "./Components/FormCategory/CreateReadCategory";
import Home from "./Components/Home";
import Oauth from "./Components/Oauth";
import Footer from "./Components/Footer/Footer";
import SignIn from "./Components/LoginRegister/SignIn/SignIn";
import SignUp from "./Components/LoginRegister/SignUp/SignUp";
import ShoppingCart from "./Components/ShoppingCart/ShoppingCart";
import AdminCard from "./Components/AdminCard/AdminCard";
import MiPerfil from "./Components/MiPerfil";
import GetUsers from "./Components/UsersRead/GetUsers";
import Orders from "./Components/AdminCard/Orders";
import ContainerCheckout from "./Components/Checkout/ContanienerCheckout/ContainerCheckout";
import CheckoutCompleted from "./Components/Checkout/CheckoutCompleted/CheckoutCompleted";
import Question from "./Components/Questions/Question";
import FormQuiz from "./Components/AdminCard/FormQuiz/FormQuiz.jsx";
import AboutUs from "./Components/AboutUs";
import MisCompras from "./Components/MisCompras/MisCompras";
import { useSelector, useDispatch } from "react-redux";
import { getUserOrders } from "./Redux/actions.js";

export default function App() {
  const [cartHasSomething, setCartHasSomething] = useState(false);

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { userOrders } = state;

  useEffect(() => {
    loginMe();
    return () => {
      loginMe();
    };
  }, []);

  const loginMe = () => {
    Axios.get(`http://localhost:3001/auth/me`, {
      withCredentials: true,
    }).then((user) => localStorage.setItem("User", JSON.stringify(user.data)));
  };

  const userActive = JSON.parse(localStorage.getItem("User"));

  if (userActive === null) {
    var userRol = undefined;
  } else {
    var userRol = userActive.rol;
  }

  //------------TRAEMOS CARRITO DE LOCAL STORAGE O BASE DE DATOS SEGÚN CORRESPONDA------------
  const checkIfCartIsEmpty = () => {
    let userActive = JSON.parse(localStorage.getItem("User"));
    if (userActive) {
      dispatch(getUserOrders(userActive.id)).then((orders) => {
        if (!orders) return;
        console.log("carritos del usuario activo", orders);
        let curso = orders.find((order) => order.status === "curso");
        console.log("carrito activo", curso);
        if (!curso) return;
        if (curso.products && curso.products[0]) {
          setCartHasSomething(true);
          return;
        }
        setCartHasSomething(false);
      });
    } else {
      const tempCart = JSON.parse(localStorage.getItem("Product"));
      if (tempCart && Object.keys(tempCart).length) {
        setCartHasSomething(true);
        return;
      }
      setCartHasSomething(false);
    }
  };
  //-----------------USE EFFECT------------------
  useEffect(() => {
    checkIfCartIsEmpty();
  }, []);

  return (
    <Footer>
      {/* <Route path="/" component={Nav} /> */}
      <Route
        path="/"
        render={() => <Nav cartHasSomething={cartHasSomething} />}
      />
      <Route exact path="/home" component={Home} />
      <Route exact path="/oauth" component={Oauth} />
      <Route
        exact
        path="/products"
        render={() => <Catalogue checkIfCartIsEmpty={checkIfCartIsEmpty} />}
      />
      <Route
        exact
        path="/product/:id"
        render={() => <Product checkIfCartIsEmpty={checkIfCartIsEmpty} />}
      />
      <Route
        exact
        path="/carrito/checkout"
        render={() => (
          <ContainerCheckout checkIfCartIsEmpty={checkIfCartIsEmpty} />
        )}
      />
      <Route path="/nosotros" component={AboutUs} />
      <Route
        exact
        path="/carrito/checkout/pedido/:user/:num"
        render={() => (
          <CheckoutCompleted checkIfCartIsEmpty={checkIfCartIsEmpty} />
        )}
      />
      <Route
        exact
        path="/miscompras"
        component={userRol === "Client" ? MisCompras : Errorr}
      />
      <Route
        exact
        path="/quiz"
        render={() => <Question checkIfCartIsEmpty={checkIfCartIsEmpty} />}
      />

      <Route
        exact
        path="/form"
        component={userRol === "Admin" ? FormProduct : Errorr}
      />
      <Route
        exact
        path="/formCategory"
        component={userRol === "Admin" ? FormCategory : Errorr}
      />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <Route
        exact
        path="/carrito"
        render={() => <ShoppingCart checkIfCartIsEmpty={checkIfCartIsEmpty} />}
      />
      <Route
        exact
        path="/admin"
        component={userRol === "Admin" ? AdminCard : Errorr}
      />
      <Route
        exact
        path="/users"
        component={userRol === "Admin" ? GetUsers : Errorr}
      />
      <Route
        exact
        path="/orders"
        component={userRol === "Admin" ? Orders : Errorr}
      />
      <Route
        exact
        path="/formQuiz"
        component={userRol === "Admin" ? FormQuiz : Errorr}
      />
      <Route
        exact
        path="/miperfil"
        component={
          userRol === "Client" || userRol === "Admin" ? MiPerfil : Errorr
        }
      />
    </Footer>
    /*     	 */
  );
}
