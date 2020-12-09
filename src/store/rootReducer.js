import { combineReducers } from "redux";
import user from "./user/reducer";
import emotions from "./emotions/reducer";

export default combineReducers({
  user,
  emotions,
});
