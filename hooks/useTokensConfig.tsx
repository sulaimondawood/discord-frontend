import { AuthContext } from "@/context/AuthContext";
import { axiosInstance, baseURL } from "@/utils/axios";
import { TokeneExpired } from "@/utils/token-expired";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export const useTokens = () => {
  const router = useRouter();
  axiosInstance.interceptors.request.use(
    (config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${localStorage.getItem(
          "access_token"
        )} `;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (error) => {
      const orignalReq = error.config;

      if (typeof error.response === "undefined") {
        alert(
          "A server or Network error occured, we will get this fixed shortly"
        );
        return Promise.reject(error);
      }

      if (
        error.response.status === 401 &&
        orignalReq.url === baseURL + "token/refresh/"
        // orignalReq.url === baseURL + "token/refresh/"
      ) {
        window.location.href = "/";
        // router.push("/");
        return Promise.reject(error);
      }

      if (
        error.response.status === 401 &&
        error.response.statusText === "Unauthorized"
      ) {
        const refreshToken = localStorage.getItem("refresh_token");
        console.log(refreshToken);
        console.log("usetoken config");
        let retryCounter = 0;
        if (refreshToken) {
          // const refreshTokenValidity = JSON.parse(
          //   atob(refreshToken.split(".")[0])
          // );
          const refreshTokenValidity = jwtDecode(refreshToken);
          // const dateNow = Math.ceil(Date.now());
          const dateNow = Math.ceil(Date.now() / 1000);

          if (TokeneExpired(refreshTokenValidity) > dateNow) {
            return axiosInstance
              .post("token/refresh/", {
                refresh: refreshToken,
              })
              .then((res) => {
                localStorage.setItem("access_token", res.data.access);
                localStorage.setItem("refresh_token", res.data.refresh);
                axiosInstance.defaults.headers["Authorization"] =
                  res.data.access;
                orignalReq.headers["Authorization"] = res.data.access;

                return axiosInstance(orignalReq);
              })
              .catch((error) => {
                console.log(error);
                retryCounter++;

                // Limit the number of retries, e.g., 3 attempts
                if (retryCounter <= 3) {
                  return Promise.reject(error);
                } else {
                  console.log("Max retries reached");
                  return Promise.reject(new Error("Max retries reached"));
                }
                return Promise.reject(error);
              });
          } else {
            console.log("Refresh token expired");
            // router.push("/");
            window.location.href = "/";
          }
        } else {
          console.log("No refresh token found");
          // router.push("/");
          window.location.href = "/";
        }
      }
      return Promise.reject(error);
    }
  );
  // axiosInstance.interceptors.request.use(
  //   (config) => {
  //     // if (!config.headers["Authorization"]) {
  //     //   config.headers["Authorization"] = `Bearer ${localStorage.getItem(
  //     //     "access_token"
  //     //   )} `;
  //     // }
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
  //       router.push("/");
  //       return Promise.reject(error);
  //     }

  //     if (
  //       error.response.status === 401 &&
  //       error.response.statusText === "Unauthorized"
  //     ) {
  //       const refreshToken = localStorage.getItem("refresh_token");
  //       console.log(refreshToken);
  //       console.log("usetoken config");

  //       if (refreshToken) {
  //         const refreshTokenValidity = JSON.parse(
  //           atob(refreshToken.split(".")[0])
  //         );
  //         // const dateNow = Math.ceil(Date.now());
  //         const dateNow = Math.ceil(Date.now() / 1000);

  //         if (refreshTokenValidity.exp > dateNow) {
  //           return axiosInstance
  //             .post("token/refresh/", {
  //               refresh: refreshToken,
  //             })
  //             .then((res) => {
  //               localStorage.setItem("access_token", res.data.access);
  //               localStorage.setItem("refresh_token", res.data.refresh);
  //               axiosInstance.defaults.headers["Authorization"] =
  //                 res.data.access;
  //               orignalReq.headers["Authorization"] = res.data.access;

  //               return axiosInstance(orignalReq);
  //             })
  //             .catch((error) => {
  //               console.log(error);
  //             });
  //         } else {
  //           console.log("Refresh token expired");
  //           router.push("/");
  //         }
  //       } else {
  //         console.log("No refresh token found");
  //         router.push("/");
  //       }
  //     }
  //     return Promise.reject(error);
  //   }
  // );

  return axiosInstance;
};
