import React from "react";
import Search from "./Search";
import Moviecards from "./Moviecards";

const Movies = () => {
  // const name = useContext(AppContext)
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <Search />
            <Moviecards />
          </div>
        </div>
      </div>
    </>
  );
};

export default Movies;
