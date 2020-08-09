const initialState = {
  blog: {
    view: "",
    base: "",
    toolbar: "search",
    loader: "paginate",
    switcher: true,
    sidebar: "",
    loading: false
  }
};

const BlogReducer = (state = initialState, actions) => {
  //   console.log(actions);
  if (actions.type === "UPDATE_BLOG") {
    // console.log(actions.payload);
    state = {
      ...state.blog,
      ...actions.payload
    };
  }
  return state;

  //   switch (actions.type) {
  //     case "":
  //       state = {
  //         // ...state,
  //         ...actions.payload
  //       };
  //       return state;
  //     default:
  //       return state;
  //   }
};

export default BlogReducer;
