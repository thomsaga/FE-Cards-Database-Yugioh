import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchCard from "../components/fetchs/fetch-detail.js";
import { TbLoader, TbStar, TbStarFilled } from "react-icons/tb";
import Modal from "../components/Modal.jsx";
import ContextFavorite from "../components/contexts/context-favorite.js";

const Detail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [, setFavoriteCard] = useContext(ContextFavorite);
  const [showModal, setShowModal] = useState(false);
  const results = useQuery(["Detail", params.id], fetchCard);

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">
          <TbLoader />
        </h2>
      </div>
    );
  }

  console.log("Detail Data: ", results.data);
  const card = results.data[0];

  return (
    <div className="container">
      <div className="detail">
        <div className="detail-img">
          <img src={card.card_images[0].image_url} alt={`image_full_${name}`} />
        </div>
        <div className="detail-session">
          <button
            className="star-button"
            onClick={() => {
              setFavoriteCard(card);
              setShowModal(true);
            }}
          >
            <TbStar className="star-icon star-icon-default" />
            <TbStarFilled className="star-icon star-icon-hover" />
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

export default Detail;
