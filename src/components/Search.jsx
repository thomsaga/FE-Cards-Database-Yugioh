import React, { useContext, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "./fetchs/fetch-search.js";
import Results from "./Result.jsx";
import { TYPES } from "./constans/constan-types.js";
import ContextFavorite from "./contexts/context-favorite.js";

const Search = () => {
  const [search, setSearch] = useState({ type: "" });
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
        ) : null}
      </div>
      <div className="search">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const obj = {
              type: formData.get("type") ?? "",
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
          <button type="submit">Submit</button>
        </form>
      </div>
      {isLoading ? (
        <div className="result">
          <h1 className="no-cards-message">Loading...</h1>
        </div>
      ) : error ? (
        <div className="error">Error: {error.message}</div>
      ) : (
        <Results cards={cards} />
      )}
    </>
  );
};

export default Search;
