import axios from "axios";

const updateBlog = payload => {
  return {
    type: "UPDATE_BLOG",
    payload: payload
  };
};

export const getBlog = id => {
  //   let id = 1;
  return dispatch => {
    axios.get("http://smarblog.mamp:8050/api/blog/" + id).then(res => {
      //   console.log(res.data);
      dispatch(updateBlog(res.data));
    });
  };
};
