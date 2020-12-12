const initialState = {
  stream: {
    name: "",
    singer: "",
    cover: "",
    musicSrc: ""
  }
};

const Stream = (state = initialState, actions) => {
  switch (actions.type) {
    case "ADD":
      state = {
        ...state,
        stream: {
          name: actions.payload.title,
          singer: actions.payload.special,
          cover: process.env.REACT_APP_BASE_URL + actions.payload.img,
          musicSrc: process.env.REACT_APP_BASE_URL + actions.payload.stream
        }
      };
      return state;

    default:
      return state;
  }
};

export default Stream;
