import React, { useState } from 'react';
import { AiFillGift, AiTwotoneHeart } from 'react-icons/ai';
import './GiftRating.css';

export default function GiftRating({ setRatingValue, staticRating, finalRating, starsEmpty }) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  if (finalRating) {
    staticRating = Math.ceil(finalRating);
  }
  if (starsEmpty) {
    staticRating = 5;
  }
  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        var amarillo = '#ffc107';
        var rojo = '#d7414b';
        if (ratingValue === staticRating && finalRating < staticRating - 0.5) {
          var amarillo = '#FFF96D';
          var rojo = '#FFA86D';
        }
        return (
          <label key={i} style={{ position: 'relative' }}>
            {!staticRating && (
              <input
                type="radio"
                name="rating"
                value={6}
                onClick={() => {
                  setRating(ratingValue);
                  setRatingValue(ratingValue);
                }}
              />
            )}
            <div className="Flex__Rating">
              <div>
                {!staticRating && (
                  <AiFillGift
                    className="Star__Gift"
                    color={ratingValue <= (hover || rating) ? '#ffc107' : '#F1F2F4'}
                    size={23}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                  />
                )}
                {staticRating && (
                  <AiFillGift
                    className="Star__Gift"
                    color={ratingValue <= (!starsEmpty && staticRating) ? amarillo : '#F1F2F4'}
                    size={23}
                  />
                )}
              </div>
              <div>
                {!staticRating && (
                  <AiTwotoneHeart
                    className="Star__Gift Heart__Rating"
                    color={ratingValue <= (hover || rating) ? rojo : '#F1F2F4'}
                    size={12}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                  />
                )}
                {staticRating && (
                  <AiTwotoneHeart
                    className="Star__Gift Heart__Rating"
                    color={ratingValue <= (!starsEmpty && staticRating) ? rojo : '#F1F2F4'}
                    size={12}
                  />
                )}
              </div>
            </div>
          </label>
        );
      })}
    </div>
  );
}
