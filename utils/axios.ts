import axios from "axios";

export const baseURL = "http://127.0.0.1:8000/api/";

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: localStorage?.getItem("access-token")
      ? "Bearer " + localStorage?.getItem("access-token")
      : null,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
