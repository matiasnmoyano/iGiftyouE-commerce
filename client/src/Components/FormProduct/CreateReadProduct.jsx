import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getAllCategories,
  getAllQuestions,
  addCategoryToProduct,
  addCategoryToProductByName,
} from "../../Redux/actions.js";
import Axios from "axios";
import swal from "sweetalert";
import DeleteUpdate from "./DeleteUpdate";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  FormControl,
  InputGroup,
  Table,
} from "react-bootstrap";

const FormProduct = () => {
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState([]);
  const [questionsIds, setQuestionsIds] = useState({});
  const [dataInputs, setDataInputs] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
  });

  const [warnings, setWarnings] = useState({
    name: "",
    description: "",
    image: "",
  });

  const [validation, setValidation] = useState({
    description: false,
    image: false,
  });

  const state = useSelector((state) => state);

  // //State de Productos Agregados
  const { allProducts, allCategories } = state;
  const [categoryName, setCategoryName] = useState(null);

  //Render products

  const renderProducts = () => {
    dispatch(getAllProducts());
    dispatch(
      getAllCategories()
    ); /* .then((cats) => {
      if (categoryName || !cats || !cats[0] || !cats[0].name) return;
      setCategoryName(cats[0].name);
      console.log("CATS0NAME", cats[0].name);
    }); */
  };

  /* const getIDs = () => {
    alert(`${nameID} es el id del producto y ${categoryID} sería el de la categoría`);
    renderProducts();
    dispatch(getAllCategories()).then(() => console.log(state, "soy el estado"));
    dispatch(getAllProducts())let nameID = allProducts.find(product => product.name === dataInputs.name).id;
    
    //hacer un find para encontrar el id de la categoría, guardarlo en estado y después en bindProductToCategory meterlo en la URL
	  setCurrentProductReact({...currentProductReact, nameID, categoryID});
  } */

  /*  const bindProductToCategory = () => {
    const {nameID, categoryID} = currentProductReact;
    dispatch(addCategoryToProduct(nameID, categoryID));
  }; */

  //Function onForm
  const onForm = (e) => {
    e.preventDefault();
    if (validation.image === false || validation.description === false) {
      return;
    }

    let category = allCategories.find((cat) => cat.name === categoryName);

    console.log(category, "SOY CATEGORY");

    swal({
      title: "Crear",
      text: "Estas seguro que deseas crear este producto?",
      icon: "warning",
      buttons: ["No", "Si"],
    }).then((respuesta) => {
      if (respuesta) {
        swal({ text: "El producto se creó con éxito :)", icon: "success" });
        dispatch(createProduct(dataInputs)).then(() => {
          if (category && category.id) {
            dispatch(addCategoryToProductByName(dataInputs.name, category.id));
          }
          dispatch(getAllProducts());
          for (let currentQuestionId in questionsIds) {
            if (
              typeof questionsIds[currentQuestionId].booleanAnswer === "boolean"
            ) {
              console.log(currentQuestionId, "soy currentQuestionId");
              console.log(dataInputs.name, "soy productName");
              Axios.post(
                `${process.env.REACT_APP_API_URL}/question/${currentQuestionId}/productsbyname/${dataInputs.name}`,
                {
                  booleanAnswer: questionsIds[currentQuestionId].booleanAnswer,
                }
              );
            }
          }

          //recorrer questionsIds
          //para cada propiedad que sea true, tomar el nombre de la propiedad como questionId
          //request POST :idQuestion/products/:idProduct
          //</loop>
        });

        //window.location.reload();
      }
    });
  };

  useEffect(() => {
    renderProducts();
    console.log("render");
    //Traigo todas las preguntas
    getAllQuestions(true).then((arrayQuestions) => {
      var arr = [...arrayQuestions];
      setQuestions(arr);
      let initialQuestionIds = {};
      for (let question in arr) {
        initialQuestionIds[arr[question].id] = {
          booleanAnswer: null,
        };
      }
      setQuestionsIds(initialQuestionIds);
    });
    console.log(questions, "soy questions");
  }, []);

  return (
    <>
      <Container>
        <Row>
          {/* Fomulario
           */}
          <Col md={6}>
            <h5>Agrega productos a tu catalogo</h5>
            <Form.Text className="text-muted">
              Todos los campos deben estar completos para agregar un nuevo
              producto.
            </Form.Text>

            {/* Column Nombre  | Descripcion */}
            <Form
              className="mt-4 mb-5"
              onSubmit={onForm}
              style={{
                background: "rgba(238, 238, 238, 0.349)",
                padding: "15px",
                borderRadius: "15px",
              }}
            >
              {/* Nombre */}
              <Form.Group controlId="formBasicName">
                <Form.Label>Nombre de Producto</Form.Label>
                <Form.Control
                  type="text"
                  value={dataInputs.name}
                  placeholder="Ingrese nombre"
                  onChange={(e) => {
                    let value = e.target.value;
                    //reemplazamos espacios múltiples por uno solo
                    value = value.replace(/\s\s+/g, " ");
                    let regex = /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]+$/g;
                    //chequeamos que el input contenga solo letras (y chars especiales)
                    if (!regex.test(value) && value !== "") return;
                    //chequeamos que el input no sea demasiado largo
                    if (value.length > 30) return;
                    setDataInputs({ ...dataInputs, name: value.toLowerCase() });
                  }}
                  required
                />
              </Form.Group>
              {/* Descripcion */}
              <Form.Group controlId="formBasicName">
                <Form.Label>Descripción</Form.Label>
                <FormControl
                  as="textarea"
                  aria-label="With textarea"
                  required
                  value={dataInputs.description}
                  placeholder="Ingrese descripcion del producto"
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
                <Form.Row>
                  <Col sm={3}>
                    {/* Precio */}
                    <Form.Label>Precio</Form.Label>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>$</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="number"
                        placeholder="Precio"
                        required
                        value={dataInputs.price}
                        onChange={(e) => {
                          let value = e.target.value;
                          if (parseInt(value) === "NaN" || parseInt(value) < 0)
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
                      required
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
                  {/* Categorias */}
                  <Col>
                    <Form.Label>Categoria</Form.Label>
                    <Form.Control
                      as="select"
                      defaultValue="Choose..."
                      required
                      onChange={(e) => {
                        setCategoryName(e.target.value);
                        console.log(categoryName);
                        console.log("NUEVA CATEGORÍA", e.target.value);
                        console.log(allCategories, "allCategories");
                      }}
                    >
                      <option key={0} value={"Seleccione una categoría"}>
                        Seleccione una categoría
                      </option>
                      {allCategories.map(({ id, name }) => (
                        <option key={id} value={name}>
                          {name[0].toUpperCase() + name.slice(1)}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Form.Row>
              </Form.Group>
              {/* Column  Imagen | Check */}
              <Form.Group>
                {/* Imagen */}
                {/* <Form.File
									className="position-relative"
									required
									name="file"
									label="Imagen"
									id="validationFormik107"
									feedbackTooltip
									onChange={(e) => {
										setDataInputs({
											...dataInputs,
											image: e.target.value,
										});
									}}
								/> */}
                <Form.Label>Imagen</Form.Label>
                <Form.Control
                  type="text"
                  value={dataInputs.image}
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
                  required
                />
                <Form.Text className="category-warnings">
                  {warnings.image}
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect2">
                <Form.Label>
                  ¿Querrias asociar este producto con alguna pregunta del
                  cuestionario?
                </Form.Label>{" "}
                <Form>
                  <div
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.4)",
                      overflowY: "scroll",
                      height: "300px",
                    }}
                  >
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Preguntas</th>
                          <th>Vincular con un "SÍ" del usuario</th>
                          <th>Vincular con un "NO" del usuario</th>
                        </tr>
                      </thead>
                      <tbody>
                        {questions.map(({ id, question }) => (
                          <tr key={id}>
                            <td>{question}</td>
                            <td>
                              <Form.Check
                                type="checkbox"
                                value={id}
                                id={`inline-checkbox-${id}`}
                                onChange={(e) => {
                                  let questionId = e.target.value;
                                  let booleanAnswer = true;
                                  if (questionsIds[id].booleanAnswer === true)
                                    booleanAnswer = null;
                                  setQuestionsIds({
                                    ...questionsIds,
                                    [id]: {
                                      ...questionsIds[id],
                                      booleanAnswer,
                                    },
                                  });
                                }}
                                checked={
                                  questionsIds &&
                                  questionsIds[id] &&
                                  questionsIds[id].booleanAnswer === true
                                }
                              />
                            </td>

                            <td>
                              <Form.Check
                                type="checkbox"
                                value={id}
                                id={`inline-checkbox-${id}`}
                                onChange={(e) => {
                                  let questionId = e.target.value;
                                  let booleanAnswer = false;
                                  if (questionsIds[id].booleanAnswer === false)
                                    booleanAnswer = null;
                                  setQuestionsIds({
                                    ...questionsIds,
                                    [questionId]: {
                                      ...questionsIds[questionId],
                                      booleanAnswer,
                                    },
                                  });
                                }}
                                checked={
                                  questionsIds &&
                                  questionsIds[id] &&
                                  questionsIds[id].booleanAnswer === false
                                }
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Form>
              </Form.Group>

              <Form.Group>
                {/* Check */}
                <Form.Check
                  required
                  name="terms"
                  label="Todos los campos completos"
                  id="validationFormik106"
                  feedbackTooltip
                />
              </Form.Group>
              {/* Submit */}
              <Button variant="warning" type="submit">
                Agregar Producto
              </Button>
            </Form>
          </Col>
          <Col md={6}>
            <Form.Text className=" text-muted mb-1 d-flex">
              Productos agregados
            </Form.Text>
            {allProducts.length === 0 ? (
              <h5>No tienes productos agregados</h5>
            ) : (
              allProducts.map(
                ({ id, name, description, price, stock, image }) => {
                  return (
                    <DeleteUpdate
                      key={id}
                      id={id}
                      name={name}
                      description={description}
                      price={price}
                      stock={stock}
                      image={image}
                      renderProducts={renderProducts}
                      deleteProduct={(id) => dispatch(deleteProduct(id))}
                    />
                  );
                }
              )
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FormProduct;
