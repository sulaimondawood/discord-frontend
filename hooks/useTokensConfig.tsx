// import { AuthContext } from "@/context/AuthContext";
import { useAuth } from "@/context/AuthContext";
import { axiosInstance, baseURL } from "@/utils/axios";
import { TokeneExpired } from "@/utils/token-expired";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

export const useTokens = () => {
  const router = useRouter();
  const { auth } = useAuth();
  axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("access_token");
      if (!config.headers["Authorization"] && accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (!error.response) {
        alert(
          "A server or network error occurred. We will get this fixed shortly."
        );
        return Promise.reject(error);
      }

      if (
        error.response.status === 401 &&
        originalRequest.url === baseURL + "token/refresh/"
      ) {
        window.location.href = "/";
        return Promise.reject(error);
      }

      if (
        error.response.status === 401 &&
        error.response.statusText === "Unauthorized"
      ) {
        const refreshToken = localStorage.getItem("refresh_token");

        if (refreshToken) {
          const refreshTokenValidity = jwtDecode(refreshToken);
          console.log(refreshToken);
          console.log(refreshTokenValidity);
          const dateNow = Date.now();

          if (TokeneExpired(refreshTokenValidity.exp) > dateNow) {
            try {
              const refreshResponse = await axiosInstance.post(
                "token/refresh/",
                {
                  refresh: refreshToken,
                }
              );
              console.log(refreshResponse);

              if (refreshResponse) {
                localStorage.setItem(
                  "access_token",
                  refreshResponse.data.access
                );
                localStorage.setItem(
                  "refresh_token",
                  refreshResponse.data.refresh
                );

                axiosInstance.defaults.headers["Authorization"] =
                  refreshResponse.data.access;
                originalRequest.headers["Authorization"] =
                  refreshResponse.data.access;

                return axiosInstance(originalRequest);
              }
            } catch (refreshError) {
              console.log("Refresh token request failed", refreshError);
              // Handle refresh token request failure, e.g., show an error message
              return Promise.reject(refreshError);
              // Handle refresh error, e.g., show an error message
            }
          } else {
            console.log("Refresh token expired");
            // window.location.href = "/";
          }
        } else {
          console.log("No refresh token found");
          // window.location.href = "/";
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
