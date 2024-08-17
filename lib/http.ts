import axios from "axios";

import { getToken, resetUserLogin } from "@/utils/user.utils";

const baseURL: string | undefined = process.env.NEXT_PUBLIC_URL_API;

const http = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
// It allows you to write or execute a piece of your code before the request gets sent.

http.interceptors.request.use(
  (config) => {
    const token = getToken();
    // console.log("token", token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // console.log("Request Config:", config); // Debugging line
    return config;
  },
  (error) => {
    console.log("Request Error:", error); // Debugging line
    return Promise.reject(error);
  }
);

// Response Interceptor
// It allows you to write or execute a piece of your code before response reaches the calling end.

http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log("Response Error:", error); // Debugging line
    if (error.response && error.response.status === 401) {
      resetUserLogin();
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export default http;
