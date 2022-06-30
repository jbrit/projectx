import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getProjects,
  clearMovies,
  setSearchparam,
  setIsSearching,
} from "../actions/movieActions";
import { useLocation, useHistory } from "react-router-dom";

const SearchBox = ({
  getProjects,
  clearMovies,
  setSearchparam,
  setIsSearching,
}) => {
  const [currentTitle, setCurrentTitle] = useState(""),
    location = useLocation(),
    history = useHistory(),
    onChange = (e) => setCurrentTitle(e.target.value),
    handleSubmit = (e) => {
      e.preventDefault();

      history.push(`/search/?s=${encodeURIComponent(currentTitle)}`);
    };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchWord = (searchParams.get("s") ?? "").trim();
    const page = searchParams.get("page");

    setCurrentTitle(searchWord);

    setIsSearching(true);
    searchWord || setIsSearching(false);
    searchWord && searchWord.length !== 0 && getProjects(searchWord, page);
    searchWord && searchWord.length !== 0 && setSearchparam(searchWord);
    return () => {
      clearMovies();
    };
  }, [location, getProjects, clearMovies, setSearchparam, setIsSearching]);
  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex align-items-stretch">
        <input
          value={currentTitle}
          onChange={onChange}
          name="movieTitle"
          type="text"
          className="my-form-control"
          id="movieTitle"
          placeholder="Start Searching"
          autoFocus
        />
        <button className="jb-btn jb-btn-primary inline-form-btn" type="submit">
          Search
        </button>
      </div>
    </form>
  );
};

SearchBox.propTypes = {
  clearMovies: PropTypes.func.isRequired,
  getProjects: PropTypes.func.isRequired,
  setSearchparam: PropTypes.func.isRequired,
};

export default connect(null, {
  getProjects,
  clearMovies,
  setSearchparam,
  setIsSearching,
})(SearchBox);
