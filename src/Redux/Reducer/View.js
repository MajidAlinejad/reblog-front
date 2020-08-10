const initialState = {
  sidebar: {
    hide: true
  },
  night: false
};

const ViewReducer = (state = initialState, actions) => {
  //   console.log("reducer started");
  console.log(actions);
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

    case "NIGHT_MODE":
      state = {
        ...state,
        night: actions.payload
      };
      return state;

    default:
      return state;
  }
};

export default ViewReducer;
