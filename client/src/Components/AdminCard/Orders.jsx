import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllOrders, getUserOrders } from '../../Redux/actions';
import { Col, Container, Row, Form, Button} from 'react-bootstrap';
import InfoOrders from './InfoOrders';
import CardOrders from './CardOrders';

// LISTA TODOS LOS USUARIOS REGISTRADOS EN LA BASE DE DATOS
const GetOrders = () => {
	
	const dispatch = useDispatch();
	const { allOrders } = useSelector((state) => state);
	// STATE QUE MOSTRARA Y OCULTARA LA CARD QUE CONTIENE LOS DATOS DE CADA USUARIO
	const [onUserData, setonUserData] = useState(false);
	// GUARDAMOS EN STATE EL ID DE CADA USUARIO
	const [status, setStatus] = useState('vacio')
	const [IdUser, setIdUser] = useState(0);
	console.log(IdUser, 'id de usuario clickeado');
	useEffect(() => {
		dispatch(getAllOrders(status));
	}, [status]);
	console.log(allOrders, 'HOLA SOY ALLORDERS');
	
	
	// CAPTA EL ID Y SETEA EL CARD USER
	const onDataUser = (id, boolean) => {
		setIdUser(id);
		setonUserData(boolean);
	};

	console.log(status, '  soy status ')

	// RENDER
	return (
		<Container style={{ minHeight: '75vh' }}>
			<Row>
				
				<Col className="mb-4">
					<h4>Listado de ordenes</h4>
				</Col>
				<Col>
				<Form.Control
                      as="select"
                      defaultValue="Choose..."
                      required
                      onChange={(e) => {
                        setStatus(e.target.value);
                        
                      }}
                    >
						<option value= 'vacio'>
                          Seleccione status
                        </option>
                        <option value='vacio'>
                          Vacio
                        </option>
						<option value='curso'>
                          Curso
                        </option>
						<option value='creado'>
                          Creado
                        </option>
						<option value='completado'>
                          Completado
                        </option>
						<option value='procesado'>
                          Procesado
                        </option>
						<option value='cancelado'>
                          Cancelado
                        </option>

                    </Form.Control>
				</Col>
			</Row>
			<Row>
				
			{/* }).then((shoppingcart) => {
							shoppingcart.products.forEach((product) => {
								Lineorder.findOne({
									where: {
										shoppingcartId: product.lineorder.shoppingcartId,
										productId: product.lineorder.productId,
									},
								}).then((lineorder) => lineorder.destroy());
							});
						}); */}
				<Col md={6}>
					{allOrders.length<1 && <Col>No hay ordenes en este estado</Col>}
					{allOrders &&
						allOrders.map((u) => {
							
							let total=0
							u.products.forEach(p => {
							total= total +( p.lineorder.price)
							
							});
							/* if(!u || !u.user || u.id){
								return null;
							} */
							return (


								
								u && u.user && <InfoOrders
									key={u.id}
									name={u.user.name}
									email={u.user.email}
									onDataUser={onDataUser}
									id={u.user.id}
									total={total}
									idCart={u.id}
									creado={u.createdAt}
								/>
								
							);
							
						})}
				</Col>
				<Col md={6}>
					{/* DATOS DE UN USUARIO CLICKEADO */}
					{onUserData && <CardOrders onDataUser={onDataUser} IdUser={IdUser} statusReal={status}/>}
					{/* ESTE DE ABAJO NO VA ACA */}
					{/* <CardOrders
								key={allOrders.id}
								status={allOrders.status}
								id={allOrders.id}
                                userId={allOrders.userId}
                                products={allOrders.products}
                                user ={allOrders.user}
							/>  */}
        </Col>
      </Row>
    </Container>
  );
};

export default GetOrders;
