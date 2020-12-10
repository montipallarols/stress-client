const initialState = {
  all_emotions: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "EMOTIONS_FETCHED":
      return {
        all_emotions: action.payload,
      };
    case "COMMENT_CREATED":
      console.log("GOT HIT REDUCER");
      return {
        ...state,
        all_emotions: state.all_emotions.map((emotion) =>
          emotion.id === action.payload.userEmotionId
            ? {
                ...emotion,
                comments: [action.payload],
              }
            : emotion
        ),
      };
    default:
      return state;
  }
};
