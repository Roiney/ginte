import { combineReducers } from "redux";
import auth from "./views/auth/reducer";
import client from "./views/clients/reducer";

export default combineReducers({
  auth,
  client,
});
