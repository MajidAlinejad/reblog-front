const updateView = payload => {
  return {
    type: "TOGGLE_SIDEBAR",
    payload: payload
  };
};

export const toggleSidebar = payload => {
  localStorage.setItem("sidebarHide", payload);
  return dispatch => {
    dispatch(updateView(payload));
  };
};

export const getSidebar = () => {
  let hide = localStorage.getItem("sidebarHide");
  hide = hide === "false" ? false : true;
  // console.log(hide);
  return dispatch => {
    dispatch(updateView(hide));
  };
};

export const getNightMode = () => {
  let night = localStorage.getItem("night");
  night = night === "true" ? true : false;
  return {
    type: "NIGHT_MODE",
    payload: night
  };
};

export const toggleNightMode = payload => {
  localStorage.setItem("night", payload);
  return {
    type: "NIGHT_MODE",
    payload: payload
  };
};
