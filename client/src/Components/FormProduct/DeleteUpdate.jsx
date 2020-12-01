import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import AdminCategoryCard from "./AdminCategoryCard";
import {
  Card,
  Col,
  Container,
  Row,
  Button,
  Modal,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";

import swal from "sweetalert";
import {
  updateProduct,
  getAllCategories,
  getCategoriesOfProduct,
  addCategoryToProduct,
  deleteProduct,
  removeCategoryFromProduct,
  getProduct,
} from "../../Redux/actions";

const AddedProductsRender = ({
  id,
  name,
  description,
  price,
  stock,
  image,
  renderProducts,
}) => {
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [productCategories, setProductCategories] = useState([]);
  const state = useSelector((state) => state);
  const { allCategories, currentCategoriesOfProduct } = state;

  const [ModalState, setModalState] = useState(false);
  const [dataInputsUpdate, setDataInputsUpdate] = useState({
    name,
    description,
    price,
    stock,
    image,
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

  const handleSubmit = (e) => {
    if (validation.image === false || validation.description === false) {
      e.preventDefault();
      return;
    }

    swal({
      title: "Editar",
      text: "Estas seguro que deseas editar este producto?",
      icon: "warning",
      buttons: ["No", "Si"],
    }).then((respuesta) => {
      if (respuesta) {
        swal({ text: "El producto se eeditó con éxito :)", icon: "success" });
        dispatch(updateProduct(productID, dataInputsUpdate)).then(() => {
          renderProducts();

          setModalState(!ModalState);
        });
      }
    });
  };

  /* const handleDelete = (e) => {
    swal({
      title: "Eliminar",
      text: "Estas seguro que deseas eliminar este producto?",
      icon: "warning",
      buttons: ["No", "Si"],
    }).then((respuesta) => {
      if (respuesta) {
        swal({ text: "El producto se eliminó con éxito :)", icon: "success" });
        dispatch(deleteProduct(productID)).then(() => renderProducts());
      }
    });
  }; */

  //   const [allCategories, setAllCategories] = useState([]);

  // //State de Productos Agregados
  const productID = id;
  const productName = name;

  //Delete

  const renderCategories = () => {
    //acaa fijarse si el nombre que se selecciono es correcto++++++++++++++++++++++++++++
    dispatch(getCategoriesOfProduct(name));
  };

  //agregar producto a categoría en base al nombre
  const addCategory = () => {
    if (
      !selectedCategory ||
      selectedCategory === "No agregar a ninguna categoría"
    )
      return;
    const categoryID = allCategories.find(
      (cat) => cat.name === selectedCategory
    ).id;

    dispatch(
      addCategoryToProduct(productID, categoryID)
    )
      .then(
        swal({ text: `La categoría ${selectedCategory} se ha vinculado con el producto ${productName} exitosamente`, icon: "success" })
      )
      .then(() => {
        renderCategories();
      });
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);
  
  return (
    <>
      <Container>
        <Row>
          <Col md={12}>
            <Card border="warning mb-2 mt-2 ">
              <Card.Body className="d-flex align-items-center ">
                {name[0].toUpperCase() + name.slice(1)}
                <Col className="d-flex justify-content-end">
                  <Button
                    variant="warning"
                    onClick={() => {
                      dispatch(getProduct(productID)).then(() => {
                        console.log(state, "soy el nuevo estado");
                        if (name) dispatch(getCategoriesOfProduct(name));
                        console.log(
                          productID,
                          "soy el id del producto, no debería ser el mismo que antes"
                        );
                        setModalState(!ModalState);
                      });
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    className="ml-2"
                    onClick={() =>
                      dispatch(deleteProduct(productID)).then(() =>
                        renderProducts()
                      )
                    }                 >
                    Delete
                  </Button>
                </Col>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* Modificar Producto */}
        <Modal show={ModalState}>
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
                    value={dataInputsUpdate.name}
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
                      setDataInputsUpdate({
                        ...dataInputsUpdate,
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
                    value={dataInputsUpdate.description}
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
                      setDataInputsUpdate({
                        ...dataInputsUpdate,
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
                  <Form.Row>
                    <Col sm={3}>
                      {/* Precio */}
                      <Form.Label>Precio</Form.Label>
                      <InputGroup>
                        <InputGroup.Prepend>
                          <InputGroup.Text>$</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                          type="number"
                          placeholder="Precio"
                          value={dataInputsUpdate.price}
                          onChange={(e) => {
                            let value = e.target.value;
                            if (
                              parseInt(value) === "NaN" ||
                              parseInt(value) < 0
                            )
                              return;
                            setDataInputsUpdate({
                              ...dataInputsUpdate,
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
                        value={dataInputsUpdate.stock}
                        onChange={(e) => {
                          let value = e.target.value;
                          if (parseInt(value) === "NaN" || parseInt(value) < 0)
                            return;
                          setDataInputsUpdate({
                            ...dataInputsUpdate,
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
                    value={dataInputsUpdate.image}
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
                      setDataInputsUpdate({
                        ...dataInputsUpdate,
                        image: value,
                      });
                    }}
                  />
                  <Form.Text className="category-warnings">
                    {warnings.image}
                  </Form.Text>
                </Form.Group>
              </Form>
            </Col>
            {currentCategoriesOfProduct.map(({ id, name, description }) => {
              if (!id) return;
              return (
                <AdminCategoryCard
                  categoryID={id}
                  name={name}
                  description={description}
                  productName={productName}
                  productID={productID}
                  renderCategories={renderCategories}
                  removeCategoryFromProduct={(productID, categoryID) =>
                    dispatch(removeCategoryFromProduct(productID, categoryID))
                  }
                />
              );
            })}
            <Col>
              <Form.Label>Seleccionar</Form.Label>
              <Form.Control
                as="select"
                defaultValue="Choose..."
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
              <button onClick={addCategory}>
                Agregar producto a categoría
              </button>
            </Col>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setModalState(!ModalState);
              }}
            >
              Cerrar
            </Button>
            <Button variant="success" type="submit" onClick={handleSubmit}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default AddedProductsRender;
