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
  if (night) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
  return {
    type: "NIGHT_MODE",
    payload: night
  };
};

export const toggleNightMode = payload => {
  localStorage.setItem("night", payload);
  if (payload) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
  return {
    type: "NIGHT_MODE",
    payload: payload
  };
};
