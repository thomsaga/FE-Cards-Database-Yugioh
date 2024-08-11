import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "./fetchs/fetch-search.js";
import Results from "./Result.jsx";
import { TYPES } from "./constans/constan-types.js";

const Search = () => {
  const [search, setSearch] = useState({ type: "" });
  const { data, error, isLoading } = useQuery(["search", search], fetchSearch);

  // Ambil data kartu dari `data.cards`
  const cards = useMemo(() => data ?? [], [data]);

  useEffect(() => {
    console.log("Full Data:", data); // Debugging
    console.log("Cards Data:", cards); // Debugging
    console.log("Error:", error); // Debugging
  }, [data, cards, error]);

  return (
    <>
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
