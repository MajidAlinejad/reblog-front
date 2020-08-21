import axios from "axios";

const API = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = API;

export function toggleLike(post_id, likeOrNot) {
  let token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  let AXIOS = axios.create({ baseURL: API });
  if (likeOrNot) {
    return AXIOS.delete("like/" + post_id);
  } else {
    return AXIOS.post("like", {
      status: 1,
      post_id
    });
  }
}

export function toggleSave(post_id, SaveOrNot) {
  let token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  let AXIOS = axios.create({ baseURL: API });
  if (SaveOrNot) {
    return AXIOS.delete("save/" + post_id);
  } else {
    return AXIOS.post("save", {
      post_id
    });
  }
}
