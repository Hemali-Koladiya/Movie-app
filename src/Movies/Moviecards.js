import React from "react";
import { useGlobelContext } from "./context";
import "../Style/Style.css";
import { NavLink } from "react-router-dom";

const Moviecards = () => {
  const { movies,isLoading } = useGlobelContext();

  if(isLoading) {
     return(
      <div>
        <h4 className="text-center mt-5">Loading....</h4>
      </div>
     )
  }

  return (
    <>
      <div className="movie_card_page">
        <div className="container">
          <div className="row py-5 mt-4">
            <div className="cards d-flex flex-wrap gap-xl-5 gap-lg-4 gap-4 justify-content-center ">
              {movies.map((curMovie) => {
                const { imdbID, Poster, Title } = curMovie;
                return (
                  <NavLink
                    to={`/movies/${imdbID}`}
                    style={{ textDecoration: "none" }}
                    key={imdbID}
                  >
                    <div className="card h-100">
                      <div className="image_box">
                        <img
                          src={Poster}
                          alt={imdbID}
                          className="img-fluid h-100 w-100"
                        />
                      </div>
                      <div className="title_box text-light py-2 w-100 text-center">
                        <p className="mb-0 text-wrap">{Title}</p>
                      </div>
                    </div>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Moviecards;
