import React, { useEffect } from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../../Redux/actions';
import './InfoOrders.css'
// MUESTRA EL EMAIL DE CADA USER REGISTRADO
const InfoOrders = ({ id, name, onDataUser,total,creado }) => {
	return (
		<Card className="mb-2 p-1">
			<Col className="d-flex justify-content-between">
				<Col className=" d-flex align-items-center">
					{/* MUESTRA EMAIL */}
					{/* <h6>{email}</h6> */}
					<h6>{name}</h6>
					{total !== 0 && (
						<div className='total'>
						<h6 className='total'>Total: ${total}</h6>
						<h10 className='total'>Creado: {creado}</h10>
						</div>
	
					)}
				</Col>
				<Col className="d-flex justify-content-end">
					{/* NOS LLEVA AL COMPONENTE INFO DEL USER, CON DATOS DE UN SOLO USUARIO REGISTRADO */}
					{/* ----------------------------BOTTON DE INFO------------------------------------- */}
					<Button
						variant="success"
						onClick={() => {
							onDataUser(id, true);
						}}
					>
						Info
					</Button>
				</Col>
			</Col>
		</Card>
	);
};

export default InfoOrders;


































































