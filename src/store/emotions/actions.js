import axios from "../../lib/axios";
import { setLoading } from "../user/actions";
import { selectToken } from "../user/selectors";

export const emotionsFetched = (data) => {
  return {
    type: "EMOTIONS_FETCHED",
    payload: data,
  };
};

export function commentCreated(comment) {
  console.log("GOT HIT ACTION");
  return {
    type: "COMMENT_CREATED",
    payload: comment,
  };
}

export const fetchEmotions = () => {
  return async (dispatch, getState) => {
    console.log("action got hit");
    try {
      const response = await axios.get(`/emotion`);
      console.log("response", response.data.userEmos);
      dispatch(emotionsFetched(response.data.userEmos));
    } catch (error) {
      console.log("no response", error);
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  };
};

export function addComment(content, userEmotionId) {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));
    const token = selectToken(getState());
    if (token === null) return;
    try {
      const response = await axios.post(
        `user/comments/${userEmotionId}`,
        {
          content,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("responseCOMMENT", response.data);
      dispatch(emotionsFetched(response.data.userEmos));
    } catch (error) {
      console.log(error);
    }
  };
}
