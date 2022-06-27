import axios from "axios";
import {
  GET_MOVIES,
  NOMINATE_MOVIE,
  REMOVE_MOVIE,
  CLEAR_MOVIES,
  SET_SEARCHPARAM,
  SET_ISSEARCHING,
} from "./types.js";

export const getMovies = (name, page = 1) => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://www.omdbapi.com/?s=${name}&page=${page}&apikey=7f85ed74`
    );
    if (res.data.Response === "True") {
      const currentPage = /^\d+$/.test(page) ? parseInt(page) : 1;
      // Previous and Next Params
      let currentParams = new URLSearchParams(window.location.search);
      currentParams.set("page", currentPage + 1);
      const nextParams = currentParams.toString();
      currentParams.set("page", currentPage - 1);
      const prevParams = currentParams.toString();
      // Generating Pagination Object
      const { totalResults } = res.data,
        totalPages = Math.ceil(parseInt(totalResults) / 10),
        hasNext = currentPage < totalPages,
        hasPrevious = currentPage > 1,
        paginationData = {
          currentPage,
          totalPages,
          hasPrevious,
          hasNext,
          previousPage: hasPrevious ? prevParams : null,
          nextPage: hasNext ? nextParams : null,
          startResult: currentPage * 10 - 9,
          endResult: hasNext ? currentPage * 10 : parseInt(totalResults),
        };

      res.data = { ...res.data, ...paginationData, movies: res.data.Search };
    }
    let result = res.data;
    dispatch({
      type: GET_MOVIES,
      payload: result,
    });
  } catch (error) {
    // Handle Could not search, Try again
    dispatch({
      type: GET_MOVIES,
      payload: { Response: "False", notRequested: true },
    });
  }
};

export const setSearchparam = (name) => (dispatch) => {
  dispatch({
    type: SET_SEARCHPARAM,
    payload: name,
  });
};
export const setIsSearching = (bool) => (dispatch) => {
  dispatch({
    type: SET_ISSEARCHING,
    payload: bool,
  });
};
export const nominateMovie = (movie) => (dispatch) => {
  dispatch({
    type: NOMINATE_MOVIE,
    payload: movie,
  });
};

export const removeMovie = (movie) => (dispatch) => {
  dispatch({
    type: REMOVE_MOVIE,
    payload: movie,
  });
};

export const clearMovies = () => (dispatch) => {
  dispatch({
    type: CLEAR_MOVIES,
  });
};
