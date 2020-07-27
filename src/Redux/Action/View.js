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
