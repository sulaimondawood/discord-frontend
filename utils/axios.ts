// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// import { TokeneExpired } from "./token-expired";
// export const baseURL = "http://127.0.0.1:8000/api/";
// export const clientBaseUrl = "http://localhost:3000/";
// export const axiosInstance = axios.create({
//   baseURL,
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     if (!config.headers["Authorization"]) {
//       config.headers["Authorization"] = `Bearer ${localStorage.getItem(
//         "access_token"
//       )} `;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   async (error) => {
//     const orignalReq = error.config;

//     if (typeof error.response === "undefined") {
//       alert(
//         "A server or Network error occured, we will get this fixed shortly"
//       );
//       return Promise.reject(error);
//     }

//     if (
//       error.response.status === 401 &&
//       orignalReq.url === baseURL + "token/refresh/"
//     ) {
//       window.location.href = "/";
//       // router.push("/");
//       return Promise.reject(error);
//     }

//     if (
//       error.response.status === 401 &&
//       error.response.statusText === "Unauthorized"
//     ) {
//       const refreshToken = localStorage.getItem("refresh_token");
//       console.log(refreshToken);
//       console.log("usetoken config");
//       let retryCounter = 0;
//       if (refreshToken) {
//         // const refreshTokenValidity = JSON.parse(
//         //   atob(refreshToken.split(".")[0])
//         // );
//         const refreshTokenValidity = jwtDecode(refreshToken);
//         // const dateNow = Math.ceil(Date.now());
//         const dateNow = Math.ceil(Date.now() / 1000);

//         if (TokeneExpired(refreshTokenValidity) > dateNow) {
//           return axiosInstance
//             .post("token/refresh/", {
//               refresh: refreshToken,
//             })
//             .then((res) => {
//               localStorage.setItem("access_token", res.data.access);
//               localStorage.setItem("refresh_token", res.data.refresh);
//               axiosInstance.defaults.headers["Authorization"] = res.data.access;
//               orignalReq.headers["Authorization"] = res.data.access;

//               return axiosInstance(orignalReq);
//             })
//             .catch((error) => {
//               console.log(error);
//               retryCounter++;

//               // Limit the number of retries, e.g., 3 attempts
//               if (retryCounter <= 3) {
//                 return Promise.reject(error);
//               } else {
//                 console.log("Max retries reached");
//                 return Promise.reject(new Error("Max retries reached"));
//               }
//               return Promise.reject(error);
//             });
//         } else {
//           console.log("Refresh token expired");
//           // router.push("/");
//           window.location.href = "/";
//         }
//       } else {
//         console.log("No refresh token found");
//         // router.push("/");
//         window.location.href = "/";
//       }
//     }
//     return Promise.reject(error);
//   }
// );

import axios from "axios";

export const baseURL = "https://django-discord-server.onrender.com/api/";
// export const baseURL = "http://localhost:8000/api/";

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
      // "Content-Type": "application/json",
    },
    put: {
      "Content-Type": "multipart/form-data",
    },
    delete: {
      "Content-Type": "multipart/form-data",
    },
  },
});
