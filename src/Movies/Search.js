import React, { useState, useEffect } from "react";
import { useGlobelContext } from "./context";
import { API_url } from "./context";

const Search = () => {
  const { query, setQuery, setSearchQuery, error } = useGlobelContext();
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const getSuggestions = async (searchQuery) => {
    if (searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await fetch(`${API_url}&s=${searchQuery}`);
      const data = await res.json();
      if (data.Response === "True") {
        setSuggestions(data.Search.slice(0, 10).map(movie => movie.Title));
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error(error);
      setSuggestions([]);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query) {
        getSuggestions(query);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchQuery(query);
    setShowSuggestions(false);
  };

  return (
    <>
      <div className="search_page mt-5">
        <h2 className="heading_font">Search Your Favourite Movie</h2>
        <form action="#" onSubmit={handleSubmit}>
          <div className="input_box text-center mt-4 position-relative">
            <input
              type="text"
              placeholder="Search here"
              className="w-25"
              value={query}
              onChange={handleInputChange}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className="suggestions-container">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>
        <div>
          <p className="text-center mt-3 text-danger">{error.show && error.msg}</p>
        </div>
      </div>
    </>
  );
};

export default Search;