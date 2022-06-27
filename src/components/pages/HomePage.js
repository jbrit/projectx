import React from "react";
import SearchBox from "../SearchBox";

const HomePage = () => {
  return (
    <div className="my-auto py-5 d-flex flex-column justify-content-center text-center">
      <div className="f-36 f-md-56 f-lg-64 fw-600 mb-4">
        Search for your project inspiration
      </div>
      <div className="f-14 f-md-18 f-lg-20 fw-400 mb-5">
        We use cutting edge algorithms (pagerank and boyer-moore) to provide the best search results
      </div>
      <div style={{ width: "80%", maxWidth: "550px" }} className="mx-auto">
        <SearchBox />
      </div>
    </div>
  );
};

export default HomePage;
