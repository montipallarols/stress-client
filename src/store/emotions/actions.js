import axios from "../../lib/axios";

export const emotionsFetched = (data) => {
  return {
    type: "EMOTIONS_FETCHED",
    payload: data,
  };
};

export const fetchEmotions = () => {
  return async (dispatch, getState) => {
    console.log("action got hit");
    try {
      const response = await axios.get(`/user`);
      console.log("response", response.data.userEmotions);
      dispatch(emotionsFetched(response.data.userEmotions));
    } catch (error) {
      console.log("no response", error);
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  };
};
