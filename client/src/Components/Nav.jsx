import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import "./Nav.css";
import "bootstrap/dist/css/bootstrap.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { FaRegUserCircle } from "react-icons/fa";
import Axios from "axios";
import MiPerfil from "./MiPerfil";
import MisCompras from "./MisCompras/MisCompras";

//------------Tomar datos de localStorage------------------
const userActive = JSON.parse(localStorage.getItem("User"));
if (userActive === null) {
  var userRol = undefined;
} else {
  var userRol = userActive.rol;
}

export default function Nav({ cartHasSomething }) {
  function redireccionar() {
    window.location = "http://localhost:3000/home";
  }
  //--------LOGOUT---------
  const userActive = JSON.parse(localStorage.getItem("User"));

  if (userActive === null) {
    var userRol = undefined;
  } else {
    var userRol = userActive.rol;
  }
  function logout() {
    Axios.get("http://localhost:3001/auth/logout", { withCredentials: true });
    localStorage.removeItem("User");
    localStorage.removeItem("Product");
    redireccionar();
  }

  //-------RENDERIZADO CONDICIONAL---------

  function Islogged() {
    return (
      <div classname="d-flex" style={{ display: "flex" }}>
        <div style={{ padding: "10px", cursor: "default" }}>
          {userActive.name}
        </div>
        <div>
          {" "}
          <Dropdown>
            <Dropdown.Toggle variant="transparent" id="dropdown-basic">
              <FaRegUserCircle />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={logout}>Cerrar sesion</Dropdown.Item>
              <Dropdown.Item onClick={MiPerfil} href="/miperfil">
                Mi perfil
              </Dropdown.Item>
              {userRol !== "Admin" && (
                <Dropdown.Item onClick={MisCompras} href="/miscompras">
                  Mis compras
                </Dropdown.Item>
              )}
              {userRol === "Admin" && (
                <Dropdown.Item href="/admin">
                  Configuración de Admin
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    );
  }
  function Isntlogged() {
    return (
      <div className="d-flex">
        <div>
          <Link to="/signin">
            <li className="nav-item">
              <span className="nav-link text-dark navPadding">
                Iniciar Sesión
              </span>
            </li>
          </Link>
        </div>
        <div>
          <Link to="/signup">
            <li className="nav-item">
              <span className="nav-link text-dark navPadding">Registrarse</span>
            </li>
          </Link>
        </div>
      </div>
    );
  }
  function Logged(user) {
    let userr = user.user;
    if (!userr) {
      return <Isntlogged />;
    } else {
      return <Islogged />;
    }
  }

  window.onscroll = function () {
    scrollFunction();
  };
  function scrollFunction() {
    document.getElementById("trasparent").style.transition = "background 0.4s";
    if (document.documentElement.scrollTop > 40) {
      document.getElementById("trasparent").style.background = "#d0b7a4";
    } else {
      document.getElementById("trasparent").style.background =
        "url(../Img/headerImg.jpg)";
    }
  }

  return (
    <nav className="pos">
      <header>
        <ul
          className="trasparent navbar navbar-expand-lg navbar-light   p-2   rounded nav"
          id="trasparent"
        >
          <Link to="/home">
            <span className="navbar-brand float-left navPadding" href="#">
              i<FontAwesomeIcon icon={faGift} />
              You
            </span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end listPadding"
            id="navbarTogglerDemo01"
          >
            <Link to="/home">
              <li className="nav-item ">
                <span className="nav-link text-dark navPadding">Inicio</span>
              </li>
            </Link>
            {/* <Link to='/home'>
          <li className="nav-item">
            <a className="nav-link text-dark" href="#">Nosotros</a>
          </li>
          </Link> */}
            <Link to="/products">
              <li className="nav-item">
                <span className="nav-link text-dark navPadding">Productos</span>
              </li>
            </Link>
            <Link to="/nosotros">
              <li className="nav-item">
                <span className="nav-link text-dark navPadding">Nosotros</span>
              </li>
            </Link>
            <Logged user={userActive}></Logged>

            {/* <Link to="/signin">
						<Link to="/products">
							<li className="nav-item">
								<span className="nav-link text-dark navPadding">Productos</span>
							</li>
						</Link>
						<Logged user={user}></Logged>
						{/* <Link to="/signin">
              <li onClick={console.log(user)} className="nav-item">
                <span className="nav-link text-dark navPadding">
                  Iniciar Sesión
                </span>
              </li>
            </Link>
            <Link to="/signup">
              <li className="nav-item">
                <span className="nav-link text-dark navPadding">
                  Registrarse
                </span>
              </li>
            </Link>
 		*/}

            <div className="nav-icon">
              {userRol !== "Admin" && (
                <Link to="/carrito">
                  <li>
                    <FontAwesomeIcon
                      icon={faShoppingCart}
                      style={{ color: "black", position: "relative" }}
                    />
                    {cartHasSomething && (
                      <svg
                        style={{ position: "absolute", right: "53px" }}
                        color="red"
                        width="0.7em"
                        height="0.7em"
                        viewBox="0 0 16 16"
                        class="bi bi-circle-fill"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="8" cy="8" r="8" />
                      </svg>
                    )}
                  </li>
                </Link>
              )}
            </div>
          </div>
        </ul>
      </header>
    </nav>
  );
}
