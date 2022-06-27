import { combineReducers } from "redux";
import movieReducer from "./movieReducer";
import mdetailReducer from "./mdetailReducer";

export default combineReducers({
  movie: movieReducer,
  movie_detail: mdetailReducer,
});
