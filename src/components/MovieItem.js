import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { nominateMovie, removeMovie } from "../actions/movieActions";

const MovieItem = ({ movie, nominations, nominateMovie, removeMovie }) => (
  <li className="movie-item">
    <img
      className="mr-3"
      style={{
        objectFit: "contain",
        height: "160px",
        width: "160px",
      }}
      src={
        movie.Poster !== "N/A"
          ? movie.Poster
          : "https://bitsofco.de/content/images/2018/12/broken-1.png"
      }
      alt="Movie Poster Name"
    />
    <div className="d-flex flex-column justify-content-center">
      <div className="f-22 mb-3 fw-400">
        <span className="fw-600">{movie.Title}</span> ({movie.Year})
      </div>
      <div>
        {!nominations.some((elt) => elt.imdbID === movie.imdbID) ? (
          <button
            onClick={() => {
              nominateMovie(movie);
            }}
            className="f18 jb-btn jb-btn-primary mb-2 mr-2"
          >
            Nominate
          </button>
        ) : (
          <button
            onClick={() => {
              removeMovie(movie);
            }}
            className="f18 jb-btn jb-btn-danger mb-2 mr-2"
          >
            Remove
          </button>
        )}
        <Link
          className="f18 jb-btn jb-btn-outline-primary mb-2"
          to={`/movie/${movie.imdbID}`}
        >
          View Details
        </Link>
      </div>
    </div>
  </li>
);

MovieItem.propTypes = {
  nominateMovie: PropTypes.func.isRequired,
  nominations: PropTypes.array.isRequired,
};

export default connect(null, { nominateMovie, removeMovie })(MovieItem);
