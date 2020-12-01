import React from 'react';

export default function AdminProductCard({ id, name, description, price, stock, image }) {
  return (
    <div className="d-flex bd-highlight justify-content-center flexcontainer">
      <div className="p-2  bd-highlight imgProduct">
        <img src={image} alt="image" />
      </div>
      <div className="p-2  bd-highlight textProduct">
        <p style={{ fontSize: '22px' }}>{name}</p>
        <h4>${price}</h4>
        <p style={{ fontSize: '22px' }}>{description}</p>
        <p style={{ fontSize: '22px' }}>{stock}</p>
      </div>
      {/* <p style={{ fontSize: '22px' }}>Nombre del Regalo/Producto</p>
        <h4>$ 1000</h4>
        <p style={{ paddingTop: '10px' }}>Calificacion</p>
        <p style={{ fontSize: '22px' }}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio magni eum, esse molestiae deserunt necessitatibus, possimus dignissimos magnam fugiat, a dolorum sit temporibus aliquam alias perspiciatis illo qui commodi! Quo!
        </p>
*/}
    </div>
  );
}
