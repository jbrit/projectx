import axios from "axios";
import {
  GET_PROJECTS,
  NOMINATE_MOVIE,
  REMOVE_MOVIE,
  CLEAR_MOVIES,
  SET_SEARCHPARAM,
  SET_ISSEARCHING,
} from "./types.js";

export const getProjects = (topic, page = 1) => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://projectx-flask.herokuapp.com/projects/search/?topic=${topic}`
    );
    dispatch({
      type: GET_PROJECTS,
      payload: { Response: "True", projects: res.data },
    });
  } catch (error) {
    // Handle Could not search, Try again
    dispatch({
      type: GET_PROJECTS,
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
