"use client";
import { useAuth } from "@/app/context/AuthContext";
import { axiosInstancePrivate, baseURL } from "@/utils/axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useRefresh from "./useRefresh";

export const useTokens = () => {
  const { auth, setAuth } = useAuth();
  const refresh = useRefresh();
  const router = useRouter();
  useEffect(() => {
    const requestIntercept = axiosInstancePrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosInstancePrivate.interceptors.response.use(
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
          error.response.status === 401
          // error.response.statusText === "Unauthorized"
        ) {
          const newAccessToken = await refresh();
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstancePrivate(originalRequest);
        }
      }
    );

    return () => {
      axiosInstancePrivate.interceptors.request.eject(requestIntercept);
      axiosInstancePrivate.interceptors.response.eject(responseIntercept);
    };
  }, [refresh, auth]);

  return axiosInstancePrivate;
};

// "use client";
// import { useAuth } from "@/app/context/AuthContext";
// import { axiosInstancePrivate } from "@/utils/axios";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import useRefresh from "./useRefresh";

// export const useTokens = () => {
//   const { auth, setAuth } = useAuth();
//   const refresh = useRefresh();

//   useEffect(() => {
//     const requestIntercept = axiosInstancePrivate.interceptors.request.use(
//       (config) => {
//         if (!config.headers["Authorization"]) {
//           console.log(auth);
//           console.log("from axios config");

//           config.headers["Authorization"] =
//             "Bearer " + localStorage.getItem("access_token");
//           // config.headers["Authorization"] = `Bearer ${auth}`;
//         }
//         return config;
//       },
//       (error) => Promise.reject(error)
//     );

//     const responseIntercept = axiosInstancePrivate.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         const originalRequest = error.config;
//         if (!error.response) {
//           alert(
//             "A server or network error occurred. We will get this fixed shortly."
//           );
//           return Promise.reject(error);
//         }

//         if (
//           error.response.status === 401 &&
//           error.response.statusText === "Unauthorized"
//         ) {
//           const newAccessToken = await refresh();
//           originalRequest.headers["Authorization"] = `Bearer ${
//             newAccessToken!.data.access
//           }`;
//           return axiosInstancePrivate(originalRequest);
//         }
//         // if (refreshToken) {
//         //   const refreshTokenValidity = jwtDecode(refreshToken);
//         //   console.log(refreshToken);
//         //   console.log(refreshTokenValidity);
//         //   const dateNow = Math.floor(Date.now() / 1000);

//         //   if (TokeneExpired(refreshTokenValidity) > dateNow) {
//         //     try {
//         //       // const refreshResponse = await axiosInstancePrivate.post(
//         //       const refreshResponse = await axiosInstance.post(
//         //         "token/refresh/",
//         //         {
//         //           refresh: refreshToken,
//         //         }
//         //       );
//         //       console.log(refreshResponse);

//         //       if (refreshResponse) {
//         //         localStorage.setItem(
//         //           "access_token",
//         //           refreshResponse.data.access
//         //         );
//         //         // setAuth(refreshResponse.data.access);
//         //         // axiosInstancePrivate.defaults.headers["Authorization"] =
//         //         //   refreshResponse.data.access;
//         //         originalRequest.headers["Authorization"] =
//         //           refreshResponse.data.access;

//         //         return axiosInstancePrivate(originalRequest);
//         //       }
//         //     } catch (refreshError) {
//         //       console.log("Refresh token request failed", refreshError);
//         //       return Promise.reject(refreshError);
//         //     }
//         //   } else {
//         //     console.log("Refresh token expired");
//         //     window.location.href = "/";
//         //   }
//         // } else {
//         //   console.log("No refresh token found");
//         //   window.location.href = "/";
//         // }
//         // }

//         return Promise.reject(error);
//       }
//     );

//     return () => {
//       axiosInstancePrivate.interceptors.request.eject(requestIntercept);
//       axiosInstancePrivate.interceptors.response.eject(responseIntercept);
//     };
//   }, [refresh, auth]);

//   return axiosInstancePrivate;
// };
