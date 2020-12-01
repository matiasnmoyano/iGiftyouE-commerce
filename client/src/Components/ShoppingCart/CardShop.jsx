import React, { useState, useEffect } from "react";

import "./CardShop.css";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../Redux/actions.js";
import { Button } from "react-bootstrap";
import ButtonQuantity from "../ButtonQuantity";
import swal from "sweetalert";
import { Link } from "react-router-dom";
const CardShop = ({
  price,
  quantity,
  productId,
  updateCart,
  addToSumTotal,
  notUpdate,
  checkIfCartIsEmpty,
}) => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [quantityP, setQuantityP] = useState(quantity);
  const [quantityOld, setQuantityOld] = useState(quantity);
  //let [cambiado, setCambiado] = useState(false);

  useEffect(() => {
    if (product.price > -1 && !notUpdate) {
      console.log("product*****");
      addToSumTotal(product.price * quantityP);
    }
  }, [product]);

  useEffect(() => {
    if (product.price > -1) {
      addToSumTotal(product.price * quantityP - product.price * quantityOld);
      setQuantityOld(quantityP);
    }
  }, [quantityP]);

  useEffect(() => {
    console.log(productId);
    dispatch(getProduct(productId)).then((prod) => {
      setProduct(prod);
    });
  }, [productId]);

  return (
    <div>
      <div className="card mb-3 style-card-shop">
        <div className="row no-gutters">
          <div className="col-md-4">
            <Link to={`/product/${productId}`}>
              <img src={product.image} style={{ width: "13rem" }} alt="..." />
            </Link>
          </div>
          <div className="col-md-8">
            <div className="card-body Card__Shop_Body">
              <div className="Button__Container__Shop">
                <button
                  style={{ width: "10%" }}
                  className="btnEditDelete"
                  onClick={() => updateCart(productId)}
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    className="bi bi-trash-fill"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      width: "25px",
                      height: "25px",
                      margin: "5px",
                      color: "#AA123D",
                    }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"
                    />
                  </svg>
                </button>
              </div>
              <Link to={`/product/${productId}`} className="Link__Card__Shop">
                <h5 className="card-title font-title">{product.name}</h5>
              </Link>
              <p className="card-text">
                <small>Stock disponible: {product.stock}</small>
              </p>
              <div className="card-text">
                <ButtonQuantity
                  name={product.name}
                  price={price}
                  quantity={quantity}
                  id={productId}
                  stock={product.stock}
                  actualizarPrecio={setQuantityP}
                  checkIfCartIsEmpty={checkIfCartIsEmpty}
                ></ButtonQuantity>
              </div>
              <p className="card-text-2">{product.price * quantityP}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardShop;
