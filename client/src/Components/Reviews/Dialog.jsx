import React from "react";
import GiftRating from "./GiftRating";
import "./Dialog.css";
import { deleteReview } from "../../Redux/actions.js";

export default function Dialog({
  description,
  rating,
  idReview,
  idProduct,
  dispatch,
  renderReviews,
}) {
  //if(!description) return null;
  //console.log(rating+ "dialogo")

  const deleteReviewFunction = () => {
    dispatch(deleteReview(idProduct, idReview)).then(() => renderReviews());
  };

  return (
    <div className="Dialog__Container">
      <div
        style={{ width: "fit-content", marginLeft: "10px", marginTop: "5px" }}
      >
        <GiftRating staticRating={rating} />
      </div>
      <p>{description}</p>
      {idReview && (
        <button className="review_eliminar" onClick={deleteReviewFunction}>
          Eliminar review
        </button>
      )}
    </div>
  );
}
