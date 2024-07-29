import React, { useContext, useEffect, useState } from "react";

export const API_url = `https://www.omdbapi.com/?apikey=4a3b711b`;

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState({ show: false, msg: "" });
  const [query, setQuery] = useState(""); // This will be the displayed query
  const [searchQuery, setSearchQuery] = useState("titanic"); // This will be the actual search query

  const getMovies = async (url) => {
    setIsLoading(true)
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if (data.Response === "True") {
        setIsLoading(false);
        setError({ show: false, msg: "" });
        setMovies(data.Search);
      } else {
        setIsLoading(false);
        setError({ show: true, msg: data.Error });
        setMovies([]);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError({ show: true, msg: "An error occurred" });
      setMovies([]);
    }
  };

  useEffect(() => { 
    let timeOut = setTimeout(() => {
      getMovies(`${API_url}&s=${searchQuery}`);
    }, 800);
    return () => clearTimeout(timeOut);
  }, [searchQuery]);

  return (
    <AppContext.Provider value={{ isLoading, movies, error, query, setQuery, setSearchQuery }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobelContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobelContext };