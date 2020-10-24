import axios from "axios";

const updateBlog = payload => {
  return {
    type: "UPDATE_BLOG",
    payload: payload
  };
};

export const getBlog = url => {
  //   let id = 1;
  return dispatch => {
    axios.get(process.env.REACT_APP_API_URL + "blog/" + url).then(res => {
      dispatch(updateBlog(res.data));
    });
  };
};
