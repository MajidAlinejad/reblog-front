const initialState = {
  category: null,
  brands: [],
  price: [],
  params: [],
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
      return state;
    case "SET_BRANDS":
      state = {
        ...state,
        brands: actions.payload
      };
      return state;
    case "SET_PARAMS":
      state = {
        ...state,
        params: actions.payload
      };
      return state;
    case "SET_PRICE":
      state = {
        ...state,
        price: actions.payload
      };
      return state;
    default:
      return state;
  }
};

export default setFilters;
