import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { API_url } from "./context";

const SingalMovie = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState("");

  const getMovies = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if (data.Response === "True") {
        setIsLoading(false);
        setMovies(data);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    let timeOut = setTimeout(() => {
      getMovies(`${API_url}&i=${id}`);
    }, 300);
    return () => clearTimeout(timeOut);
  }, [id]);

  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <div className="loading_class">Loading....</div>
      </div>
    );
  }

  return (
    <section>
      <div className="singalmovie_card background">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-6 col-md-10 col-12">
              <div className="movie_card border border-2 d-flex flex-column flex-md-row  gap-4 bg-white align-items-center my-5">
                <figure className="mb-0">
                  <div className="image_box">
                    <img
                      src={movies.Poster}
                      alt="poster image"
                      className="img-fluid"
                    />
                  </div>
                </figure>
                <div className="movie_content py-3">
                  <p className="movie_title">{movies.Title}</p>
                  <p className="movie_detail">{movies.Released}</p>
                  <p className="movie_detail">{movies.Genre}</p>
                  <p className="movie_detail">{movies.Writer}</p>
                  <p className="movie_detail">{movies.imdbRating} / 10</p>
                  <p className="movie_detail">{movies.Country}</p>
                  <div>
                    <NavLink to="/" className="btn back_btn text-white px-4 mt-2">Go Back</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingalMovie;
