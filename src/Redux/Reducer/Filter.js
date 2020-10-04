const initialState = {
  category: null,
  tags: []
};

const setFilters = (state = initialState, actions) => {
  // console.log("reducer started");
  // console.log(actions);
  switch (actions.type) {
    case "SET_CAT":
      state = {
        ...state,
        category: actions.payload
      };
      return state;

    case "SET_TAGS":
      state = {
        ...state,
        tags: actions.payload
      };

    default:
      return state;
  }
};

export default setFilters;
