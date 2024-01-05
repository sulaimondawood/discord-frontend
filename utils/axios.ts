import axios from "axios";

export const baseURL = "https://django-discord-server.onrender.com/api/";
export const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const axiosInstancePrivate = axios.create({
  baseURL,
  headers: {
    common: {
      Accept: "application/json",
    },
    get: {
      "Content-Type": "application/json",
    },
    post: {
      "Content-Type": "multipart/form-data",
    },
    put: {
      "Content-Type": "multipart/form-data",
    },
    delete: {
      "Content-Type": "multipart/form-data",
    },
  },
});
