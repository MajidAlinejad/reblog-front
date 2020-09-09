const updatePlayer = payload => {
  return {
    type: "UPDATE_PLAYER",
    payload: payload
  };
};

export const addStream = payload => {
  // localStorage.setItem("night", payload);
  console.log(payload);
  return {
    type: "ADD",
    payload: payload
  };
};
