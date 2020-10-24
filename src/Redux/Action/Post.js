export const setPosts = payload => {
  // console.log(payload);
  return {
    type: "SET_POST",
    payload: payload
  };
};
