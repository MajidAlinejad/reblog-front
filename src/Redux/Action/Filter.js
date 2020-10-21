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

export const setBrands = payload => {
  // console.log(payload);
  return {
    type: "SET_BRANDS",
    payload: payload
  };
};

export const setPrice = payload => {
  // console.log(payload);
  return {
    type: "SET_PRICE",
    payload: payload
  };
};

export const setParams = payload => {
  // console.log(payload);
  return {
    type: "SET_PARAMS",
    payload: payload
  };
};
