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
import "./OutOfStockCard.css";
import AdminCategoryCard from "./FormProduct/AdminCategoryCard";
import { Link } from "react-router-dom";
import {
  updateProduct,
  getAllCategories,
  getCategoriesOfProduct,
  addCategoryToProduct,
  deleteProduct,
  removeCategoryFromProduct,
  getProduct,
} from "../Redux/actions";

export default function OutOfStockCard({
  product,
  deleteProduct,
  renderProducts,
}) {
  const dispatch = useDispatch();
  const [modalEdit, setModalEdit] = useState(false);

  // State de inputs
  const [dataInputs, setDataInputs] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    image: product.image,
  });

  const [selectedCategory, setSelectedCategory] = useState("");
  const state = useSelector((state) => state);
  const { allCategories, currentCategoriesOfProduct } = state;

  const [isShown, setIsShown] = useState(false);

  //Render products

  //agregar producto a categoría en base al nombre

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const renderCategories = () => {
    dispatch(getCategoriesOfProduct(product.name));
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
        alert(
          `La categoría ${selectedCategory} se ha vinculado con el producto ${product.name} exitosamente`
        )
      )
      .then(() => {
        renderCategories();
      });
  };

  return (
    <div className="Card__Container">
      <div className="iconsCard">
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
                      setDataInputs({
                        ...dataInputs,
                        name: e.target.value,
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
                      setDataInputs({
                        ...dataInputs,
                        description: e.target.value,
                      });
                    }}
                  />
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
                            setDataInputs({
                              ...dataInputs,
                              price: parseInt(e.target.value),
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
                          setDataInputs({
                            ...dataInputs,
                            stock: parseInt(e.target.value),
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
                      setDataInputs({
                        ...dataInputs,
                        image: e.target.value,
                      });
                    }}
                  />
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
            <Button
              variant="success"
              type="submit"
              onClick={() => {
                dispatch(updateProduct(product.id, dataInputs)).then(() =>
                  renderProducts()
                );
                setModalEdit(!modalEdit);
              }}
            >
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
        <button
          className="btnEditDelete"
          onClick={() => deleteProduct(product.id)}
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

      <div className="Card__Out">
        <div
          className="Card__Out__Img"
          style={{ backgroundImage: `url(${product.image})` }}
        >
          <div className="Card__Out__Over">
            <p>{"AGOTADO"}</p>
          </div>
        </div>
        <div className="Card__Content">
          <div>
            <h6>{product.name}</h6>
          </div>
          <div>
            <h2 className="Card__Price">${product.price}</h2>
          </div>
          <div id="linkProduct">
            <button
              className="Card__Button__Out"
              onMouseEnter={() => setIsShown(true)}
              onMouseLeave={() => setIsShown(false)}
            >
              <span className="Out__Rotate">
              {isShown || ("...")}
              {isShown && ("¯\_༼ ಥ ‿ ಥ ༽_/¯")}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
