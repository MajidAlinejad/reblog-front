import axios from "axios";
import { setAuthorizationToken } from "../../Auth/Auth";

export const updateUser = payload => {
  return {
    type: "GET_USER_PROFILE",
    payload: payload
  };
};

export const getUser = () => {
  const token = localStorage.getItem("token");
  return dispatch => {
    if (token) {
      setAuthorizationToken(token);
      axios.post(process.env.REACT_APP_API_URL + "auth/me").then(res => {
        dispatch(updateUser(res.data));
      });
    }
  };
};

export const deleteUser = () => {
  localStorage.removeItem("token");
  delete axios.defaults.headers.common["Authorization"];
  return {
    type: "LOGOUT_USER"
  };
};
