import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Card = ({ id, name, type, card_images }) => {
  console.log("Card Props:", { id, name, type, card_images }); // Log props yang diterima
  return (
    <Link
      to={`/details/${id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="result-span">
        <img src={card_images} alt={`image_small_${name}`} />
        <div className="result-desc-span">
          <h1>{name}</h1>
          <h2>{type}</h2>
        </div>
      </div>
    </Link>
  );
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  card_images: PropTypes.string.isRequired,
};

export default Card;
