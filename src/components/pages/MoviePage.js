import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getMovie,
  setIsFetching,
  clearMovie,
} from "../../actions/mdetailActions";
import { nominateMovie, removeMovie } from "../../actions/movieActions";
import NominationList from "../NominationList";
import SearchBox from "../SearchBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import MoviePageLoader from "../MoviePageLoader";

const MoviePage = ({
  getMovie,
  removeMovie,
  clearMovie,
  setIsFetching,
  isFetching,
  nominateMovie,
  movie,
  nominations,
}) => {
  const { id } = useParams();
  const {
    Title,
    Year,
    Response,
    Rated,
    Released,
    Runtime,
    Genre,
    Director,
    Writer,
    Actors,
    Plot,
    Language,
    Country,
    Awards,
    Poster,
    Ratings,
    Metascore,
  } = movie;
  useEffect(() => {
    setIsFetching(true);
    getMovie(id);
    return () => {
      clearMovie();
    };
  }, [clearMovie, getMovie, setIsFetching, id]);
  return (
    <div className="py-5">
      <div className="row mb-5">
        <div className="col-12 col-md-7 pr-md-0">
          <SearchBox />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-7 mb-5 mb-md-0 pr-md-0">
          <div className="card-heading f-22 f-sm-24 f-md-28 fw-700">
            Movie Details
          </div>
          <div className="card-content">
            {isFetching ? <MoviePageLoader /> : ""}
            {Response === "False" ? "Movie Not Found" : null}
            {Response === "True" ? (
              <>
                <div className="f-22 mb-4">
                  {Title} ({Year})
                </div>
                <div className="d-flex flex-wrap">
                  <div className="col-12 col-md-6 mb-2 mb-md-0 p-0">
                    <img
                      style={{
                        objectFit: "cover",
                        height: "300px",
                        width: "100%",
                        maxWidth: "300px",
                      }}
                      src={
                        Poster !== "N/A"
                          ? Poster
                          : "https://bitsofco.de/content/images/2018/12/broken-1.png"
                      }
                      alt={Title + " image"}
                    />
                  </div>
                  <div className="col-12 col-md-6 d-md-flex align-items-center py-0 px-0 px-md-2">
                    <div className="">
                      <span className="mini-head">Storyline:</span> {Plot}
                    </div>
                  </div>
                </div>
                <ul className="p-0 py-2 detail-list">
                  <li>
                    <span className="mini-head">Ratings: </span>
                    {Ratings === "N/A" ? (
                      Ratings
                    ) : Ratings.length !== 0 ? (
                      <ul>
                        {Ratings.map((rating) => (
                          <li
                            className="position-relative"
                            key={rating.Source + rating.Value}
                          >
                            <FontAwesomeIcon
                              style={{
                                fontSize: ".65rem",
                                left: -20,
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "yellow",
                              }}
                              className="position-absolute"
                              icon={faStar}
                            />
                            <span className="mini-head rating">
                              {rating.Source}:
                            </span>{" "}
                            {rating.Value}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "N/A"
                    )}
                  </li>
                  <li>
                    <span className="mini-head">Rated:</span> {Rated}
                  </li>
                  <li>
                    <span className="mini-head">Released:</span> {Released}
                  </li>
                  <li>
                    <span className="mini-head">Runtime:</span> {Runtime}
                  </li>
                  <li>
                    <span className="mini-head">Genre:</span> {Genre}
                  </li>
                  <li>
                    <span className="mini-head">Director:</span> {Director}
                  </li>
                  <li>
                    <span className="mini-head">Writer:</span> {Writer}
                  </li>
                  <li>
                    <span className="mini-head">Actors:</span> {Actors}
                  </li>
                  <li>
                    <span className="mini-head">Country:</span> {Country}
                  </li>
                  <li>
                    <span className="mini-head">Awards:</span> {Awards}
                  </li>
                  <li>
                    <span className="mini-head">Language:</span> {Language}
                  </li>
                  <li>
                    <span className="mini-head">Metascore:</span> {Metascore}
                  </li>

                  <li>
                    <span className="mini-head">Status:</span> It is currently
                    {!nominations.some((elt) => elt.imdbID === movie.imdbID)
                      ? " not "
                      : " "}
                    part of the nomination list
                  </li>
                </ul>
                {!nominations.some((elt) => elt.imdbID === movie.imdbID) ? (
                  <button
                    onClick={() => {
                      nominateMovie(movie);
                    }}
                    className="jb-btn jb-btn-primary"
                    disabled={nominations.some(
                      (elt) => elt.imdbID === movie.imdbID
                    )}
                  >
                    Nominate
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      removeMovie(movie);
                    }}
                    className="jb-btn jb-btn-danger"
                    disabled={
                      !nominations.some((elt) => elt.imdbID === movie.imdbID)
                    }
                  >
                    Remove
                  </button>
                )}
              </>
            ) : null}
          </div>
        </div>
        <div className="col-12 col-md-5">
          <NominationList />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isFetching: state.movie_detail.isFetching,
  movie: state.movie_detail.movie,
  nominations: state.movie.nominations,
});

export default connect(mapStateToProps, {
  getMovie,
  setIsFetching,
  nominateMovie,
  removeMovie,
  clearMovie,
})(MoviePage);
