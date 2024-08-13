import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchCard from "../components/fetchs/fetch-detail.js";
import { TbLoader, TbStar, TbStarFilled } from "react-icons/tb";
import Modal from "../components/Modal.jsx";
import ContextFavorite from "../components/contexts/context-favorite.js";
import ErrorBoundary from "../components/ErrorBoundary.jsx";

const Detail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [favoriteCard, setFavoriteCard] = useContext(ContextFavorite);
  const [showModal, setShowModal] = useState(false);
  const results = useQuery(["Detail", params.id], fetchCard);

  const card = results.data?.[0];
  // card.card_images[0].image_url = undefined;

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">
          <TbLoader />
        </h2>
      </div>
    );
  }

  const isFavorite = favoriteCard?.id === card.id;
  const handleFavoriteClick = () => {
    if (isFavorite) {
      setFavoriteCard(null);
    } else {
      setFavoriteCard(card);
      setShowModal(true);
    }
  };

  return (
    <div className="container">
      <div className="detail">
        <div className="detail-img">
          <img
            src={card.card_images[0].image_url}
            alt={`image_full_${card.name}`}
          />{" "}
        </div>
        <div className="detail-session">
          <button className="star-button" onClick={handleFavoriteClick}>
            {isFavorite ? (
              <TbStarFilled className="star-icon" />
            ) : (
              <TbStar className="star-icon" />
            )}
          </button>
          {showModal ? (
            <Modal>
              <div>
                <h1>Card have been added!</h1>
                <div className="buttons">
                  <button onClick={() => navigate("/")}>Nice!</button>
                </div>
              </div>
            </Modal>
          ) : null}
          <div className="detail-desc">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "10vh",
                background: "saddlebrown",
                paddingLeft: "1rem",
                paddingRight: "1rem",
              }}
            >
              <h1>{card.name}</h1>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                paddingLeft: "1rem",
                paddingBottom: "0.15rem",
                paddingRight: "1rem",
                height: "5vh",
                maxHeight: "10vh",
                width: "100%",
                background: "#1b1a1a",
              }}
            >
              <h2>{card.type}</h2>
            </div>
            <div style={{ margin: "1rem", overflow: "auto" }}>
              <p>{card.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Detail {...props} />
    </ErrorBoundary>
  );
}
