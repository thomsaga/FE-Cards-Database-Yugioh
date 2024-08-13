import React, { useContext, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "./fetchs/fetch-search.js";
import Results from "./Result.jsx";
import { TYPES, ATTRS, RACES } from "./constans/constan-types.js";
import ContextFavorite from "./contexts/context-favorite.js";

const Search = () => {
  const [search, setSearch] = useState({ type: "", attribute: "", race: "" });
  const [favoriteCard] = useContext(ContextFavorite);
  const { data, error, isLoading } = useQuery(["search", search], fetchSearch);

  const cards = useMemo(() => data ?? [], [data]);

  useEffect(() => {
    console.log("Full Data:", data); // Debugging
    console.log("Cards Data:", cards); // Debugging
    console.log("Error:", error); // Debugging
    if (
      favoriteCard &&
      favoriteCard.card_images &&
      favoriteCard.card_images[0]
    ) {
      console.log(
        //Debugging
        "Favorite Card Image URL:",
        favoriteCard.card_images[0].image_url_small,
      );
    } else {
      console.log("Favorite card or its images are not available."); //Debugging
    }
  }, [data, cards, error, favoriteCard]);

  return (
    <>
      <div className="favorite">
        {favoriteCard ? (
          <img
            src={favoriteCard.card_images[0].image_url_small}
            alt={`image_small_${favoriteCard.name}`}
          />
        ) : (
          <h2>Favorite Card</h2>
        )}
      </div>
      <div className="search">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const obj = {
              type: formData.get("type") ?? "",
              attribute: formData.get("attribute") ?? "",
              race: formData.get("race") ?? "",
            };
            console.log("Search Query:", obj); // Debugging
            setSearch(obj);
          }}
        >
          <label htmlFor="type">
            <select id="type" name="type" className="custom-select">
              <option value="">Select Type</option>
              {TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="attribute">
            <select id="attribute" name="attribute" className="custom-select">
              <option value="">Select Attribute</option>
              {ATTRS.map((attribute) => (
                <option key={attribute} value={attribute}>
                  {attribute}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="race">
            <select id="race" name="race" className="custom-select">
              <option value="">Select Race</option>
              {RACES.map((race) => (
                <option key={race} value={race}>
                  {race}
                </option>
              ))}
            </select>
          </label>

          <button className="submit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
      {isLoading ? (
        <div className="result">
          <h1 className="no-cards-message">Loading...</h1>
        </div>
      ) : error ? (
        <div className="result">
          {" "}
          <h1 className="no-cards-message" style={{ color: "crimson" }}>
            Error: {error.message}
          </h1>
        </div>
      ) : (
        <Results cards={cards} />
      )}
    </>
  );
};

export default Search;
