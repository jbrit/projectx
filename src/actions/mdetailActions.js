import axios from "axios";
import { GET_MOVIE, SET_ISFETCHING, CLEAR_MOVIE } from "./types";
export const getMovie = (id) => async (dispatch) => {
  const res = await axios.get(
    `https://www.omdbapi.com/?i=${id}&apikey=7f85ed74`
  );
  dispatch({
    type: GET_MOVIE,
    payload: res.data,
  });
};
export const clearMovie = () => (dispatch) => {
  dispatch({
    type: CLEAR_MOVIE,
  });
};
export const setIsFetching = (bool) => (dispatch) => {
  dispatch({
    type: SET_ISFETCHING,
    payload: bool,
  });
};
