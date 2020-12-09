import { combineReducers } from "redux";
import user from "./user/reducer";
import appState from "./appState/reducer";
import emotions from "./emotions/reducer";

export default combineReducers({
  user,
  emotions,
  appState

});
