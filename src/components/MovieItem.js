import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { nominateMovie, removeMovie } from "../actions/movieActions";

const MovieItem = ({ project }) => {
  const {student, supervisor, topic, year, score, matric_no} = project;
  return (
    <li className="movie-item">
      <div className="d-flex flex-column justify-content-center">
        <div className="f-22 mb-3 fw-400">
          <span className="fw-600">{topic}</span> ({year})
        </div>
        <div className="f-22 mb-3 fw-400">
          <span className="fw-600">Student: </span> {student}
        </div>
        <div className="f-22 mb-3 fw-400">
          <span className="fw-600">Supervisor: </span> {supervisor}
        </div>
        <div className="f-22 mb-3 fw-400">
          <span className="fw-600">Matriculation Number: </span> {matric_no}
        </div>
        Score: {score}
      </div>
    </li>
  );
};

MovieItem.propTypes = {
  nominateMovie: PropTypes.func.isRequired,
};

export default connect(null, { nominateMovie, removeMovie })(MovieItem);
