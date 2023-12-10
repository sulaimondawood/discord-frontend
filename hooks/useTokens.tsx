import { AuthContext } from "@/context/AuthContext";
import { axiosInstance, baseURL } from "@/utils/axios";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export const useTokens = () => {
  const router = useRouter();
  const { auth, setAuth } = useContext(AuthContext);
  axiosInstance.interceptors.request.use(
    (req) => {
      return req;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
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
      ) {
        router.push("/");
        return Promise.reject(error);
      }

      if (
        error.response.status === 401 &&
        error.response.statusText === "Unauthorized"
      ) {
        const refreshToken = localStorage.getItem("refresh_token");
        if (refreshToken) {
          const refreshTokenValidity = JSON.parse(
            atob(refreshToken.split(".")[0])
          );
          const dateNow = Math.ceil(Date.now() / 1000);

          if (refreshTokenValidity.exp > dateNow) {
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
              });
          } else {
            console.log("Refresh token expired");
            router.push("/");
          }
        } else {
          console.log("No refresh token found");
          router.push("/");
        }
      }
      return Promise.reject(error);
    }
  );
};
