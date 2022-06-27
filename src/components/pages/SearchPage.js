import React from "react";
import SearchBox from "../SearchBox";
import MovieList from "../MovieList";

const SearchPage = () => {
  return (
    <div className=" py-5">
      <div className="row">
        <div className="col-12 col-md-7 pr-md-0">
          <SearchBox />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12 mb-5">
          <MovieList />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
