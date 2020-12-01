import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './CreateReadCategory.css';
import DeleteUpdate from './DeleteUpdate';
import swal from "sweetalert";
import {
	Form,
	Button,
	Container,
	Row,
	Col,
	FormControl,
	InputGroup,
} from 'react-bootstrap';
import { getAllCategories, createCategory } from "../../Redux/actions.js";

const FormCategory = () => {
	//state count
	
    const dispatch = useDispatch()
    const state = useSelector(state => state);
    const {allCategories} = state;
	// State de inputs
	const [dataInputs, setDataInputs] = useState({
		name: '',
		description: '',
	});

	const [warnings, setWarnings] = useState({
		name: '',
		description: ''
	})

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
					
					dispatch(createCategory(dataInputs)).then(() => 
					dispatch(getAllCategories()))
			}
		  })
	};
	
	useEffect(() => {
		 dispatch(getAllCategories())
	}, []);

	return (
		<>
			<Container>
				<Row>
					{/* Fomulario */}
					<Col md={6}>
						<h5>Agrega categorías a tu catálogo</h5>

						{/* Column Nombre  | Descripcion */}
						<Form className="mt-4 mb-5 category-form" onSubmit={onForm}>
							{/* Nombre */}
							<Form.Group controlId="formBasicName">
								<Form.Label>Nombre de Categoría</Form.Label>
								<Form.Control
									type="text"
									value={dataInputs.name}
									placeholder="Ingrese nombre"
									onChange={e => {
										let value = e.target.value;
										//reemplazamos espacios múltiples por uno solo
										value = value.replace(/\s\s+/g, ' ');
										let regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/g;
										//chequeamos que el input contenga solo letras (y chars especiales)
										if(!regex.test(value) && value !== "") return;
										//chequeamos que el input no sea demasiado largo
										if (value.length > 22) return;
										setDataInputs({ ...dataInputs, name: value.toLowerCase() });
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
										let value = e.target.value;
										value = value.replace(/\s\s+/g, ' ');
										if (value !== "" && value.length < 10) {
											setWarnings({...warnings, description: "La descripción es demasiado corta"})
										}
										else setWarnings({...warnings, description: ""});

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
					<Col md={6}>
						<Form.Text className=" text-muted mb-1 d-flex">
							Categorías agregadas
						</Form.Text>
						{allCategories.length === 0 ? (
							<h5>No tienes categorías agregadas</h5>
						) : (
							allCategories.map(({id, name, description}) => {
								return (
									<DeleteUpdate
										key={id}
										id={id}
										name={name}
										description={description}

										getAllCategories={() => dispatch(getAllCategories())}
									/>
								);
							})
						)}
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default FormCategory;
