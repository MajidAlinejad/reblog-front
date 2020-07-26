const initialState = {
  sidebar: {
    hide: true
  }
};

const ViewReducer = (state = initialState, actions) => {
  //   console.log("reducer started");
  //   console.log(actions);
  switch (actions.type) {
    case "TOGGLE_SIDEBAR":
      state = {
        ...state,
        sidebar: {
          hide: actions.payload
        }
      };
      return state;

    case "GET_SIDEBAR":
      return state;

    default:
      return state;
  }
};

export default ViewReducer;
