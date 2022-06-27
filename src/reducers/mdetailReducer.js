const { GET_MOVIE, SET_ISFETCHING, CLEAR_MOVIE } = require("../actions/types");

const initialState = {
  movie: {},
  isFetching: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_MOVIE:
      return { ...state, movie: { ...payload }, isFetching: false };

    case CLEAR_MOVIE:
      return { ...state, movie: {} };

    case SET_ISFETCHING:
      return { ...state, isFetching: payload };

    default:
      return state;
  }
};
