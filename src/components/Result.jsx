import React from "react";
import Card from "./Card.jsx";
import PropTypes from "prop-types";

const Results = ({ cards }) => {
  console.log("Results Cards Data:", cards); // Log data cards yang diterima

  return (
    <div className="result">
      {!cards.length ? (
        <h1 className="no-cards-message">No cards available</h1>
      ) : (
        cards.map((card) => {
          console.log("Card Item:", card); // Log setiap card item
          return (
            <Card
              key={card.id}
              id={card.id}
              name={card.name}
              type={card.type}
              card_images={card.card_images[0].image_url_small}
            />
          );
        })
      )}
    </div>
  );
};

Results.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      card_images: PropTypes.arrayOf(
        PropTypes.shape({
          image_url_small: PropTypes.string,
        }),
      ).isRequired,
    }),
  ).isRequired,
};

export default Results;
