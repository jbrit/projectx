import {
  GET_MOVIES,
  NOMINATE_MOVIE,
  REMOVE_MOVIE,
  CLEAR_MOVIES,
  SET_SEARCHPARAM,
  SET_ISSEARCHING,
} from "../actions/types";
const current_nominations = localStorage.getItem("nominations")
  ? JSON.parse(localStorage.getItem("nominations"))
  : [];

const initialState = {
  search_result: { movies: [] },
  nominations: [...current_nominations],
  search_param: "",
  isSearching: false,
};
let active_nominations;
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        search_result: { ...state.search_result, ...action.payload },
        isSearching: false,
      };
    case CLEAR_MOVIES:
      return {
        ...state,
        search_result: { movies: [] },
        search_param: "",
      };
    case SET_ISSEARCHING:
      return {
        ...state,
        isSearching: action.payload,
      };
    case SET_SEARCHPARAM:
      return {
        ...state,
        search_param: action.payload,
      };
    case NOMINATE_MOVIE:
      active_nominations = [...state.nominations];
      active_nominations.length < 5
        ? (active_nominations = [...state.nominations, action.payload])
        : (active_nominations = active_nominations.slice(0, 5));
      localStorage.setItem("nominations", JSON.stringify(active_nominations));

      return {
        ...state,
        nominations: [...active_nominations],
      };
    case REMOVE_MOVIE:
      active_nominations = state.nominations.filter(
        (movie) => action.payload.imdbID !== movie.imdbID
      );
      localStorage.setItem("nominations", JSON.stringify(active_nominations));
      return {
        ...state,
        nominations: [...active_nominations],
      };
    default:
      return state;
  }
};
