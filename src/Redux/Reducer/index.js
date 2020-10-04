import { combineReducers } from "redux";
// import cart from './cart';
// import city from './city';
import user from "./User";
import view from "./View";
import blog from "./Blog";
import stream from "./Stream";
import filter from "./Filter";

// import message from './message';

const rootReducer = combineReducers({
  //   cart,
  //   city,
  blog,
  user,
  view,
  stream,
  filter
  //   message
});

export default rootReducer;
