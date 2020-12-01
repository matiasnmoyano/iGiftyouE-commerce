import React, { useState, useEffect, Suspense } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Product.css";
import "./ButtonAddCard.jsx";
import ButtonAddCard from "./ButtonAddCard.jsx";
//import Axios from "axios";
import { Container, Col, Row, Image } from "react-bootstrap";
import { getProduct, getReviewsOfProduct } from "../Redux/actions.js";
import Reviews from "./Reviews/Reviews";
import Dialog from "./Reviews/Dialog";
import GiftRating from "./Reviews/GiftRating";
import { GrStar } from "react-icons/gr";
import Spinner from "./Spinner";

export default function Product({ checkIfCartIsEmpty }) {
  /*const state = useSelector((state) => state);
    const {allCategories} = state; */
  let userActive = JSON.parse(localStorage.getItem("User"));
  const { id } = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { currentProduct, currentReviewsOfProduct } = state;
  const [maxReviews, setMaxReviews] = useState(5);
  const [product, setProduct] = useState({});

  const renderReviews = () => {
    dispatch(getReviewsOfProduct(id));
  };

  useEffect(() => {
    getProduct(id, true).then((product) => {
      setProduct(product);
    });
    renderReviews();
  }, []);

  const ratingReviews = () => {
    /*var num = (currentReviewsOfProduct.reduce(function (previous, current) {
      return parseInt(current.rating)/5 + previous;
      }, 0)*100/currentReviewsOfProduct.length)*/
    var num =
      currentReviewsOfProduct.reduce(function (previous, current) {
        return parseInt(current.rating) + previous;
      }, 0) / currentReviewsOfProduct.length;

    return num;
  };

  const filterReview = () => {
    return currentReviewsOfProduct.filter((review) => {
      if (!!userActive && review.userId === userActive.id) return true;
      if (!review.description) return false;
      return true;
    });
  };

  return (
    <Suspense fallback={<Spinner></Spinner>}>
      <div className="Product_Container">
        <div className="Product__Image">
          <Image
            className="imagen_product"
            /* className="Product_Image" */ src={product.image}
          />{" "}
        </div>
        <div className="Container__Description__Product">
          {" "}
          <div className="Product_Name">
            <h4>{product.name}</h4>
          </div>
          <div className="Description__Product">
            <p style={{ marginTop: "10px" }}>
              Cantidad de Reviews: {currentReviewsOfProduct.length}
              {currentReviewsOfProduct[0] && (
                <GiftRating finalRating={ratingReviews()}></GiftRating>
              )}
            </p>
            <h6 style={{ fontSize: "30px", marginTop: "20px" }}>
              ${product.price}
            </h6>
            <p style={{ marginTop: "30px", fontSize: "22px" }}>
              {product.description}
            </p>
            <p style={{ marginTop: "30px", fontSize: "17px", color: "black" }}>
              Stock disponible: {product.stock}
            </p>
            <div className="Product_Button">
              <ButtonAddCard
                price={product.price}
                checkIfCartIsEmpty={checkIfCartIsEmpty}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="review_container pt-5">
        <div className="review_center">
          <h3 style={{ fontFamily: "Poppins, sans-serif" }}>
            <GrStar /> Reviews! <GrStar />
          </h3>

          <div>
            <div className="Flex__Reviews__Product">
              {filterReview()[0] &&
                filterReview()
                  .reverse()
                  .slice(0, maxReviews)
                  .map((review) => {
                    return (
                      <Dialog
                        rating={review.rating}
                        description={review.description}
                        idReview={
                          !!userActive &&
                          review.userId === userActive.id &&
                          review.id
                        }
                        idProduct={id}
                        dispatch={dispatch}
                        renderReviews={renderReviews}
                      ></Dialog>
                    );
                  })}
            </div>
            <div className="button_vermas_container">
              <div className="button_vermas">
                {filterReview().length > maxReviews && (
                  <button
                    className="button-home"
                    onClick={() => setMaxReviews(maxReviews + 5)}
                  >
                    <span className="text-button-home">{"Ver Más"}</span>
                  </button>
                )}
              </div>
            </div>

            <Reviews
              productId={id}
              renderReviews={renderReviews}
              currentReviewsOfProduct={currentReviewsOfProduct}
            ></Reviews>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
