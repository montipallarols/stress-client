const initialState = {
  all_emotions: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "EMOTIONS_FETCHED":
      return {
        all_emotions: action.payload,
      };
    default:
      return state;
  }
};
