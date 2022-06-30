import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProjects } from "../actions/movieActions";
import MovieItem from "./MovieItem";
import MovieItemLoader from "./MovieItemLoader";
import search from "../try_search.svg";
import not_found from "../not_found.svg";
const MovieList = ({
  movies,
  nominations,
  search_param,
  loading,
  response,
  error,
  notRequested,
  response_data,
}) => {
  const projects =
    typeof response_data.projects === "undefined" ? [] : response_data.projects;
  return (
    <>
      <div className="card-heading f-22 f-sm-24 f-md-28 fw-700">
        {/* & !loading */}
        {!search_param
          ? "Type to search"
          : notRequested
          ? "Couldn't Search Successfully!"
          : response === "False"
          ? error
          : `Search Results for: “${search_param}”`}
      </div>
      {!search_param ? (
        <div className="card-content text-center">
          <img
            className="py-4"
            style={{ width: "80%", maxWidth: "400px", objectFit: "contain" }}
            src={search}
            alt=""
          />
        </div>
      ) : null}
      {response === "False" ? (
        <div className="card-content text-center">
          <img
            className="py-4"
            style={{ width: "80%", maxWidth: "400px", objectFit: "contain" }}
            src={not_found}
            alt=""
          />
        </div>
      ) : null}
      <ul className="card-content transparent p-0">
        {loading ? (
          <>
            <MovieItemLoader /> <MovieItemLoader />{" "}
          </>
        ) : null}
        {/* If not title, if loading, if notloaded, if response not true, else result */}
        {projects
          .filter((project) => true || project["score"])
          .map((project) => (
            <MovieItem key={project.id} project={project} />
          ))}
      </ul>
    </>
  );
};

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
  nominations: PropTypes.array.isRequired,
  error: PropTypes.string,
  response: PropTypes.string,
  notRequested: PropTypes.bool,
  search_param: PropTypes.string.isRequired,
  getProjects: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  movies: state.movie.search_result.movies,
  nominations: state.movie.nominations,
  error: state.movie.search_result.Error,
  response: state.movie.search_result.Response,
  notRequested: state.movie.search_result.notRequested,
  search_param: state.movie.search_param,
  loading: state.movie.isSearching,
  response_data: state.movie.search_result,
});

export default connect(mapStateToProps, { getProjects })(MovieList);
