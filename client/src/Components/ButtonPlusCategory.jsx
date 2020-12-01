import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategories, createCategory } from "../Redux/actions.js";
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


export default function ButtonPlus(){
	const dispatch = useDispatch()
	const state = useSelector((state) => state);
	const {allCategories} = state;
  
    const [ModalState, setModalState] = useState(false);
    	//state count

	// State de inputs
	const [dataInputs, setDataInputs] = useState({
		name: '',
		description: '',
	});
	//Render categories

	 useEffect(() => {
		dispatch(getAllCategories());
	}, []); 

 	 const renderCategories = () => {
		dispatch(getAllCategories());
	};  
	
	//Function onForm
	const onForm = (e) => {
		e.preventDefault();
		if(dataInputs.description.length < 10) {
			return;
		};
		swal({
			title:'Crear',
			text:'Estas seguro que deseas crear esta categoría?',
			icon:'warning',
			buttons:['No','Si']
		  }).then(respuesta => {
			if(respuesta){
			  swal({text: 'La categoría se creó con éxito :)',
					icon:'success'})
					
					dispatch(createCategory(dataInputs)).then(() => renderCategories())
					
			}
		  })
	};
    
    return (
        <>
            <button className='button-plus' onClick={() => setModalState(!ModalState)}>
              <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
              </button>
              <Container>
                <Modal show={ModalState}>
                    <Modal.Body>
					{/* Fomulario */}
					<Col md={12}>
						<h5>Agrega categorías a tu catálogo</h5>
						<Form.Text className="text-muted">
							Ambos campos deben estar completos para agregar una nueva categoría
						</Form.Text>

						{/* Column Nombre  | Descripcion */}
						<Form className="mt-4 mb-5" onSubmit={onForm}>
							{/* Nombre */}
							<Form.Group controlId="formBasicName">
								<Form.Label>Nombre de Categoría</Form.Label>
								<Form.Control
									type="text"
									value={dataInputs.name}
									placeholder="Ingrese nombre"
									onChange={(e) => {
										setDataInputs({ ...dataInputs, name: e.target.value.toLowerCase() });
									}}
									required
								/>
							</Form.Group>
							{/* Descripción */}
							<Form.Group controlId="formBasicName">
								<Form.Label>Descripción</Form.Label>
								<FormControl
									as="textarea"
									aria-label="With textarea"
									required
									value={dataInputs.description}
									placeholder="Ingrese descripcion de la categoría"
									onChange={(e) => {
										setDataInputs({
											...dataInputs,
											description: e.target.value,
										});
									}}
								/>
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
								Agregar Categoría
							</Button>
						</Form>
					</Col>
                </Modal.Body>
                <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setModalState(!ModalState)}
            >
              Cerrar
            </Button>
            </Modal.Footer>
                </Modal>
			</Container>
        </>
    )
}

