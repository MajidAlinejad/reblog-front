const initialState = {
  user: {
    status: 0,
    reloading: true
  }
  // card: ""
  //   addresses: [],
  //   documents: []
};

const UserReducer = (state = initialState, actions) => {
  //   console.log("reducer started");
  //   console.log(actions);
  if (actions.type == "GET_USER_PROFILE") {
    state = {
      ...state,
      user: {
        ...state.user,
        ...actions.payload,
        loading: false
      }
    };
    return state;
  } else if (actions.type == "LOGOUT_USER") {
    return initialState;
  } else return state;
  // switch (actions.type) {
  //   case "GET_USER_PROFILE":
  //     return {
  //       user: {
  //         ...state.user,
  //         ...actions.payload,
  //         loading: false
  //       },
  //     //   card: actions.payload
  //       // addresses: actions.payload.addresses,
  //       // documents: actions.payload.documents
  //     };
  //   case "LOGOUT_USER":
  //     return initialState;
  //   default:
  //     return state;
  // }
};

export default UserReducer;
