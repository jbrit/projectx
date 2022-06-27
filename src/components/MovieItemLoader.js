import React from "react";
import LoadingLine from "./LoadingLine";

const MovieItemLoader = () => {
  return (
    <li className="movie-item">
      {/* 160px img */}
      <div className="loading-img loading-bg mr-3"></div>
      <div
        style={{ flexGrow: 1 }}
        className="d-flex flex-column justify-content-center"
      >
        <div className="f-22 mb-3 fw-400">
          <div className="fw-600 mb-3">
            <LoadingLine width="90%" />
          </div>
          <LoadingLine width="80%" />
          {/* Year */}
        </div>
        <div>
          <LoadingLine width="70%" />
        </div>
      </div>
    </li>
  );
};

export default MovieItemLoader;
