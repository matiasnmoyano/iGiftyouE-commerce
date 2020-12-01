import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import ButtonHome from "../ButtonHome";
import GiftRating from "./GiftRating";
import { useSelector, useDispatch } from "react-redux";
import { createReview, getUserOrders } from "../../Redux/actions.js";
import swal from "sweetalert";
import "./Reviews.css";

export default function Reviews({
  productId,
  renderReviews,
  currentReviewsOfProduct,
}) {
  const dispatch = useDispatch();

  const [userPurchase, setUserPurchase] = useState(false);
  const [userId, setUserId] = useState();

  const [review, setReview] = useState({
    rating: null,
    description: null,
    userId,
  });

  const setRatingValue = (rating) => {
    setReview({
      ...review,
      rating,
    });
  };

  useEffect(() => {
    const userActive = JSON.parse(localStorage.getItem("User"));
    if (userActive) {
      setUserId(userActive.id);
      setReview({
        ...review,
        userId: userActive.id,
      });
    } else return;

    dispatch(getUserOrders(userActive.id)).then((orders) => {
      if (!orders) return;
      let completados = orders.filter((order) => order.status === "completado");
      for (let carrito of completados) {
        //buscamos en su historial
        if (carrito.products && carrito.products[0]) {
          for (let prod of carrito.products) {
            //si encontramos el producto en cuestión, entonces lo compró, entonces debería poder hacer la review (si no, no)
            if (prod.id == productId) {
              setUserPurchase(true);
              return;
            }
          }
        }
      }
    });
  }, []);

  const submitReview = (e) => {
    e.preventDefault();

    const userPreviousReview = currentReviewsOfProduct.find(
      (review) => review.userId == userId
    );

    //no deja mandar más de 1 review por persona
    if (userPreviousReview) {
      swal({ text: `Solo se permite una review por usuario`, icon: "warning" });
      return;
    }

    if (!userPurchase) {
      swal({
        text: `Debes comprar el producto antes de realizar la review`,
        icon: "warning",
      });
      return;
    }

    //no deja mandar reviews sin rating
    if (!review.rating) return;

    console.log("review a enviarse", review);

    dispatch(createReview(productId, review)).then(() => renderReviews());
    swal({ text: `La review se ha enviado con éxito`, icon: "success" });
    //.then((productId) => renderReviews(productId));
  };

  if (!userId) return null;

  return (
    <>
      <div>
        <GiftRating setRatingValue={setRatingValue} />
      </div>
      <div className="review_container">
        <div className="Review__Input">
          {/* <Form.Group controlId="exampleForm.ControlTextarea1"> */}
          <Form.Control
            as="textarea"
            placeholder="Dejanos tu opinion sobre este producto!"
            rows={3}
            value={review.description}
            onChange={(e) => {
              setReview({
                ...review,
                description: e.target.value,
              });
            }}
          />
        </div>{" "}
      </div>
      {/* </Form.Group> */}{" "}
      <div className="button_container">
        <div className="button_enviar">
          <button className="button-home" onClick={submitReview}>
            <span className="text-button-home">{"Enviar"}</span>
          </button>
        </div>
      </div>
    </>
  );
}
