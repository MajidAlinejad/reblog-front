import { combineReducers } from "redux";
// import cart from './cart';
// import city from './city';
import user from "./User";
import view from "./View";
import blog from "./Blog";

// import message from './message';

const rootReducer = combineReducers({
  //   cart,
  //   city,
  blog,
  user,
  view
  //   message
});

export default rootReducer;
