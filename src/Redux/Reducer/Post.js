const initialState = {
  post: {
    base: "",
    related: ""
  }
};

const PostReducer = (state = initialState, actions) => {
  //   console.log(actions);
  if (actions.type === "SET_POST") {
    // console.log(actions.payload);
    state = {
      base: actions.payload.blog.base,
      related: actions.payload.category_id
    };
  }
  return state;
};

export default PostReducer;
