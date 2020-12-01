import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Col,
  Button,
  Modal,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import "./ProductCard.css";
import AdminCategoryCard from "./FormProduct/AdminCategoryCard";
import { Link } from "react-router-dom";

import {
  getAllCategories,
  getCategoriesOfProduct,
  addCategoryToProduct,
  deleteProduct,
  removeCategoryFromProduct,
  getProduct,
  addItemToCart,
  getReviewsOfProduct,
} from "../Redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";
import GiftRating from "./Reviews/GiftRating";

export default function ProductCard({
  product,
  deleteProduct,
  updateProduct,
  checkIfCartIsEmpty,
}) {
  const dispatch = useDispatch();
  const [modalEdit, setModalEdit] = useState(false);

  const [totalReviews, setTotalReviews] = useState(false);
  const ratingReviews = (s) => {
    var num =
      s.reduce(function (previous, current) {
        return parseInt(current.rating) + previous;
      }, 0) / s.length;

    setTotalReviews(num);
  };

  // State de inputs
  const [dataInputs, setDataInputs] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    image: product.image,
  });

  const [warnings, setWarnings] = useState({
    name: "",
    description: "",
    image: "",
  });

  const [validation, setValidation] = useState({
    description: true,
    image: true,
  });

  const [selectedCategory, setSelectedCategory] = useState("");

  const state = useSelector((state) => state);
  const { allCategories, currentCategoriesOfProduct } = state;

  let outOfStock = false;
  if (product.stock === 0) outOfStock = true;
  const cardType = () => {
    if (outOfStock) return "Card__Out";
    return "Card";
  };

  const [isShown, setIsShown] = useState(false);

  //Render products

  //agregar producto a categoría en base al nombre
  function deleteproduct(product) {
    swal({
      title: "Eliminar",
      text: "Estas seguro que deseas eliminar el producto?",
      icon: "warning",
      buttons: ["No", "Si"],
    }).then((respuesta) => {
      if (respuesta) {
        swal({ text: "El producto se elimino con exito", icon: "success" });

        deleteProduct(product.id);
      }
    });
  }
  useEffect(() => {
    dispatch(getAllCategories());
    getReviewsOfProduct(product.id, true).then((review) => {
      ratingReviews(review);
    });
  }, []);

  const renderCategories = () => {
    dispatch(getCategoriesOfProduct(product.name));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validation.image === false || validation.description === false) {
      return;
    }
    swal({
      title: "Editar",
      text: "Estas seguro que deseas editar este producto?",
      icon: "warning",
      buttons: ["No", "Si"],
    }).then((respuesta) => {
      if (respuesta) {
        swal({ text: "El producto se editó con éxito :)", icon: "success" });

        updateProduct(product.id, dataInputs);
        setModalEdit(!modalEdit);
      }
    });
  };

  const addCategory = () => {
    if (
      !selectedCategory ||
      selectedCategory === "No agregar a ninguna categoría"
    )
      return;

    const categoryID = allCategories.find(
      (cat) => cat.name === selectedCategory
    ).id;

    dispatch(addCategoryToProduct(product.id, categoryID))
      .then(
        swal({
          text: `La categoría ${selectedCategory} se ha vinculado con el producto ${product.name} exitosamente`,

          icon: "success",
        })
      )
      .then(() => {
        renderCategories();
      });
  };
  function addToCart() {
    let quantity = 1;

    let userActive = JSON.parse(localStorage.getItem("User"));
    let userId;

    if (userActive) {
      userId = userActive.id;

      let newProduct = {
        productId: product.id,
        price: product.price,
        quantity,
      };
      dispatch(addItemToCart(userId, newProduct)).then(() => {
        checkIfCartIsEmpty();
      });
    } else {
      let tempCart = JSON.parse(localStorage.getItem("Product"));

      if (!tempCart) tempCart = {};

      if (tempCart.hasOwnProperty([product.id])) {
        quantity += tempCart[product.id].quantity;
      }
      tempCart[product.id] = {
        price: product.price,
        quantity,
      };

      localStorage.setItem("Product", JSON.stringify(tempCart));
      checkIfCartIsEmpty();
    }

    swal({
      title: "Se agrego al carrito",
      text: "podras ver tu articulo en el carrito",
      icon: "success",
      button: "Aceptar",
    });
  }
  let userActive = JSON.parse(localStorage.getItem("User"));
  if (userActive === null) {
    var userRol = undefined;
  } else {
    var userRol = userActive.rol;
  }

  return (
    <div className="Card__Container">
      <div className="iconsCard">
        {userRol === "Admin" && (
          <button
            className="btnEditDelete"
            onClick={() => {
              setModalEdit(!modalEdit);
              renderCategories();
            }}
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-pencil-square"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "25px", height: "25px", margin: "5px" }}
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fillRule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              />
            </svg>
          </button>
        )}

        <Modal show={modalEdit}>
          <Modal.Header>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Col>
              {/* Column Nombre  | Descripcion */}
              <Form>
                {/* Nombre */}
                <Form.Group controlId="formBasicName">
                  <Form.Label>Nombre del Producto</Form.Label>
                  <Form.Control
                    type="text"
                    value={dataInputs.name}
                    placeholder="Ingrese nuevo nombre"
                    onChange={(e) => {
                      let value = e.target.value;
                      //reemplazamos espacios múltiples por uno solo
                      value = value.replace(/\s\s+/g, " ");
                      let regex = /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]+$/g;
                      //chequeamos que el input contenga solo letras (y chars especiales)
                      if (!regex.test(value) && value !== "") return;
                      //chequeamos que el input no sea demasiado largo
                      if (value.length > 30) return;
                      setDataInputs({
                        ...dataInputs,
                        name: value.toLowerCase(),
                      });
                    }}
                  />
                </Form.Group>
                {/* Descripcion */}
                <Form.Group controlId="formBasicName">
                  <Form.Label>Descripción</Form.Label>
                  <FormControl
                    as="textarea"
                    value={dataInputs.description}
                    aria-label="With textarea"
                    placeholder="Ingrese nueva descripcion del producto"
                    onChange={(e) => {
                      let value = e.target.value;
                      value = value.replace(/\s\s+/g, " ");
                      if (value.length < 10) {
                        if (value !== "") {
                          setWarnings({
                            ...warnings,
                            description: "La descripción es demasiado corta",
                          });
                        }

                        setValidation({
                          ...validation,
                          description: false,
                        });
                      } else {
                        setWarnings({ ...warnings, description: "" });

                        setValidation({
                          ...validation,
                          description: true,
                        });
                      }
                      setDataInputs({
                        ...dataInputs,
                        description: value,
                      });
                    }}
                  />
                  <Form.Text className="category-warnings">
                    {warnings.description}
                  </Form.Text>
                </Form.Group>
                {/* Column Precio  | Stock | Categoria */}
                <Form.Group>
                  <Form.Row className="form-flex">
                    <Col sm={5}>
                      {/* Precio */}
                      <Form.Label>Precio</Form.Label>
                      <InputGroup>
                        <InputGroup.Prepend>
                          <InputGroup.Text>$</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                          type="number"
                          placeholder="Precio"
                          value={dataInputs.price}
                          onChange={(e) => {
                            let value = e.target.value;
                            if (
                              parseInt(value) === "NaN" ||
                              parseInt(value) < 0
                            )
                              return;
                            setDataInputs({
                              ...dataInputs,
                              price: parseInt(value),
                            });
                          }}
                        />
                      </InputGroup>
                    </Col>
                    {/* Stock */}
                    <Col sm={3}>
                      <Form.Label>Stock</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Stock"
                        value={dataInputs.stock}
                        onChange={(e) => {
                          let value = e.target.value;
                          if (parseInt(value) === "NaN" || parseInt(value) < 0)
                            return;
                          setDataInputs({
                            ...dataInputs,
                            stock: parseInt(value),
                          });
                        }}
                      />
                    </Col>
                  </Form.Row>
                </Form.Group>
                {/* Column  Imagen | Check */}
                <Form.Group>
                  <Form.Label>Imagen</Form.Label>
                  <FormControl
                    as="textarea"
                    value={dataInputs.image}
                    aria-label="With textarea"
                    placeholder="Ingrese la url de imagen del producto"
                    onChange={(e) => {
                      let value = e.target.value;
                      let regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g;
                      //chequeamos que el input sea una URL válida
                      if (!regex.test(value)) {
                        if (value !== "") {
                          setWarnings({
                            ...warnings,
                            image: "El link proporcionado no es una URL válida",
                          });
                        }

                        setValidation({
                          ...validation,
                          image: false,
                        });
                      } else {
                        setWarnings({ ...warnings, image: "" });
                        setValidation({
                          ...validation,
                          image: true,
                        });
                      }
                      setDataInputs({ ...dataInputs, image: value });
                    }}
                  />

                  <Form.Text className="category-warnings">
                    {warnings.image}
                  </Form.Text>
                </Form.Group>
              </Form>
            </Col>
            <div className="compartimento">
              {currentCategoriesOfProduct.map(({ id, name, description }) => {
                if (!id) return;
                return (
                  <AdminCategoryCard
                    categoryID={id}
                    name={name}
                    description={description}
                    productName={product.name}
                    productID={product.id}
                    renderCategories={renderCategories}
                    removeCategoryFromProduct={(productID, categoryID) =>
                      dispatch(removeCategoryFromProduct(productID, categoryID))
                    }
                  />
                );
              })}
            </div>
            <Col>
              <Form.Label>Seleccionar</Form.Label>
              <Form.Control
                as="select"
                required
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                }}
              >
                <option>No agregar a ninguna categoría</option>
                {allCategories.map(({ id, name }) => (
                  <option key={id} value={name}>
                    {name[0].toUpperCase() + name.slice(1)}
                  </option>
                ))}
              </Form.Control>
              <div className="Button_AgregarProducto">
                <button
                  type="submit"
                  className="btn btn-success "
                  onClick={addCategory}
                >
                  Agregar producto a categoría
                </button>
              </div>
            </Col>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setModalEdit(!modalEdit)}
            >
              Cerrar
            </Button>
            <Button variant="success" type="submit" onClick={handleSubmit}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>

        {userRol === "Admin" && (
          <button
            className="btnEditDelete"
            onClick={() => deleteproduct(product)}
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
        )}
      </div>
      <div className={cardType()}>
        {outOfStock || (
          <div
            className="Card__Img"
            style={{ backgroundImage: `url(${product.image})` }}
          ></div>
        )}
        {outOfStock && (
          <div
            className="Card__Out__Img"
            style={{ backgroundImage: `url(${product.image})` }}
          >
            <div className="Card__Out__Over">
              <p>{"AGOTADO"}</p>
            </div>
          </div>
        )}
        <div className="Card__Content">
          <div>
            <h6>{product.name}</h6>
          </div>
          <div>
            <h2 className="Card__Price">${product.price}</h2>
          </div>

          <p style={{ marginTop: "0px" }}>
            {(totalReviews && (
              <GiftRating finalRating={totalReviews}></GiftRating>
            )) ||
              (typeof totalReviews === "number" && (
                <GiftRating starsEmpty={true}></GiftRating>
              )) || (
                <div style={{ margin: "29px", "letter-spacing": "12px" }}>
                  .
                </div>
              )}
          </p>

          <div id="linkProduct">
            {outOfStock || (
              <div className="Card__More__Shopping">
                <Link
                  to={`/product/${product.id}`}
                  style={
                    userRol === "Admin" ? { width: "100%" } : { width: "80%" }
                  }
                >
                  <button className="Card__Button">Ver más</button>
                </Link>
                {userRol !== "Admin" && (
                  <button
                    onClick={() => addToCart()}
                    className="Card__Button__Shopping"
                  >
                    <FontAwesomeIcon
                      icon={faShoppingCart}
                      style={{ color: "black", fontSize: "16px" }}
                      className="Icon_Shopping_Animate"
                    />
                  </button>
                )}
              </div>
            )}
            {outOfStock && (
              <button
                className="Card__Button__Out"
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}
              >
                <span className="Out__Rotate">
                  {isShown || "..."}
                  {isShown && "¯_༼ ಥ ‿ ಥ ༽_/¯"}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
