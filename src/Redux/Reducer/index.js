import { combineReducers } from "redux";
// import cart from './cart';
// import city from './city';
import user from "./User";
import view from "./View";

// import message from './message';

const rootReducer = combineReducers({
  //   cart,
  //   city,
  user,
  view
  //   message
});

export default rootReducer;
