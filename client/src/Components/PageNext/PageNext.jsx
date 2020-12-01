import React from 'react';
import { Col, Button } from 'react-bootstrap';
const PageNext = ({ productosPorPagina, totalProduct, clicked }) => {
	// Genera numeros dependiendo la cantidad total de productos!
	const numeroDePagina = [];
	for (let i = 1; i <= Math.ceil(totalProduct / productosPorPagina); i++) {
		numeroDePagina.push(i);
	}
	return (
		<Col className="d-flex p-4 " style={{ maxWidth: '10%', margin: 'auto',fontFamily: "Poppins"  }}>
			{/* El onClick cambia de pagina mostrando los productos que faltan */}
			{numeroDePagina.map((num) => (
				<Col key={num} onClick={() => clicked(num)}>
					<Button variant="light">{num}</Button>
				</Col>
			))}
		</Col>
	);
};

export default PageNext;
