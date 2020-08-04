import axios from "axios";

const API = process.env.REACT_APP_API_URL;
const AXIOS = axios.create({ baseURL: API });
axios.defaults.baseURL = API;

export function toggleLike(user_id, post_id, id) {
  if (id > 0) {
    return Unlike(id);
  } else {
    return Like(user_id, post_id);
  }
}

export function Like(user_id, post_id) {
  return AXIOS.post("like", {
    status: 1,
    user_id,
    post_id
  });
}

export function Unlike(like_id) {
  return AXIOS.delete("like/" + like_id);
}

export function toggleSave(user_id, post_id, id) {
  if (id > 0) {
    return AXIOS.delete("save/" + id);
  } else {
    return AXIOS.post("save", {
      user_id,
      post_id
    });
  }
}
