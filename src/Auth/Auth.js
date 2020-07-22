import axios from "axios";
import history from "../History";

const API = process.env.REACT_APP_API_URL;
const AXIOS = axios.create({ baseURL: API });
axios.defaults.baseURL = API;

axios.interceptors.response.use(
  function(response) {
    // If the request succeeds, we don't have to do anything and just return the response
    return response;
  },
  function(error) {
    if (error.response.status === 401) {
      return resetTokenAndReattemptRequest(error);
    }
    if (error.response.status === 403) {
      history.push("/403");
    }
    // If the error is due to other reasons, we just throw it back to axios
    return Promise.reject(error);
  }
);

let isAlreadyFetchingAccessToken = false;
// This is the list of waiting requests that will retry after the JWT refresh complete
let subscribers = [];

export function resetTokenAndReattemptRequest(error) {
  try {
    const { response: errorResponse } = error;
    /* Proceed to the token refresh procedure
    We create a new Promise that will retry the request,
    clone all the request configuration from the failed
    request in the error object. */
    const retryOriginalRequest = new Promise(resolve => {
      /* We need to add the request retry to the queue
    since there another request that already attempt to
    refresh the token */
      addSubscriber(access_token => {
        errorResponse.config.headers.Authorization = "Bearer " + access_token;
        resolve(axios(errorResponse.config));
      });
    });
    if (!isAlreadyFetchingAccessToken) {
      isAlreadyFetchingAccessToken = true;
      axios
        .post("auth/refresh")
        .then(res => {
          if (!res.data) {
            return Promise.reject(error);
          }

          const newToken = res.data.access_token;
          setAccessToken(newToken); // save the newly refreshed token for other requests to use
          isAlreadyFetchingAccessToken = false;
          onAccessTokenFetched(newToken);
        })
        .catch(err => {
          logout();
          history.push("/login");
        });
    }
    return retryOriginalRequest;
  } catch (err) {
    return Promise.reject(err);
  }
}

export function setAccessToken(token) {
  localStorage.setItem("token", token);
  setAuthorizationToken(token);
}

export function onAccessTokenFetched(access_token) {
  // When the refresh is successful, we start retrying the requests one by one and empty the queue
  subscribers.forEach(callback => callback(access_token));
  subscribers = [];
}

export function addSubscriber(callback) {
  subscribers.push(callback);
}

export function isLoggedIn() {
  if (localStorage.getItem("token")) {
    return true;
  } else return false;
}

export function login(email, password) {
  //chenge to username
  return AXIOS.post("auth/login", {
    email,
    password
  });
}

export function forgot(mobile, token) {
  const payload = token ? { mobile, token } : { mobile };
  return AXIOS.post("auth/forgot", payload);
}

export function reset(state) {
  const { token, password, password_confirmation } = state;

  return AXIOS.post("auth/reset", {
    token,
    password,
    password_confirmation
  });
}

export function verify(token) {
  return AXIOS.get("auth/reset?token=" + token);
}

export function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export function logout() {
  localStorage.removeItem("token");
  delete axios.defaults.headers.common["Authorization"];
}
