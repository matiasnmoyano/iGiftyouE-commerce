import React from "react";
import Axios from "axios";

import swal from "sweetalert";
export default function AdminProductCard({categoryID, name, description, productID, productName, renderCategories, removeCategoryFromProduct}) {
  return (
    <div className="p-2  bd-highlight textProduct">
      <p style={{ fontSize: "22px" }}>{name.charAt(0).toUpperCase() + name.slice(1)}</p>
      <p style={{ fontSize: "12px" }}>{description}</p>
      <button className='btn btn-danger' 
      onClick = {() => {
        removeCategoryFromProduct(productID, categoryID).then(() => {
          renderCategories();
          swal({ text: `La categoría ${name} se ha desvinculado con el producto ${productName} exitosamente`, icon: "success" })
        });
        }}>Quitar categoría</button>
    </div>
  );
}