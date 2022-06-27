import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-vh-100 py-5 d-flex flex-column justify-content-center text-center">
      <h2 className="mb-4">404</h2>
      <h4 className="mb-3">Page Not Found</h4>
      <Link to="/">Go Home</Link>
    </div>
  );
};

export default NotFound;
