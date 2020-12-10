const initialState = {
  all_emotions: [],
  quotes: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "EMOTIONS_FETCHED":
      return {
        all_emotions: action.payload,
      };
    case "QUOTES_FETCHED":
      return {
        ...state,
        quotes: action.payload,
      };
    default:
      return state;
  }
};
