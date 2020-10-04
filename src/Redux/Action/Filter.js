export const setCategory = payload => {
  // console.log(payload);
  return {
    type: "SET_CAT",
    payload: payload
  };
};

export const setTags = payload => {
  var arrayPayload = [];
  payload.map(tag => {
    arrayPayload.push(tag.id);
  });

  return {
    type: "SET_TAGS",
    payload: arrayPayload
  };
};
