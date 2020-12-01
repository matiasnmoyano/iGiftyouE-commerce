import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
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
import Axios from "axios";
import { useEffect } from "react";
import AdminProductCard from "./AdminProductCard";
import {
  modifyCategory,
  deleteCategory,
  getProductsOfCategory,
} from "../../Redux/actions.js";

const AddedCategoriesRender = ({ id, name, description, getAllCategories }) => {
  const [ModalState, setModalState] = useState(false);
  const [dataInputsUpdate, setDataInputsUpdate] = useState({
    name,
    description,
  });

  const [warnings, setWarnings] = useState({
    name: "",
    description: "",
  });

  const [categoryProducts, setCategoryProducts] = useState([]);

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { currentCategory } = state;

  //Delete
  const borrarCategory = (id) => {
    swal({
			title:'Eliminar',
			text:'Estas seguro que deseas eliminar esta categoría?',
			icon:'warning',
			buttons:['No','Si']
		  }).then(respuesta => {
			if(respuesta){
			  swal({text: 'La categoría se eliminó con éxito :)',
					icon:'success'})
					dispatch(deleteCategory(id)).then(() => {
            getAllCategories();
          });
			}
		  })
  };
  const updateCategory = (id, data) => {
    if (dataInputsUpdate.description.length < 10) return;
    swal({
			title:'Modificar',
			text:'Estas seguro que deseas modificar esta categoría?',
			icon:'warning',
			buttons:['No','Si']
		  }).then(respuesta => {
			if(respuesta){
			  swal({text: 'La categoría se modificó con éxito :)',
					icon:'success'})
					dispatch(modifyCategory(id, data)).then(() => {
            getAllCategories();
            setModalState(!ModalState);
          });
			}
		  })

  };

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
                    onClick={() => setModalState(!ModalState)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    className="ml-2"
                    onClick={() => borrarCategory(id)}
                  >
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
                  <Form.Label>Nombre de la Categoría</Form.Label>
                  <Form.Control
                    type="text"
                    value={dataInputsUpdate.name}
                    placeholder="Ingrese nuevo nombre"
                    onChange={(e) => {
                      let value = e.target.value;
                      //reemplazamos espacios múltiples por uno solo
                      value = value.replace(/\s\s+/g, " ");
                      let regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/g;
                      //chequeamos que el input contenga solo letras (y chars especiales)
                      if (!regex.test(value) && value !== "") return;
                      //chequeamos que el input no sea demasiado largo
                      if (value.length > 22) return;
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
                    aria-label="With textarea"
                    required
                    value={dataInputsUpdate.description}
                    placeholder="Ingrese descripcion de la categoría"
                    onChange={(e) => {
                      let value = e.target.value;
                      value = value.replace(/\s\s+/g, " ");
                      if (value !== "" && value.length < 10) {
                        setWarnings({
                          ...warnings,
                          description: "La descripción es demasiado corta",
                        });
                      } else setWarnings({ ...warnings, description: "" });

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
              </Form>
            </Col>

            {categoryProducts.map(
              ({ id, name, description, stock, price, image }) => {
                if (!id) return;

                return (
                  <AdminProductCard
                    id={id}
                    name={name}
                    description={description}
                    stock={stock}
                    price={price}
                    image={image}
                  />
                );
              }
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setModalState(!ModalState)}
            >
              Cerrar
            </Button>
            <Button
              variant="success"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                updateCategory(id, dataInputsUpdate);
              }}
            >
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default AddedCategoriesRender;
