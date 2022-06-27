import React from "react";

const LoadingLine = ({ width, height }) => {
  return (
    <div
      className="loading-bg"
      style={{
        height: height ?? "18px",
        borderRadius: "50vw",
        width: width ?? "100%",
      }}
    ></div>
  );
};

export default LoadingLine;
