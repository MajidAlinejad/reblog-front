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
          cover: actions.payload.img,
          musicSrc: actions.payload.text
        }
      };
      return state;

    default:
      return state;
  }
};

export default Stream;
