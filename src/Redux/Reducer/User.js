const initialState = {
  user: {
    status: 0,
    reloading: true
  }
};

const UserReducer = (state = initialState, actions) => {
  if (actions.type === "GET_USER_PROFILE") {
    state = {
      ...state,
      user: {
        ...state.user,
        ...actions.payload,
        loading: false
      }
    };
    return state;
  } else if (actions.type === "LOGOUT_USER") {
    return initialState;
  } else return state;
};

export default UserReducer;
